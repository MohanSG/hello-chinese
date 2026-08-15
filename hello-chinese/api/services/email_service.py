from datetime import datetime
import logging 
import resend
import os

# Public URL of the Hello Chinese header logo (override per-send with payload["logoUrl"])
LOGO_URL = os.environ.get(
    "HELLO_CHINESE_LOGO_URL", "https://hellochinese.info/assets/logo-panda.png"
)

NOTIFY = "hello.nihao.chinese@gmail.com"

resend.api_key= os.environ["RESEND_API_KEY"]
logger = logging.getLogger(__name__)

def _money(value):
    """Render a numeric or string amount as $1,150."""
    if value in (None, ""):
        return ""
    if isinstance(value, str) and value.strip().startswith("$"):
        return value
    try:
        return f"${float(value):,.0f}"
    except (TypeError, ValueError):
        return str(value)


def _format_schedule(schedule):
    """schedule is a list of {time, label, labelKey} dicts."""
    if not schedule:
        return "Schedule to be confirmed"
    if isinstance(schedule, str):
        return schedule
    return " &middot; ".join(
        f"{s.get('time', '')} {s.get('label', '')}".strip() for s in schedule
    )


def _format_installments(installments):
    """installments is a list of {iso, due, label, amount} dicts."""
    if not installments:
        return "Installment plan"
    if isinstance(installments, int):
        return f"Installment plan &middot; {installments} payments"
    parts = ", ".join(
        f"{i.get('due', i.get('label', ''))} {_money(i.get('amount'))}"
        for i in installments
    )
    return f"Installment plan &middot; {len(installments)} payments ({parts})"


def _format_dates(dates):
    """['2026-09-06', ...] -> 'Sep 6, Sep 13, ...'"""
    out = []
    for d in dates or []:
        try:
            dt = datetime.fromisoformat(str(d)[:10])
            out.append(f"{dt.strftime('%b')} {dt.day}")
        except (ValueError, TypeError):
            out.append(str(d))
    return ", ".join(out) if out else "TBD"


def _group_dates_by_month(dates):
    """['2026-09-06', ...] -> 'September: 6, 13, 20, 27<br>October: 4, 18, 25'"""
    months = []
    for d in dates or []:
        try:
            dt = datetime.fromisoformat(str(d)[:10])
            key = dt.strftime("%B")
            day = str(dt.day)
        except (ValueError, TypeError):
            key, day = "", str(d)
        if months and months[-1][0] == key:
            months[-1][1].append(day)
        else:
            months.append([key, [day]])
    if not months:
        return "Dates to be confirmed"
    return "<br>".join(
        (f"{m}: {', '.join(days)}" if m else ", ".join(days)) for m, days in months
    )


def _schedule_lines(schedule):
    """schedule is a list of {time, label} dicts -> one line each."""
    if not schedule:
        return "Schedule to be confirmed"
    if isinstance(schedule, str):
        return schedule
    return "<br>".join(
        f"{s.get('time', '')} &mdash; {s.get('label', '')}".strip(" &mdash;")
        for s in schedule
    )


def _format_timestamp(value):
    """Turn an ISO timestamp from the frontend into a readable string."""
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00")).strftime(
            "%B %d, %Y at %I:%M %p"
        )
    except (AttributeError, ValueError):
        return value or ""

def send_email(recipients, html_content, subject):    
    params: resend.Emails.SendParams = {
    "from": "HelloChinese <hello@hellochinese.info>",
    "to": recipients,
    "reply_to": [NOTIFY],
    "subject": subject,
    "html": html_content,
    }

    try:
        email = resend.Emails.send(params)
        logger.info("Resend id=%s to=%s", email.get("id"), recipients)
        return email
    except Exception as e:
        logger.error("Resend failed to=%s: %s", recipients, e)
        raise

