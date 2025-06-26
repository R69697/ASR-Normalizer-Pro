import os
import cohere
from dotenv import load_dotenv

# ✅ Load .env file
load_dotenv()
API_KEY = os.getenv("COHERE_API_KEY")

if not API_KEY:
    print("❌ API key not loaded. Check your .env file.")
    exit()

# ✅ Connect to Cohere
co = cohere.Client(API_KEY)

def inverse_normalize(text):
    prompt = (
    "You are a professional ASR Inverse Normalization engine. "
    "Convert all spoken numbers in the sentence below into their correct numeric forms. "
    "This includes dates, times, currency, phone numbers, quantities, and measurements. "
    "Keep the grammar correct and format clean.\n\n"
    f"Sentence: {text}\nNormalized:"
)


    response = co.generate(
        model="command",
        prompt=prompt,
        max_tokens=50,
        temperature=0.3
    )

    return response.generations[0].text.strip()

# ✅ Sample Test
if __name__ == "__main__":
    examples = [
        "twenty first june two thousand twenty five",
        "i paid five hundred rupees",
        "call nine one eight three seven",
        "i woke up at five am",
        "the price is two point five dollars"
    ]

    for text in examples:
        print(f"🗣️ {text}")
        print(f"🧠 {inverse_normalize(text)}\n")
