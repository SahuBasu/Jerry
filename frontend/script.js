// frontend/script.js

const speakBtn = document.getElementById("speakBtn");
const chat = document.getElementById("chat");

// Text-to-Speech
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance);
}

// Display + Speak
function respond(text) {
  chat.innerHTML += `<div><strong>Assistant:</strong> ${text}</div>`;
  speak(text);
}

// Speech-to-Text
function listen() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    respond("Sorry, your browser does not support speech recognition.");
    return;
  }
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = function (event) {
    const userText = event.results[0][0].transcript;
    chat.innerHTML += `<div><strong>You:</strong> ${userText}</div>`;
    handleCommand(userText);
  };

  recognition.onerror = function(event) {
    respond("Sorry, I couldn't understand. Please try again.");
  };
}

// Simple commands (extend later)
function handleCommand(text) {
  const lower = text.toLowerCase();
  if (lower.includes("time")) {
    const time = new Date().toLocaleTimeString();
    respond(`Current time is ${time}`);
  } else if (lower.includes("your name")) {
    respond("I'm Jerry, your voice assistant, Basu!");
  }
  else if (lower.includes("ankush")) {
    respond("hello ankush sir! How can I assist you today?");
  }
  else if (lower.includes("say hello to ankur sir")) {
    respond("Hello Ankur sir! How can I assist you today?");
  }
  else if (lower.includes("say hello to my friend")) {
    respond("Hello Chitransh sir! How can I assist you today?");
  }
   else {
    respond("I heard you, but I need more training to respond to that.");
  }
}

speakBtn.addEventListener("click", listen);
