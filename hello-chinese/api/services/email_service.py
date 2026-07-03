from flask_mail import Message
from flask import current_app
from extensions import mail


def send_email(subject, recipient, body):

    html_content = """
    <html>
        <body>
            <h2>Form Submission Summary</h2>
            <table border="1" cellpadding="8" cellspacing="0">
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Class Type</th>
                    <th>Sessions</th>
                </tr>
    """

    for form in body:
        html_content += f"""
            <tr>
                <td>{form.get('firstName')} {form.get('lastName')}</td>
                <td>{form.get('age')}</td>
                <td>{form.get('type')} Class</td>
                <td>{form.get('sessions')} Sessions per week</td>
            </tr>
        """

    html_content += """
            </table>
        </body>
    </html>
    """

    msg = Message(
        subject,
        sender=current_app.config["MAIL_USERNAME"],
        recipients=[recipient],
        html=html_content
    )

    print(msg.html)
    mail.send(msg)
