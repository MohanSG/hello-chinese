from flask import Flask, request, Response, jsonify
from flask_mail import Mail
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
from extensions import mail
from services.email_service import send_email, send_contact_email
import os

load_dotenv()

allowed_origins = ["http://localhost:5173"]

FRONTEND_URL = os.getenv("FRONTEND_URL")

if FRONTEND_URL:
    allowed_origins.append(FRONTEND_URL)

app = Flask(__name__)
CORS(app, origins=allowed_origins, supports_credentials=True)

app.config['MAIL_SERVER']= 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = os.getenv("EMAIL_USER")
app.config['MAIL_PASSWORD'] = os.getenv("EMAIL_APP_PASSWORD")
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

mail = Mail(app)

app.logger.info(
    "Mail config: server=%s port=%s username_set=%s password_set=%s",
    app.config["MAIL_SERVER"],
    app.config["MAIL_PORT"],
    bool(app.config["MAIL_USERNAME"]),
    bool(app.config["MAIL_PASSWORD"]),
)

client = OpenAI(
    api_key=os.getenv("OPENAI_API")
)

@app.route("/send-test-email", methods=['POST'])
def send_test_email():
    data = request.get_json();
    payload = data.get('msg')

    print(payload)
    
    if not payload:
        return jsonify({'error' : 'payload is requred'}), 400
    
    send_email(payload)

    return jsonify({'message' : 'Email Sent'}), 200

@app.route("/contact", methods=['POST'])
def contact():
    data = request.get_json()
    send_contact_email(data)
    return jsonify({'message' : 'Email sent'}), 200

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)