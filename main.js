function weather(temp) {
    if (temp < 0) {
        console.log("Опасно холодно!")
    }
    else if (temp >= 0 && temp <= 5) {
        console.log("Очень холодно")
    }
    else if (temp >= 5 && temp <= 20) {
        console.log("Прохладно")
    }
    else if (temp > 20) {
        console.log("Тепло")
    }
};

weather(21);

function discount(count) {
    if (count > 1000 && count < 5000) {
        console.log(count = count - count * 5 / 100)
    }
    else if (count > 5000) {
        console.log(count = count - count * 10 / 100)
    }
}

discount(5001);

function userAge(age) {
    if (age <= 17) {
        console.log("подросток")
    }
    else if (age >= 17 && age <= 64) {
        console.log("взрослый")
    }
    else {
        console.log("пенсионер")
    }
}

userAge(100);

function operatingMode1(time) {
    if (time >= 9 && time <= 18) {
        console.log("Магазин открыт")
    }
    else {
        console.log("Магазин закрыт")
    }
}

operatingMode2(19);

function operatingMode2(time) {
    time >= 9 && time <= 18 ? console.log("Магазин открыт") : console.log("Магазин закрыт");
}

operatingMode2(19);

function testRating(score) {
    if (score <= 100 && score >= 90) {
        console.log("Отлично")
    }
    else if (score <= 89 && score >= 70) {
        console.log("Хорошо")
    }
    else if (score <= 69 && score >= 50) {
        console.log("Удовлетворительно")
    }
    else if (score <= 49 && score >= 0) {
        console.log("Неудачно")
    }
    else (console.log("Некорректное значение"))
};

testRating(101);

// Попробуйте сами:
// Объявите функцию с именем checkAge()
// Добавьте параметр age
// Добавьте условие: если age меньше 18 - выводите в консоль “you are not allowed”, а если больше или равно то “you are welcome!”
// Попробуйте вызвать эту функцию несколько раз чтобы проверить ее работу

function checkAge(age) {
    if (age < 18) {
        console.log("you are not allowed")
    }
    if (age >= 18) {
        console.log("you are welcome!")
    }
}

checkAge(18);

// Попробуйте сами:
// Создайте простую функцию калькулятор с именем сalc()
// С тремя параметрами a и b, а также operation
// Вызов сalc(‘add’, 1, 2) - возвращает 3
// Вызов сalc(‘multi’, 1, 2) - возвращает 2
// Вызов сalc(’subtract’, 3, 2) - возвращает 1
// Делить пока ничего не надо.

function сalc(operation, a, b) {
    if (operation === "add") {
        console.log(a + b)
    }
    else if (operation === "multi") {
        console.log(a - b)
    }
    else if (operation === "subtract") {
        console.log(a * b)
    }
}

сalc("add", 37, 15);
сalc("multi", 72, 17);
сalc("subtract", 16, 8);