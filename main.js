const nameForm = document.querySelector('.name-form');
const nameInput = document.querySelector('.name-input');

localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFydHVybGlua292OTVAcmFtYmxlci5ydSIsImlhdCI6MTc4MTAyODIyNywiZXhwIjoxNzg0NjI0NjI3fQ.Z-ntDyUnZzQNiClKx-c3iYsq3HhN5riwMs9StSH7Xtc");
const token = localStorage.getItem('token');

async function changeName(name) {
    try {
        const response = await fetch('https://edu.strada.one/api/user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: name
            })
        });
        if (!response.ok) throw new Error('Ошибка сервера');
        alert('Запрос успешно отправлен');
        nameInput.value = "";
    } catch (error) {
        alert('Не удалось отправить запрос');
    }
};

nameForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = nameInput.value.trim();
    if (!name) {
        alert('Введите имя');
        return;
    }

    changeName(name);
});