const emailInput = document.getElementById('email-input');
const form = document.getElementById('auth-form');

async function sendEmail(email) {
    try {
        const response = await fetch('https://edu.strada.one/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        });
        if (!response.ok) throw new Error('Ошибка сервера');
        alert('Запрос успешно отправлен');
        emailInput.value = "";
    } catch (error) {
        alert('Не удалось отправить запрос');
    }
};

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = emailInput.value.trim();
    if (!email) {
        alert('Введите email');
        return;
    }

    sendEmail(email);
});