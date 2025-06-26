// 🌐 Backend URL Auto-detection (no hardcoding)
const BACKEND_URL = "http://127.0.0.1:5000/normalize";


// 🎤 Speech Recognition Setup
let recognition;
let isListening = false;

function initializeSpeechRecognition() {
  try {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) throw new Error("Speech recognition not supported");

    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      document.getElementById('userInput').value = transcript;
      sendMessage();
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      showError(`Voice input failed: ${event.error}`);
      resetVoiceButton();
    };

    recognition.onend = () => {
      if (isListening) {
        recognition.start(); // Restart if user hasn’t stopped
      } else {
        resetVoiceButton();
      }
    };

  } catch (error) {
    console.warn('Speech recognition initialization failed:', error);
    showError("Voice input is not supported in your browser");
  }
}

// 🔁 Voice Input Controls
function toggleVoiceInput() {
  const voiceBtn = document.getElementById('voiceBtn');
  if (!recognition) return showError("Voice recognition not initialized");

  isListening ? stopVoiceRecognition() : startVoiceRecognition();
}

function startVoiceRecognition() {
  try {
    recognition.start();
    isListening = true;
    updateVoiceButton(true);

    setTimeout(() => {
      if (isListening) {
        stopVoiceRecognition();
        showError("No speech detected");
      }
    }, 10000);
    
  } catch (error) {
    console.error('Mic error:', error);
    showError("Error accessing microphone");
    resetVoiceButton();
  }
}

function stopVoiceRecognition() {
  if (recognition && isListening) recognition.stop();
  isListening = false;
  resetVoiceButton();
}

function updateVoiceButton(active) {
  const voiceBtn = document.getElementById('voiceBtn');
  voiceBtn.classList.toggle('active', active);
  voiceBtn.innerHTML = `<i class="fas ${active ? 'fa-microphone-slash' : 'fa-microphone'}"></i>`;
}

function resetVoiceButton() {
  updateVoiceButton(false);
}

// 💬 Chat Sending & Receiving
async function sendMessage() {
  const input = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");
  const userText = input.value.trim();
  if (!userText) return;

  sendBtn.disabled = true;
  input.disabled = true;
  addMessage(userText, 'user-message');
  input.value = "";
  showTypingIndicator();

  try {
    const botReply = await getBotResponse(userText);
    removeTypingIndicator();
    addMessage(botReply, 'system-message');

  } catch (error) {
    console.error("Error processing message:", error);
    removeTypingIndicator();
    showError(error.message || "An unexpected error occurred.");
  } finally {
    sendBtn.disabled = false;
    input.disabled = false;
    input.focus();
    scrollToBottom();
  }
}

// 🔗 Fetching from Backend
async function getBotResponse(userText) {
  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: userText })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const data = await response.json();
    return data.normalized || "No response received";

  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to connect to server.");
  }
}

// 🧱 UI Functions
function addMessage(text, type) {
  const chatbox = document.getElementById("chatbox");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${type}`;
  messageDiv.innerHTML = `<div class="bubble">${text}</div>`;
  chatbox.appendChild(messageDiv);
  scrollToBottom();
}

function showTypingIndicator() {
  const chatbox = document.getElementById("chatbox");
  const typingDiv = document.createElement("div");
  typingDiv.className = "message system-message";
  typingDiv.innerHTML = `
    <div class="bubble typing-indicator">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>`;
  chatbox.appendChild(typingDiv);
  scrollToBottom();
}

function removeTypingIndicator() {
  const typingIndicators = document.querySelectorAll(".typing-indicator");
  typingIndicators.forEach(indicator => indicator.parentElement?.remove());
}

function showError(message) {
  const chatbox = document.getElementById("chatbox");
  const errorDiv = document.createElement("div");
  errorDiv.className = "message system-message";
  errorDiv.innerHTML = `<div class="bubble error">⚠️ ${message}</div>`;
  chatbox.appendChild(errorDiv);
  scrollToBottom();
}

function scrollToBottom() {
  const chatbox = document.getElementById("chatbox");
  chatbox.scrollTop = chatbox.scrollHeight;
}

// 📦 Initialize
document.addEventListener("DOMContentLoaded", () => {
  initializeSpeechRecognition();

  const input = document.getElementById("userInput");
  document.getElementById("sendBtn").addEventListener("click", sendMessage);
  document.getElementById("voiceBtn").addEventListener("click", toggleVoiceInput);

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
});
