let toDoList = ["Сделать зарядку", "Почистить зубы", "Позавтракать"];

let toDoList2 = Array.of("Сделать зарядку", "Умыться", "Почистить зубы", "Позавтракать");

let toDoList3 = new Array("Завести собаку", "Покормить собаку", "Выгулить собаку");

console.log(toDoList);

console.log(toDoList2);

console.log(toDoList3);

const addLastTastToDoList = (nameTast) => {
    toDoList.push(nameTast);
    console.log(toDoList);
};

addLastTastToDoList("Сделать уборку");

addLastTastToDoList("Вымыть посуду");

const lastItem = toDoList.pop();

console.log(lastItem);

console.log(toDoList);

const firstItem = toDoList.shift();

console.log(firstItem);

console.log(toDoList);

const addFirstTastToDoList = (nameTast) => {
    toDoList.unshift(nameTast);
    console.log(toDoList);
};

addFirstTastToDoList("Сделать зарядку");

addFirstTastToDoList("Проснуться");

addLastTastToDoList("Пройти доту");

let deletedTask = toDoList.splice(5, 1);

console.log(toDoList);

console.log(deletedTask);

let deletedTask2 = toDoList.splice(0, 1);

console.log(toDoList);

console.log(deletedTask2);

toDoList.splice(0, 0, "Открыть глаза");

console.log(toDoList);

toDoList.splice(1, 0, "Застелить кровать");

console.log(toDoList);

toDoList.splice(6, 0, "Сесть играть в компьютер");

console.log(toDoList);