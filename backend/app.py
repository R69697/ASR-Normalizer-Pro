from flask import Flask, request, jsonify
from flask_cors import CORS
import cohere
import os
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("COHERE_API_KEY")

if not API_KEY:
    raise ValueError("❌ API key not loaded. Add it to your .env file.")

co = cohere.Client(API_KEY)

app = Flask(__name__)
CORS(app)  # Allow all origins

def inverse_normalize(text):
    prompt = f"""
You are a highly advanced and professional ASR (Automatic Speech Recognition) Inverse Normalization engine.

Your task is to convert spoken-form text (as output by speech-to-text systems) into its correctly formatted written form. This includes handling:

- Numbers (e.g., "one hundred and twenty five" → "125")
- Dates (e.g., "twenty first june two thousand twenty five" → "21st June 2025")
- Times (e.g., "seven thirty pm" → "7:30 PM")
- Currency (e.g., "two hundred dollars" → "$200")
- Measurements (e.g., "fifty five kilograms" → "55 kg")
- Phone numbers (e.g., "nine one eight three four" → "91834")
- Ordinals and Fractions (e.g., "third" → "3rd", "one fourth" → "¼")

Maintain proper capitalization, punctuation, and spacing. Do **not** change the meaning or grammar. Keep the sentence grammatically correct and clean.

If the input does not require normalization, return the original sentence as it is.

---

Input: "{text}"
Normalized:
"""

    try:
        response = co.generate(
            model="command",
            prompt=prompt,
            max_tokens=50,
            temperature=0.3
        )
        return response.generations[0].text.strip()
    except Exception as e:
        print(f"Cohere API error: {str(e)}")
        return text  # Fallback to original text if API fails

@app.route("/normalize", methods=["POST"])
def normalize():
    try:
        data = request.get_json()
        if not data or 'text' not in data:
            return jsonify({"error": "Missing 'text' parameter"}), 400
            
        text = data["text"]
        if not text or not isinstance(text, str):
            return jsonify({"error": "Invalid text input"}), 400
            
        result = inverse_normalize(text)
        return jsonify({"normalized": result})
        
    except Exception as e:
        print(f"Server error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)