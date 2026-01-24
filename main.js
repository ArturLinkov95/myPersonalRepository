// Напишите функцию, которая:

// Изменяет фон страницы на заданный цвет по клику на кнопку "Изменить фон";
// Должна получать цвет из атрибута data-color кнопки;
// Присваивать его в качестве свойства background-color элементу body на странице.

// const button = document.getElementById('change-bg');

// function changeColor() {
//     const color = String('rgb(138, 43, 226)');
//     const colorButton = button.getAttribute('data-color');

//     if (window.getComputedStyle(body).backgroundColor === color) {
//         body.style.backgroundColor = colorButton;
//     }
//     else
//         body.style.backgroundColor = color;
// };

// button.addEventListener('click', changeColor);

// Создать функцию, которая будет менять цвет фона страницы каждые 2 секунды на случайный цвет из заранее определенного списка

function changeBackgroundColor() {
    const colors = ['red', 'blue', 'green', 'orange'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    body.style.backgroundColor = randomColor;
    setTimeout(changeBackgroundColor, 2000);
};

changeBackgroundColor();