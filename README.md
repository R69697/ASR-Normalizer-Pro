# 🧠 ASR Inverse Text Normalization (Hindi) using AI

This project implements an intelligent **Inverse Text Normalization (ITN)** system for **Hindi ASR (Automatic Speech Recognition)** output. It converts spoken-form text produced by ASR engines into clean, correctly formatted written text — essential for readability and downstream NLP applications.

---

## 🔍 Problem Statement

ASR systems typically output text in a **spoken format**, lacking numerical formatting, punctuation, or semantic structure. For example:
Input: today i wake up seven am

Output: Today I woke up at 7 AM.

Input: i have two meetings on march fifth

Output: I have 2 meetings on March 5th.

Input: my birthday is june twenty second

Output: My birthday is June 22nd.

Input: he paid one thousand five hundred

Output: He paid $1,500.


This project solves this challenge using a **hybrid approach** combining rule-based NLP and AI.

---

## 🚀 Key Features

* 🪄 Hindi tokenization using the Indic NLP Library
* 🔢 Custom word-to-number mapping for Indian number systems
* 📍 Entity recognition (currency, time, date, etc.)
* 🧩 Modular design for AI/ML integration (e.g., transformers)
* ♻️ Web-based interface built using Flask, HTML/CSS/JS

---

## 🛠️ Tech Stack

| Technology                          | Usage                       |
| ----------------------------------- | --------------------------- |
| Python 3.10+                        | Core backend language       |
| Flask                               | Web server framework        |
| HTML/CSS/JS                         | Frontend interface          |
| Indic NLP                           | Hindi/English tokenization  |
| Regex (re)                          | Rule-based pattern matching |
| HuggingFace Transformers (optional) | AI model integration        |

---

## 📁 Project Structure

```
asr_project/
├── app.py                # Flask backend logic
├── .env                  # Environment variables
├── static/               # Frontend static files
│   ├── style.css         # Custom styling
│   └── script.js         # Frontend behavior
├── templates/            # HTML templates
│   └── index.html        # Main user interface
└── README.md             # Project documentation
```

---

## ⚙️ How to Run

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/asr-itn-hindi.git
cd asr-itn-hindi
```

### 2. Set up environment

```bash
pip install -r requirements.txt
```

Create a `.env` file and add necessary configuration if needed.

### 3. Run the application

```bash
python app.py
```

Access it in your browser at `http://localhost:5000`

---

## 📀 Sample Input/Output

```bash
Input: ek sau bees rupaye
Output: ₹120

Input: do hazaar bees
Output: 2020
```

---

## 🧠 Future Enhancements

* 🤖 Fine-tune a transformer model (IndicBERT or mBART) for sequence-to-sequence ITN
* 🏷️ Integrate Named Entity Recognition (NER) for additional domains (percent, weights, etc.)
* 🔗 Connect to live ASR engines for real-time normalization

---



## 👩‍💻 Author

**Rajani Maurya**
AI & NLP Enthusiast | Speech & Language Tech
🔗 [LinkedIn](https://www.linkedin.com/in/rajanimaurya01/)

---

## ⭐ Support

If you find this project helpful, feel free to:

* ⭐ Star it on GitHub
* 🛠️ Fork or contribute
