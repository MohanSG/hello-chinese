from flask_mail import Message
from flask import current_app
from extensions import mail
from datetime import datetime
# import resend
import os

# resend.api_key= os.environ["RESEND_API_KEY"]

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

    subject = "New Contact"
    recipients = ['mohansg12@gmail.com']

    msg = Message(
        subject,
        sender=current_app.config["MAIL_USERNAME"],
        recipients=recipients,
        html=html_content,
    )

    mail.send(msg)

from datetime import datetime

def send_saturday_interest_email(payload):
    with open("templates/saturday_interest_list_notification.html", "r", encoding="utf-8") as f:
        html_content = f.read()

    submitted = payload.get("submittedAt")
    try:
        submitted = datetime.fromisoformat(submitted.replace("Z", "+00:00")).strftime(
            "%B %d, %Y at %I:%M %p"
        )
    except (AttributeError, ValueError):
        submitted = submitted or ""

    fields = {
        "{{parentName}}": payload.get("parentName") or "",
        "{{email}}": payload.get("email") or "",
        "{{childAgeGrade}}": payload.get("childAgeGrade") or "",
        "{{programInterest}}": payload.get("programInterest") or "",
        "{{preferredTime}}": payload.get("preferredTime") or "No preference given",
        "{{comments}}": payload.get("comments") or "No comments provided.",
        "{{submittedAt}}": submitted,
    }
    for token, value in fields.items():
        html_content = html_content.replace(token, str(value))

    subject = f"Saturday Interest List - {payload.get('parentName')}"
    recipients = ["mohansg12@gmail.com"]

    msg = Message(
        subject,
        sender=current_app.config["MAIL_USERNAME"],
        recipients=recipients,
        html=html_content,
    )

    mail.send(msg)