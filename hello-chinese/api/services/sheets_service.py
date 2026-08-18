import json
import logging
import os
from datetime import datetime, timezone

from google.oauth2 import service_account
from googleapiclient.discovery import build

logger = logging.getLogger(__name__)

SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
SHEET_ID = os.getenv("SHEET_ID")

SUNDAY_TAB = "Sunday Enrollment"
SATURDAY_TAB = "Saturday Interest List"
PRIVATE_TAB = "Private Lessons Inquiries"
FREE_TRIAL_TAB = "Free Trial Requests"

SUNDAY_HEADERS = [
    "Submitted At", "Language",
    "Parent Name", "Parent Email", "Parent Phone", "Parent Notes",
    "Child #", "Children In Household",
    "Student Name", "Date of Birth", "Student Age", "Grade", "School",
    "Chinese Background", "Level", "Placement Status",
    "Package", "Sunday Schedule", "Sessions Selected", "Session Dates",
    "Student Tuition",
    "Household Subtotal", "Package Savings", "Sibling Discount", "Extra Bonus",
    "Coupon Code", "Coupon Discount", "Household Total", "Household Savings",
    "Payment Method", "Installments",
    "Media Consent", "Terms Accepted", "Terms Version",
]

SATURDAY_HEADERS = [
    "Submitted At", "Parent Name", "Email",
    "Child Age / Grade", "Program Interest", "Preferred Time", "Comments",
]

PRIVATE_HEADERS = [
    "Submitted At", "Parent Name", "Email", "Phone",
    "Child Name", "Date of Birth", "Age",
    "Currently Enrolled", "Current Class",
    "Lesson Type", "Lesson Length", "Format",
    "Preferred Days", "Preferred Time", "Specific Times",
    "Experience", "Goals",
]

FREE_TRIAL_HEADERS = [
    "Submitted At", "Parent Name", "Parent Email", "Parent Phone",
    "Child Name", "Child Age", "Experience",
    "Trial Preference", "Math Interest", "Trial Date", "Notes",
]

# payload sends a short key; the sheet should read like the form did.
BACKGROUND_LABELS = {
    "home": "Speaks Chinese at home",
    "some": "Some exposure",
    "none": "No prior exposure",
}


def _sheets():
    """None when creds are missing, so a bad deploy logs instead of 500ing."""
    raw = os.getenv("GOOGLE_SERVICE_ACCOUNT_JSON")
    if not raw or not SHEET_ID:
        logger.warning("Sheets skipped: GOOGLE_SERVICE_ACCOUNT_JSON or SHEET_ID unset")
        return None
    creds = service_account.Credentials.from_service_account_info(
        json.loads(raw), scopes=SCOPES
    )
    return build("sheets", "v4", credentials=creds, cache_discovery=False).spreadsheets()


def _num(value):
    """Raw numbers keep the money columns summable in Sheets."""
    try:
        return float(value)
    except (TypeError, ValueError):
        return ""


def _text(value):
    """Leading apostrophe stops Sheets parsing a version string like
    '2026-08-16' into a date serial."""
    return f"'{value}" if value else ""


def _schedule(blocks):
    parts = [
        f"{(b.get('time') or '').strip()} {(b.get('label') or '').strip()}".strip()
        for b in blocks or []
    ]
    return " | ".join(p for p in parts if p)


def _installments(payment):
    return " | ".join(
        f"{r.get('due', '')}: ${r.get('amount', '')}"
        for r in payment.get("installments") or []
    )


def _ensure_tab(sheets, tab):
    """Creates the tab when it is missing, so a fresh sheet needs no setup and a
    renamed tab does not silently 400."""
    meta = sheets.get(spreadsheetId=SHEET_ID, fields="sheets.properties.title").execute()
    titles = [s["properties"]["title"] for s in meta.get("sheets", [])]
    if tab not in titles:
        sheets.batchUpdate(
            spreadsheetId=SHEET_ID,
            body={"requests": [{"addSheet": {"properties": {"title": tab}}}]},
        ).execute()
        logger.info("Sheets: created tab %s", tab)


def _ensure_headers(sheets, tab, headers):
    got = sheets.values().get(
        spreadsheetId=SHEET_ID, range=f"'{tab}'!A1:A1"
    ).execute()
    if not got.get("values"):
        sheets.values().update(
            spreadsheetId=SHEET_ID,
            range=f"'{tab}'!A1",
            valueInputOption="RAW",
            body={"values": [headers]},
        ).execute()


def _append(sheets, tab, headers, rows):
    _ensure_tab(sheets, tab)
    _ensure_headers(sheets, tab, headers)
    sheets.values().append(
        spreadsheetId=SHEET_ID,
        range=f"'{tab}'!A1",
        valueInputOption="USER_ENTERED",
        insertDataOption="INSERT_ROWS",
        body={"values": rows},
    ).execute()


