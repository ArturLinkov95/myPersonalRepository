const weather = (temp) => {
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

const discount = (count) => {
    if (count > 1000 && count < 5000) {
        console.log(count = count - count * 5 / 100)
    }
    else if (count > 5000) {
        console.log(count = count - count * 10 / 100)
    }
}

discount(5001);

const userAge = (age) => {
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

const operatingMode1 = (time) => {
    if (time >= 9 && time <= 18) {
        console.log("Магазин открыт")
    }
    else {
        console.log("Магазин закрыт")
    }
}

operatingMode1(19);

const operatingMode2 = (time) => time >= 9 && time <= 18 ? console.log("Магазин открыт") : console.log("Магазин закрыт");

operatingMode2(19);

const testRating = (score) => {
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

const checkAge = (age) => {
    if (age < 18) {
        console.log("you are not allowed")
    }
    if (age >= 18) {
        console.log("you are welcome!")
    }
}

checkAge(18);

const сalc = (operation, a, b) => {
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