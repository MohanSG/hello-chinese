from flask_mail import Message
from flask import current_app
from extensions import mail
from datetime import datetime
# import resend
import os

# resend.api_key= os.environ["RESEND_API_KEY"]


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


def _format_timestamp(value):
    """Turn an ISO timestamp from the frontend into a readable string."""
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00")).strftime(
            "%B %d, %Y at %I:%M %p"
        )
    except (AttributeError, ValueError):
        return value or ""


def send_email(payload):
    with open("templates/booking_confirmation_notification.html", "r", encoding="utf-8") as f:
        html_content = f.read()

    row_template = """
                <tr>
                    <td style="padding: 10px 14px; font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #20201f; border-bottom: 1px solid #e7d9c2;">{name}</td>
                    <td style="padding: 10px 14px; font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #20201f; border-bottom: 1px solid #e7d9c2;">{age}</td>
                    <td style="padding: 10px 14px; font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #20201f; border-bottom: 1px solid #e7d9c2;">{type} Class</td>
                    <td style="padding: 10px 14px; font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #20201f; border-bottom: 1px solid #e7d9c2;">{sessions} / week</td>
                    <td style="padding: 10px 14px; font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #20201f; border-bottom: 1px solid #e7d9c2;">{daysLabel}</td>
                    <td align="right" style="padding: 10px 14px; font-family: Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 600; color: #20201f; border-bottom: 1px solid #e7d9c2;">{priceLabel}</td>
                </tr>"""

    students_rows = "".join(
        row_template.format(
            name=s.get("name", ""),
            age=s.get("age", ""),
            type=s.get("type", ""),
            sessions=s.get("sessions", ""),
            daysLabel=s.get("daysLabel", ""),
            priceLabel=s.get("priceLabel", ""),
        )
        for s in payload.get("students", [])
    )

    html_content = html_content.replace("{{students_rows}}", students_rows)
    html_content = html_content.replace("{{confirmationNumber}}", str(payload.get("confirmationNumber", "")))
    html_content = html_content.replace("{{paymentPlan}}", str(payload.get("paymentPlan", "")))
    html_content = html_content.replace(
        "{{couponCode}}", "None" if not payload.get("couponCode") else str(payload.get("couponCode"))
    )
    html_content = html_content.replace("{{discount}}", str(payload.get("discount", "")))
    html_content = html_content.replace("{{total}}", str(payload.get("total", "")))

    subject = f"{payload.get('confirmationNumber')} - Hello Chinese Enrollment"
    recipients = payload.get("recipientEmail")
    recipients.append("hello.nihao.chinese@gmail.com")

    msg = Message(
        subject,
        sender=current_app.config["MAIL_USERNAME"],
        recipients=recipients,
        html=html_content,
    )

    mail.send(msg)

    # params: resend.Emails.SendParams = {
    # "from": "Acme <onboarding@resend.dev>",
    # "to": recipients,
    # "subject": subject,
    # "html": html_content,
    # }

    # email = resend.Emails.send(params)
    # print(email)


def send_contact_email(formData):
    data = formData["formData"]

    with open("templates/contact_form_notification.html", "r", encoding="utf-8") as f:
        html_content = f.read()

    html_content = html_content.replace("{{name}}", data.get("name", ""))
    html_content = html_content.replace("{{email}}", data.get("email", ""))
    html_content = html_content.replace("{{phone}}", data.get("phone", ""))
    html_content = html_content.replace("{{childAge}}", data.get("childAge", ""))
    html_content = html_content.replace("{{program}}", data.get("program", ""))
    html_content = html_content.replace("{{message}}", data.get("message", ""))
    html_content = html_content.replace(
        "{{submitted_at}}", datetime.now().strftime("%B %d, %Y at %I:%M %p")
    )

    subject = "We received your message - Hello Chinese"
    recipients = [r for r in [data.get("email"), 'mohansg12@gmail.com'] if r]

    msg = Message(
        subject,
        sender=current_app.config["MAIL_USERNAME"],
        recipients=recipients,
        html=html_content,
    )

    mail.send(msg)


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
        "{{submittedAt}}": _format_timestamp(payload.get("submittedAt")),
    }
    for token, value in fields.items():
        html_content = html_content.replace(token, str(value))

    subject = "You're on the Saturday interest list - Hello Chinese"
    recipients = [r for r in [payload.get("email"), "mohansg12@gmail.com"] if r]

    msg = Message(
        subject,
        sender=current_app.config["MAIL_USERNAME"],
        recipients=recipients,
        html=html_content,
    )

    mail.send(msg)


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
    recipients = [r for r in [parent.get("email"), "mohansg12@gmail.com"] if r]

    msg = Message(
        subject,
        sender=current_app.config["MAIL_USERNAME"],
        recipients=recipients,
        html=html_content,
    )

    mail.send(msg)


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
        "{{submittedAt}}": _format_timestamp(payload.get("submittedAt")),
    }
    for token, value in fields.items():
        html_content = html_content.replace(token, str(value))

    subject = "Your private lessons inquiry - Hello Chinese"
    recipients = [r for r in [payload.get("email"), "mohansg12@gmail.com"] if r]

    msg = Message(
        subject,
        sender=current_app.config["MAIL_USERNAME"],
        recipients=recipients,
        html=html_content,
    )

    mail.send(msg)


