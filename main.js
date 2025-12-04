const list = {};

function showList() {
    console.log(list);
};

function addTask(name) {
    list[name] = "To Do";
};

addTask("Прочесть книгу");
addTask("Вымыть пол");
addTask("Полить цветы");
addTask("Прогуляться");

showList();

function changeStatus(name, status) {
    list[name] = status;
};

changeStatus("Прочесть книгу", "Done");

showList();

function deleteTask(name) {
    delete list[name];
};

deleteTask("Прогуляться");

showList();