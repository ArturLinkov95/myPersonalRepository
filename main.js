const buttonSend = document.getElementById('button-send');
const chatInput = document.getElementById('chat-input');

const chatList = document.getElementById('chat-list');
const templateFrom = document.getElementById('message-from');
const templateMe = document.getElementById('message-me');

localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFydHVybGlua292OTVAcmFtYmxlci5ydSIsImlhdCI6MTc4MTAyODIyNywiZXhwIjoxNzg0NjI0NjI3fQ.Z-ntDyUnZzQNiClKx-c3iYsq3HhN5riwMs9StSH7Xtc");
const token = localStorage.getItem('token');

function getTimeData(data, index) {
    const timeData = data.messages[index].createdAt;
    const time = new Date(timeData);
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`
    return formattedTime;
};

function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};

function renderMessage(userName, userMessage, timeMessage) {
    const isMe = userName === 'Я: ';
    const template = isMe ? templateMe : templateFrom;
    const content = template.content.cloneNode(true);

    const messageText = content.querySelector('.message-text');
    const messageTime = content.querySelector('.message-time');

    const prefix = isMe ? 'Я: ' : `${userName}: `;
    messageText.textContent = `${prefix}${userMessage}`;
    messageTime.textContent = timeMessage;

    return content;
};

async function getMessage() {
    try {
        const response = await fetch('https://edu.strada.one/api/messages', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) throw new Error('Ошибка сервера');
        const data = await response.json();
        const dataMessage = data.messages;

        const fragment = document.createDocumentFragment();

        for (let i = dataMessage.length - 1; i >= 0; i--) {
            const messageElement = renderMessage(data.messages[i].user.name, data.messages[i].text, getTimeData(data, i));
            fragment.prepend(messageElement);
        }
        chatList.prepend(fragment);
        console.log('Запрос отправлен');
    } catch (error) {
        alert('Запрос не прошёл');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    getMessage();
});

function sendMessage(event) {
    event.preventDefault();
    if (chatInput.value.trim() === "") {
        return;
    }
    chatList.prepend(renderMessage(`Я: `, chatInput.value, getCurrentTime()));
    chatInput.value = "";
};

buttonSend.addEventListener('click', sendMessage);