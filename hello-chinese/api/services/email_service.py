from flask_mail import Message
from flask import current_app
from extensions import mail


def send_email(payload):

    html_content = f"""
    <html>
        <body>
            <p>Thank you for your submission!</p>
            
            <p>Please find your details below. A member of staff will get back to you
            by phone or email within 3 business days</p>
            
            <p>Confirmation ID: <bold>{payload.get('confirmationNumber')}</bold></p>
            <table border="1" cellpadding="8" cellspacing="0">
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Class Type</th>
                    <th>Sessions</th>
                    <th>Preferred Dates</th>
                    <th>Price</th>
                </tr>
    """

    for student in payload.get("students"):
        html_content += f"""
                <tr>
                    <td>{student.get('name')}</td>
                    <td>{student.get('age')}</td>
                    <td>{student.get('type')} Class</td>
                    <td>{student.get('sessions')} Sessions per week</td>
                    <td>{student.get('daysLabel')}</td>
                    <td>{student.get('priceLabel')}</td>
                </tr>
        """
    html_content += """</table>"""

    html_content += """<div style="height:24px"></div>"""

    html_content += f"""
                <table border="1" cellpadding="8" cellspacing="0">
                    <tr>
                        <th>Confirmation Number</th>
                        <th>Payment Plan</th>
                        <th>Coupon Code</th>
                        <th>Discount</th>
                        <th>Total</th>
                    </tr>
                    <tr>
                        <td>{payload.get('confirmationNumber')}</td>
                        <td>{payload.get('paymentPlan')}</td>
                        <td>{"None" if not payload.get('couponCode') else payload.get('couponCode')}</td>
                        <td>{payload.get('discount')}</td>
                        <td>{payload.get('total')}</td>
                    </tr>
                </table>
    """

    html_content += """
        </body>
    </html>
    """

    subject = f"{payload.get('confirmationNumber')} - Hello Chinese Enrollment"
    recipients = payload.get('recipientEmail')
    recipients.append("hello.nihao.chinese@gmail.com")
    
    msg = Message(
        subject,
        sender=current_app.config["MAIL_USERNAME"],
        recipients=recipients,
        html=html_content,
    )

    print(msg.html)
    mail.send(msg)
