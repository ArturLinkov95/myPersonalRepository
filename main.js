const chatInput = document.getElementById('chat-input');
const chatList = document.getElementById('chat-list');
const chatSend = document.querySelector('.chat-send');
const templateFrom = document.getElementById('message-from');
const templateMe = document.getElementById('message-me');
const email = 'arturlinkov95@rambler.ru';

const TOKEN_KEY = 'token';
const DEFAULT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFydHVybGlua292OTVAcmFtYmxlci5ydSIsImlhdCI6MTc4MTAyODIyNywiZXhwIjoxNzg0NjI0NjI3fQ.Z-ntDyUnZzQNiClKx-c3iYsq3HhN5riwMs9StSH7Xtc";

function getToken() {
    let token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
        token = DEFAULT_TOKEN;
        localStorage.setItem(TOKEN_KEY, DEFAULT_TOKEN);
    }
    return token;
};

const socket = new WebSocket(`wss://edu.strada.one/websockets?${getToken()}`);

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

function renderMessage(userName, userMessage, timeMessage, userEmail = email) {
    const isMe = userEmail === email;
    const template = isMe ? templateMe : templateFrom;
    const content = template.content.cloneNode(true);

    const messageText = content.querySelector('.message-text');
    const messageTime = content.querySelector('.message-time');

    const prefix = isMe ? 'Lance: ' : `${userName}: `;
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
                'Authorization': `Bearer ${getToken()}`
            },
        });
        if (!response.ok) throw new Error('Ошибка сервера');
        const data = await response.json();
        const dataMessage = data.messages;

        const fragment = document.createDocumentFragment();

        for (let i = dataMessage.length - 1; i >= 0; i--) {
            const messageElement = renderMessage(data.messages[i].user.name, data.messages[i].text, getTimeData(data, i), data.messages[i].user.email);
            fragment.prepend(messageElement);
        }
        chatList.prepend(fragment);
        console.log('Запрос отправлен');
    } catch (error) {
        alert('Запрос не прошёл');
    }
};

chatSend.onsubmit = function (event) {
    event.preventDefault();

    const message = chatInput.value.trim();
    if (message === "") {
        alert("Введите сообщение");
        return;
    }

    socket.send(JSON.stringify({ text: message }));
    chatInput.value = "";
};

socket.onmessage = function (event) {
    const data = JSON.parse(event.data);

    const messageText = data.text;
    const userName = data.user.name;
    const userEmail = data.user.email;

    console.log(data);

    chatList.prepend(renderMessage(`${userName}`, messageText, getCurrentTime(), userEmail));
};

document.addEventListener('DOMContentLoaded', () => {
    getMessage();
});