def send_saturday_interest_email(payload):
    with open("templates/saturday_interest_list_notification.html", "r", encoding="utf-8") as f:
        html_content = f.read()

    fields = {
        "{{parentName}}": payload.get("parentName") or "",
        "{{email}}": payload.get("email") or "",
        "{{childAgeGrade}}": payload.get("childAgeGrade") or "",
        "{{programInterest}}": payload.get("programInterest") or "",
        "{{preferredTime}}": payload.get("preferredTime") or "No preference given",
        "{{comments}}": payload.get("comments") or "No comments provided.",
        "{{ctaHref}}": f"mailto:{payload.get('email')}" if payload.get("email") else "https://hellochinese.info/",
        "{{ctaLabel}}": f"Reply to {payload.get('parentName')}" if payload.get("parentName") else "Browse our programs",
        "{{logoUrl}}": payload.get("logoUrl") or LOGO_URL,
        "{{submittedAt}}": _format_timestamp(payload.get("submittedAt")),
    }
    for token, value in fields.items():
        html_content = html_content.replace(token, str(value))

    subject = "You're on the Saturday interest list - Hello Chinese"
    recipients = [r for r in [payload.get("email"), NOTIFY] if r]

    send_email(recipients, html_content, subject)
        


def send_free_trial_email(payload):
    with open("templates/free_trial_request_notification.html", "r", encoding="utf-8") as f:
        html_content = f.read()

    parent = payload.get("parent") or {}
    child = payload.get("child") or {}

    fields = {
        "{{parentName}}": parent.get("name") or "",
        "{{parentPhone}}": parent.get("phone") or "",
        "{{parentEmail}}": parent.get("email") or "",
        "{{childName}}": child.get("name") or "",
        "{{childAge}}": child.get("age") or "",
        "{{childExperience}}": child.get("experience") or "Not specified",
        "{{trialPreference}}": payload.get("trialPreference") or "No preference given",
        "{{mathInterest}}": payload.get("mathInterest") or "Not answered",
        "{{trialDateLabel}}": payload.get("trialDateLabel") or payload.get("trialDate") or "TBD",
        "{{notes}}": payload.get("notes") or "No notes provided.",
        "{{submittedAt}}": datetime.now().strftime("%B %d, %Y at %I:%M %p"),
    }
    for token, value in fields.items():
        html_content = html_content.replace(token, str(value))

    subject = "Your free trial request - Hello Chinese"
    recipients = [r for r in [parent.get("email"), NOTIFY] if r]

    send_email(recipients, html_content, subject)


def send_private_lessons_email(payload):
    with open("templates/private_lessons_inquiry_notification.html", "r", encoding="utf-8") as f:
        html_content = f.read()

    days = payload.get("preferredDays") or []
    enrolled = payload.get("currentlyEnrolled")

    fields = {
        "{{parentName}}": payload.get("parentName") or "",
        "{{email}}": payload.get("email") or "",
        "{{phone}}": payload.get("phone") or "",
        "{{childName}}": payload.get("childName") or "",
        "{{dob}}": payload.get("dob") or "",
        "{{age}}": payload.get("age") or "",
        "{{currentlyEnrolled}}": enrolled.title() if enrolled else "Not answered",
        "{{currentClass}}": payload.get("currentClass") or "&mdash;",
        "{{lessonType}}": payload.get("lessonType") or "",
        "{{lessonLength}}": payload.get("lessonLength") or "",
        "{{format}}": payload.get("format") or "No preference",
        "{{preferredDays}}": ", ".join(days) if days else "No preference",
        "{{preferredTime}}": payload.get("preferredTime") or "No preference",
        "{{specificTimes}}": payload.get("specificTimes") or "&mdash;",
        "{{experience}}": payload.get("experience") or "Not provided.",
        "{{goals}}": payload.get("goals") or "Not provided.",
        "{{logoUrl}}": payload.get("logoUrl") or LOGO_URL,
        "{{submittedAt}}": _format_timestamp(payload.get("submittedAt")),
    }
    for token, value in fields.items():
        html_content = html_content.replace(token, str(value))

    subject = "Your private lessons inquiry - Hello Chinese"
    recipients = [r for r in [payload.get("email"), NOTIFY] if r]

    send_email(recipients, html_content, subject)


