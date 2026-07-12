const chatInput = document.getElementById("chat-input");
const chatList = document.getElementById("chat-list");
const chatSend = document.getElementById("chat-send");
const templateMe = document.getElementById("template-me");
const templateFrom = document.getElementById("template-from");
if (!chatInput || !chatList || !chatSend || !templateMe || !templateFrom) {
    throw new Error("Не удалось найти необходимые элементы DOM");
}
const email = 'arturlinkov95@rambler.ru';
const TOKEN_KEY = 'token';
const DEFAULT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFydHVybGlua292OTVAcmFtYmxlci5ydSIsImlhdCI6MTc4MTAyODIyNywiZXhwIjoxNzg0NjI0NjI3fQ.Z-ntDyUnZzQNiClKx-c3iYsq3HhN5riwMs9StSH7Xtc";
const HISTORY_KEY = 'history';
let allMessages = [];
let offset = 0;
const limit = 20;
let isHistoryFinished = false;
function getToken() {
    let token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
        token = DEFAULT_TOKEN;
        localStorage.setItem(TOKEN_KEY, DEFAULT_TOKEN);
    }
    return token;
}
const socket = new WebSocket(`wss://edu.strada.one/websockets?${getToken()}`);
function getTimeData(timeData = Date.now()) {
    const time = new Date(timeData);
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}
function renderMessage(userName, userMessage, timeMessage, userEmail = email) {
    const isMe = userEmail === email;
    const template = isMe ? templateMe : templateFrom;
    if (!template)
        return;
    const content = template.content.cloneNode(true);
    const messageText = content.querySelector('.message-text');
    const messageTime = content.querySelector('.message-time');
    const prefix = isMe ? 'Lance: ' : `${userName}: `;
    if (!messageText || !messageTime)
        return;
    messageText.textContent = `${prefix}${userMessage}`;
    messageTime.textContent = timeMessage;
    return content;
}
async function getMessage() {
    try {
        const response = await fetch('https://edu.strada.one/api/messages', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
        });
        if (!response.ok)
            throw new Error('Ошибка сервера');
        const data = await response.json();
        localStorage.setItem(HISTORY_KEY, JSON.stringify(data));
        allMessages = data.messages;
        const firstMessages = allMessages.slice(offset, offset + limit);
        const fragment = document.createDocumentFragment();
        for (let i = firstMessages.length - 1; i >= 0; i--) {
            const messageElement = renderMessage(firstMessages[i].user.name, firstMessages[i].text, getTimeData(firstMessages[i].createdAt), firstMessages[i].user.email);
            if (messageElement) {
                fragment.prepend(messageElement);
            }
        }
        if (!chatList) {
            return;
        }
        chatList.prepend(fragment);
    }
    catch (error) {
        if (error instanceof Error) {
            alert(error.message);
        }
    }
}
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
    const messageElement = renderMessage(userName, messageText, getTimeData(), userEmail);
    if (messageElement) {
        chatList.prepend(messageElement);
    }
};
document.addEventListener('DOMContentLoaded', () => {
    getMessage();
});
function loadingMessages() {
    const fragment = document.createDocumentFragment();
    const newP = document.createElement('p');
    newP.classList.add('newP');
    newP.textContent = 'Вся история загружена';
    if (isHistoryFinished) {
        return;
    }
    if (offset < allMessages.length) {
        const part = allMessages.slice(offset, offset + limit);
        for (let i = part.length - 1; i >= 0; i--) {
            const messageElement = renderMessage(part[i].user.name, part[i].text, getTimeData(part[i].createdAt), part[i].user.email);
            if (messageElement) {
                fragment.prepend(messageElement);
            }
        }
        offset += limit;
        if (!chatList) {
            return;
        }
        chatList.append(fragment);
    }
    else {
        isHistoryFinished = true;
        if (!chatList) {
            return;
        }
        chatList.append(newP);
    }
}
chatList.addEventListener('scroll', () => {
    if (chatList.scrollTop <= 0) {
        loadingMessages();
    }
});
export {};
//# sourceMappingURL=main.js.map