def append_sunday_registration(payload):
    """One row per child; parent, household and payment repeat on every row so
    a single row reads on its own."""
    sheets = _sheets()
    if not sheets:
        return

    parent = payload.get("parent") or {}
    coupon = payload.get("coupon") or {}
    payment = payload.get("payment") or {}
    privacy = payload.get("privacy") or {}
    children = payload.get("children") or []
    if not children:
        return

    household = [
        _num(payload.get("householdSubtotal") or payload.get("standardTuition")),
        _num(payload.get("packageSavings")),
        _num(payload.get("siblingDiscount")),
        _num(payload.get("consistencyBonus")),
        coupon.get("code", ""),
        _num(coupon.get("discount")),
        _num(payload.get("householdTotal")),
        _num(payload.get("householdSavings")),
        payment.get("method", ""),
        _installments(payment),
        "Yes" if privacy.get("mediaConsent") else "No",
        "Yes" if payload.get("termsAccepted") else "No",
        _text(payload.get("termsVersion")),
    ]

    rows = []
    for i, child in enumerate(children, start=1):
        student = child.get("student") or {}
        dates = child.get("sessionDates") or []
        pricing = child.get("pricing") or {}
        background = student.get("background") or ""
        rows.append([
            payload.get("submittedAt", ""),
            payload.get("language", ""),
            parent.get("name", ""),
            parent.get("email", ""),
            parent.get("phone", ""),
            parent.get("notes", ""),
            i,
            len(children),
            student.get("name", ""),
            student.get("dob", ""),
            student.get("age", ""),
            student.get("grade", ""),
            student.get("school", ""),
            BACKGROUND_LABELS.get(background, background),
            child.get("levelName", ""),
            child.get("placementStatus") or "Pending Review",
            child.get("enrollmentLabel") or child.get("planName") or "",
            _schedule(child.get("schedule")),
            len(dates),
            ", ".join(dates),
            _num(pricing.get("total")),
        ] + household)

    _append(sheets, SUNDAY_TAB, SUNDAY_HEADERS, rows)
    logger.info("Sheets: appended %s row(s) for %s", len(rows), parent.get("email"))


def append_saturday_interest(payload):
    """One row per interest-list submission."""
    sheets = _sheets()
    if not sheets:
        return

    row = [
        payload.get("submittedAt", ""),
        payload.get("parentName", ""),
        payload.get("email", ""),
        payload.get("childAgeGrade", ""),
        payload.get("programInterest", ""),
        payload.get("preferredTime") or "No preference given",
        payload.get("comments") or "",
    ]
    _append(sheets, SATURDAY_TAB, SATURDAY_HEADERS, [row])
    logger.info("Sheets: Saturday interest row for %s", payload.get("email"))


def append_private_lessons(payload):
    """One row per inquiry."""
    sheets = _sheets()
    if not sheets:
        return

    days = payload.get("preferredDays") or []
    row = [
        payload.get("submittedAt", ""),
        payload.get("parentName", ""),
        payload.get("email", ""),
        payload.get("phone", ""),
        payload.get("childName", ""),
        payload.get("dob", ""),
        payload.get("age", ""),
        payload.get("currentlyEnrolled") or "",
        payload.get("currentClass") or "",
        payload.get("lessonType", ""),
        payload.get("lessonLength", ""),
        payload.get("format") or "",
        ", ".join(days) if isinstance(days, list) else (days or ""),
        payload.get("preferredTime") or "",
        payload.get("specificTimes") or "",
        payload.get("experience") or "",
        payload.get("goals") or "",
    ]
    _append(sheets, PRIVATE_TAB, PRIVATE_HEADERS, [row])
    logger.info("Sheets: private lesson row for %s", payload.get("email"))


def append_free_trial(payload):
    """One row per trial request. This form sends no submittedAt, so the row is
    stamped on arrival."""
    sheets = _sheets()
    if not sheets:
        return

    parent = payload.get("parent") or {}
    child = payload.get("child") or {}
    row = [
        payload.get("submittedAt") or datetime.now(timezone.utc).isoformat(),
        parent.get("name", ""),
        parent.get("email", ""),
        parent.get("phone", ""),
        child.get("name", ""),
        child.get("age", ""),
        child.get("experience") or "",
        payload.get("trialPreference") or "",
        payload.get("mathInterest") or "",
        payload.get("trialDateLabel") or payload.get("trialDate") or "",
        payload.get("notes") or "",
    ]
    _append(sheets, FREE_TRIAL_TAB, FREE_TRIAL_HEADERS, [row])
    logger.info("Sheets: free trial row for %s", parent.get("email"))