def send_sunday_program_email(payload):
    """Expected payload:
    {
      "term": "Fall 2026",
      "parent": {"name","email","phone"},
      "children": [
        {"student": {"name","age"}, "levelName", "placementStatus",
         "enrollmentLabel" (or "planName"),
         "schedule": [{"time","label"}],
         "sessionDates": ["2026-09-06", ...],
         "pricing": {"total": 520}}
      ],
      "standardTuition" (or "householdSubtotal"),
      "packageSavings", "siblingDiscount",
      "coupon": {"code","discount"},
      "householdTotal", "householdSavings",
      "payment": {"method": "plan"|"full", "planName",
                  "installments": [{"due","amount"}], "amount"},
      "yct": {"title","date","note"},
      "policyAcknowledged": bool, "privacy": {"mediaConsent": bool},
      "submittedAt": ISO string
    }
    """
    with open("templates/sunday_program_enrollment_confirmation.html", "r", encoding="utf-8") as f:
        html_content = f.read()

    child_card = """
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="border-line bg-tint" style="border: 1px solid #efe3cf; border-radius: 12px; background-color:#fdf8ef; margin-bottom: 14px;">
<tr><td style="padding: 16px 20px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td width="30" valign="top" style="padding-right: 10px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td align="center" width="26" height="26" bgcolor="#a72620" style="background-color:#a72620; border-radius: 13px; font-family: Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; color: #fffdf8; line-height: 26px;">{index}</td>
</tr></table>
</td>
<td valign="top">
<div class="text-main" style="font-family: Georgia, 'Times New Roman', serif; font-size: 18px; font-weight: 700; color: #20201f; margin-bottom: 4px;">{name}</div>
<div class="text-main" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #20201f;"><strong>Level:</strong> {levelName}</div>
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; font-style: italic; color: #a72620; margin-top: 2px;">Placement Status: {placementStatus}</div>
</td>
<td align="right" valign="top" class="text-soft" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #5b5348;">Age: {age}</td>
</tr>
</table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 12px; border-top: 1px solid #e7d9c2;">
<tr><td style="padding: 10px 0 0 0;">
<div class="text-main" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; color: #20201f;">Enrollment:</div>
<div class="text-soft" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.6; color: #5b5348; margin-bottom: 10px;">{enrollmentLabel}</div>
<div class="text-main" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; color: #20201f;">Sunday Schedule:</div>
<div class="text-soft" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.6; color: #5b5348; margin-bottom: 10px;">{schedule}</div>
<div class="text-main" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; color: #20201f;">{sessions} Sundays Selected:</div>
<div class="text-soft" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.6; color: #5b5348;">{dates}</div>
</td></tr>
</table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 12px; border-top: 1px solid #e7d9c2;">
<tr>
<td class="text-main" style="padding: 10px 0 0 0; font-family: Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; color: #20201f;">Student Tuition:</td>
<td align="right" style="padding: 10px 0 0 0; font-family: Arial, Helvetica, sans-serif; font-size: 18px; font-weight: 700; color: #a72620;">{price}</td>
</tr>
</table>
</td></tr>
</table>"""

    summary_row = """
<tr>
<td class="border-line" style="padding: 12px 18px; border-bottom: 1px solid #efe3cf;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td class="text-soft" style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #5b5348;">{label}</td>
<td align="right" style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: {color};">{value}</td>
</tr></table>
</td>
</tr>"""

    installment_row = """
<tr>
<td class="border-line" style="padding: 11px 18px; border-bottom: 1px solid #efe3cf;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td class="text-soft" style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #5b5348;">{due}</td>
<td align="right" class="text-main" style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #20201f;">{amount}</td>
</tr></table>
</td>
</tr>"""

    yct_block = """
<tr>
<td class="bg-card fluid-pad" style="background-color:#fffdf8; padding: 8px 34px 0 34px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="border-line bg-tint" style="border: 1px solid #efe3cf; border-radius: 12px; background-color:#fdf6ec;">
<tr><td style="padding: 18px 22px;">
<div style="font-family: Georgia, 'Times New Roman', serif; font-size: 17px; font-weight: 700; color: #a72620; margin: 0 0 6px 0;">{title}</div>
<p class="text-soft" style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.65; color: #5b5348;">{note}</p>
</td></tr>
</table>
</td>
</tr>"""

    cards = ""
    for i, c in enumerate(payload.get("children", []), start=1):
        student = c.get("student") or {}
        dates = c.get("sessionDates") or []
        pricing = c.get("pricing") or {}
        cards += child_card.format(
            index=i,
            name=student.get("name", ""),
            age=student.get("age", ""),
            levelName=c.get("levelName", ""),
            placementStatus=c.get("placementStatus") or "Pending Review",
            enrollmentLabel=c.get("enrollmentLabel") or c.get("planName") or "",
            schedule=_schedule_lines(c.get("schedule")),
            sessions=len(dates),
            dates=_group_dates_by_month(dates),
            price=_money(pricing.get("total")),
        )

    parent = payload.get("parent") or {}
    coupon = payload.get("coupon")
    payment = payload.get("payment") or {}
    package_savings = payload.get("packageSavings")
    sibling_discount = payload.get("siblingDiscount")

    def _savings_row(label, amount):
        if not amount:
            return ""
        return summary_row.format(
            label=label, value=f"&minus;{_money(amount)}", color="#a72620"
        )

    coupon_row = ""
    if coupon:
        coupon_row = summary_row.format(
            label=f"Coupon ({coupon.get('code', '')})",
            value=f"&minus;{_money(coupon.get('discount'))}",
            color="#a72620",
        )

    installments = payment.get("installments") or []
    if payment.get("method") == "plan" and installments:
        plan_line = payment.get("planName") or f"You selected the {len(installments)}-Payment Installment Plan."
        installment_rows = "".join(
            installment_row.format(
                due=i.get("due", i.get("label", "")), amount=_money(i.get("amount"))
            )
            for i in installments
        )
    else:
        plan_line = payment.get("planName") or "You selected to pay in full."
        installment_rows = installment_row.format(
            due="Paid in full", amount=_money(payment.get("amount") or payload.get("householdTotal"))
        )

    yct = payload.get("yct")
    yct_html = ""
    if yct:
        yct_html = yct_block.format(
            title=yct.get("title") or "YCT Exam Day",
            note=yct.get("note") or "",
        )

    savings_total = payload.get("householdSavings")
    if savings_total in (None, ""):
        savings_total = sum(
            float(v or 0)
            for v in [package_savings, sibling_discount, (coupon or {}).get("discount")]
        )

    fields = {
        "{{children_cards}}": cards,
        "{{term}}": payload.get("term") or "Fall 2026",
        "{{standardTuition}}": _money(payload.get("standardTuition") or payload.get("householdSubtotal")),
        "{{packageSavingsRow}}": _savings_row("Package Savings", package_savings),
        "{{siblingDiscountRow}}": _savings_row("Sibling Discount", sibling_discount),
        "{{couponRow}}": coupon_row,
        "{{paymentPlanLine}}": plan_line,
        "{{installment_rows}}": installment_rows,
        "{{yctBlock}}": yct_html,
        "{{householdTotal}}": _money(payload.get("householdTotal")),
        "{{householdSavings}}": _money(savings_total) or "$0",
        "{{parentName}}": parent.get("name") or "",
        "{{parentEmail}}": parent.get("email") or "",
        "{{parentPhone}}": parent.get("phone") or "",
        "{{policyAcknowledged}}": "Accepted" if payload.get("policyAcknowledged") else "Not accepted",
        "{{mediaConsent}}": "Granted" if (payload.get("privacy") or {}).get("mediaConsent") else "Declined",
        "{{logoUrl}}": payload.get("logoUrl") or LOGO_URL,
        "{{submittedAt}}": _format_timestamp(payload.get("submittedAt")),
    }
    for token, value in fields.items():
        html_content = html_content.replace(token, str(value))

    subject = "Your Hello Chinese Sunday Program Enrollment"
    recipients = [r for r in [parent.get("email"), NOTIFY] if r]

    send_email(recipients, html_content, subject)
