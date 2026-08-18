from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from services.email_service import (
    send_saturday_interest_email,
    send_free_trial_email,
    send_private_lessons_email,
    send_sunday_program_email,
)
import os

load_dotenv()

allowed_origins = ["http://localhost:5173"] 

FRONTEND_URL = os.getenv("FRONTEND_URL")

if FRONTEND_URL:
    allowed_origins.append(FRONTEND_URL)

app = Flask(__name__)
CORS(app, origins=allowed_origins, supports_credentials=True)

mail = Mail(app)

app.logger.info(
    "Mail config: server=%s port=%s username_set=%s password_set=%s",
    app.config["MAIL_SERVER"],
    app.config["MAIL_PORT"],
    bool(app.config["MAIL_USERNAME"]),
    bool(app.config["MAIL_PASSWORD"]),
)

# @app.route("/send-test-email", methods=['POST'])
# def send_test_email():
#     data = request.get_json();
#     payload = data.get('msg')

#     print(payload)

#     if not payload:
#         return jsonify({'error' : 'payload is requred'}), 400

#     send_email(payload)

#     return jsonify({'message' : 'Email Sent'}), 200


@app.route("/trial-email", methods=["POST"])
def send_trial_email():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Missing or invalid JSON body"}), 400

    parent = data.get("parent") or {}
    if not parent.get("email") or not parent.get("name"):
        return jsonify({"error": "Parent name and email are required"}), 400

    try:
        send_free_trial_email(data)
    except Exception:
        app.logger.exception("Free trial email failed")
        return jsonify({"error": "Could not send confirmation email"}), 500

    return jsonify({"message": "OK"}), 200


@app.route("/private-lesson-email", methods=["POST"])
def send_private_lesson_email():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error" : "Missing or invalid JSON body"}), 400

    parent = data.get("parentName") or {}
    if not data.get("email") or not parent:
        return jsonify({"error" : "Parent name and email are required"}), 400

    try:
        send_private_lessons_email(data)
    except Exception:
        app.logger.exception("Private Lessons email failed")
        return jsonify({"error": "Could not send confirmation email"}), 500

    return jsonify({"message": "OK"}), 200


@app.route("/saturday-interest-email", methods=["POST"])
def saturday_interest_email():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"error" : "Missing or invalid JSON body"}), 400

    parent = data.get("parentName") or {}
    if not data.get("email") or not parent:
            return jsonify({"error" : "Parent name and email are required"}), 400

    try:
        send_saturday_interest_email(data)
    except Exception:
        app.logger.exception("Saturday Interest email failed")
        return jsonify({"error" : "Could not send confirmation email"}), 500
    
    return jsonify({"message": "OK"}), 200


@app.route("/sunday-registration-email", methods=["POST"])
def sunday_registration_email():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"error" : "Missing or invalid JSON body"}), 400
    
    parent = data.get("parent") or {}
    if not parent.get("email") or not parent.get("name"):
        return jsonify({"error" : "Parent name and email are required"}), 400

    try:
        send_sunday_program_email(data)
    except Exception:
        app.logger.exception("Sunday Registration email failed")
        return jsonify({"error" : "Could not send confirmation email"}), 500

    return jsonify({"message": "OK"}), 200


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
