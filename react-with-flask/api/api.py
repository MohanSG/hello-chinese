from flask import Flask, request, Response
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

client = OpenAI(
    api_key=os.getenv("OPENAI_API")
)


@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()

    messages = data["messages"]

    def generate():
        stream = client.chat.completions.create(
            model="gpt-5",
            messages=messages,
            stream=True
        )

        for chunk in stream:
            delta = chunk.choices[0].delta.content
            if delta:
                yield delta

    return Response(
        generate(),
        mimetype="text/plain"
    )


if __name__ == "__main__":
    app.run(debug=True)