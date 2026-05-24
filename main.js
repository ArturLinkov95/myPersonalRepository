const buttonSend = document.getElementById('button-send');
const chatInput = document.getElementById('chat-input');

function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};

function renderMessage() {
    const chatList = document.getElementById('chat-list');
    const template = document.getElementById('message');
    const templateContent = template.content.cloneNode(true);

    const messageText = templateContent.querySelector('.message-text');
    const messageTime = templateContent.querySelector('.message-time');

    messageText.textContent = `Я: ${chatInput.value}`;
    messageTime.textContent = getCurrentTime();
    chatInput.value = "";

    chatList.prepend(templateContent);
};

function sendMessage(event) {
    event.preventDefault();
    if (chatInput.value.trim() === "") {
        return;
    }
    renderMessage();
};

buttonSend.addEventListener('click', sendMessage);