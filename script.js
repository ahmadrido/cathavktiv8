const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const submitButton = form.querySelector('button[type="submit"]');

const API_URL = 'http://localhost:3000/api/chat';
const conversation = [];
let isSubmitting = false;

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  if (isSubmitting) return;

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage('user-message', userMessage);
  conversation.push({ role: 'user', text: userMessage });
  input.value = '';

  setLoadingState(true);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(conversation)
    });

    if (!response.ok) {
      throw new Error('Gagal menghubungi server');
    }

    const data = await response.json();
    const botReply = data?.reply || 'Meow! Maaf, saya belum bisa menjawab sekarang.';

    appendMessage('bot-message', botReply);
    conversation.push({ role: 'model', text: botReply });
  } catch (error) {
    appendMessage('bot-message', `Terjadi error: ${error.message}`);
  } finally {
    setLoadingState(false);
    input.focus();
  }
});

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function setLoadingState(loading) {
  isSubmitting = loading;
  submitButton.disabled = loading;
  input.disabled = loading;

  if (loading) {
    submitButton.dataset.originalText = submitButton.textContent;
    submitButton.textContent = 'Mengirim';
    submitButton.classList.add('is-loading');
  } else {
    submitButton.textContent = submitButton.dataset.originalText || 'Kirim';
    submitButton.classList.remove('is-loading');
  }
}