def send_sunday_program_email(payload):
    with open("templates/sunday_program_enrollment_confirmation.html", "r", encoding="utf-8") as f:
        html_content = f.read()

    child_card = """
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="border-line" style="border: 1px solid #e7d9c2; border-radius: 12px; margin-bottom: 12px;">
<tr><td style="padding: 16px 20px; background-color:#f6e7e1; border-radius: 11px 11px 0 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; font-weight: 700; color: #20201f;">{name}</td>
<td align="right" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; color: #a72620;">{price}</td>
</tr></table>
</td></tr>
<tr><td style="padding: 14px 20px; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.7; color: #5b5348;">
Age {age} &middot; {levelName}<br>
{planName}<br>
{schedule}<br>
{sessions} session(s): {dates}
</td></tr>
</table>"""

    cards = ""
    for c in payload.get("children", []):
        student = c.get("student") or {}
        dates = c.get("sessionDates") or []
        pricing = c.get("pricing") or {}
        cards += child_card.format(
            name=student.get("name", ""),
            age=student.get("age", ""),
            levelName=c.get("levelName", ""),
            planName=c.get("planName", ""),
            schedule=_format_schedule(c.get("schedule")),
            sessions=len(dates),
            dates=_format_dates(dates),
            price=_money(pricing.get("total")),
        )

    parent = payload.get("parent") or {}
    coupon = payload.get("coupon")
    payment = payload.get("payment") or {}

    if payment.get("method") == "plan":
        payment_line = _format_installments(payment.get("installments"))
    else:
        payment_line = f"Paid in full &middot; {_money(payment.get('amount'))}"

    fields = {
        "{{children_cards}}": cards,
        "{{householdSubtotal}}": _money(payload.get("householdSubtotal")),
        "{{couponLine}}": f"{coupon['code']} (&minus;{_money(coupon['discount'])})" if coupon else "None",
        "{{siblingDiscount}}": f"&minus;{_money(payload.get('siblingDiscount'))}" if payload.get("siblingDiscount") else "None",
        "{{packageSavings}}": f"&minus;{_money(payload.get('packageSavings'))}" if payload.get("packageSavings") else "None",
        "{{paymentLine}}": payment_line,
        "{{householdTotal}}": _money(payload.get("householdTotal")),
        "{{householdSavings}}": _money(payload.get("householdSavings")) or "$0",
        "{{parentName}}": parent.get("name") or "",
        "{{parentEmail}}": parent.get("email") or "",
        "{{parentPhone}}": parent.get("phone") or "",
        "{{language}}": "English" if payload.get("language") == "en" else "\u4e2d\u6587",
        "{{policyAcknowledged}}": "Yes" if payload.get("policyAcknowledged") else "No",
        "{{mediaConsent}}": "Granted" if (payload.get("privacy") or {}).get("mediaConsent") else "Declined",
        "{{submittedAt}}": _format_timestamp(payload.get("submittedAt")),
    }
    for token, value in fields.items():
        html_content = html_content.replace(token, str(value))

    subject = "Your HelloChinese Sunday Program Enrollment"
    recipients = [parent.get("email"), "hello.nihao.chinese@gmail.com"]

    msg = Message(
        subject,
        sender=current_app.config["MAIL_USERNAME"],
        recipients=[r for r in recipients if r],
        html=html_content,
    )

    mail.send(msg)
