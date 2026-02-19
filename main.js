const form = document.getElementById("wrapperToDo");

import tasks from './tasks.json' with {type: "json"};

let list = [];

function showToDoList() {
    for (const task of list) {
        console.log(task);
    }
};

function changeStatus(name, textPriority) {
    const toDoListIndex = list.findIndex(item => item.name === name);
    if (toDoListIndex !== -1 && list[toDoListIndex].status === "To Do") {
        list[toDoListIndex].status = "Done", list[toDoListIndex].priority = textPriority;
    }
    else {
        list[toDoListIndex].status = "To Do";
    }
    showToDoList();
};

function removeTask(name) {
    const toDoListIndex = list.findIndex(item => item.name === name);
    list.splice(toDoListIndex, 1);
    showToDoList();
};

function createTaskDOMElement(taskValues, priority) {

    const newTaskContainer = document.createElement('div');
    newTaskContainer.classList.add('taskContainer');

    const newTaskText = document.createElement('p');
    newTaskText.classList.add('taskText');
    newTaskContainer.appendChild(newTaskText);
    newTaskText.textContent = taskValues;

    const newLabel = document.createElement('label');
    newLabel.classList.add('labelRadioBatton');
    newTaskContainer.appendChild(newLabel);

    const newSelectButtonTask = document.createElement('input');
    newSelectButtonTask.classList.add('selectButtonTask');
    newSelectButtonTask.classList.add('newSelectButtonTask');
    newSelectButtonTask.type = 'checkbox';
    newLabel.appendChild(newSelectButtonTask);

    const newDeleteButtonTask = document.createElement('button');
    newDeleteButtonTask.classList.add('deleteButtonTask');
    newTaskContainer.appendChild(newDeleteButtonTask);
    newDeleteButtonTask.textContent = 'X';

    newSelectButtonTask.addEventListener('click', function () {

        changeStatus(newTaskText.textContent, priority)

        if (newSelectButtonTask.checked) {
            newTaskText.style.backgroundColor = '#eee4e4';
            newSelectButtonTask.style.backgroundColor = 'rgb(179, 171, 169)';
        }
        else {
            newTaskText.style.backgroundColor = 'white';
            newSelectButtonTask.style.backgroundColor = 'white';
        }
    });

    newDeleteButtonTask.addEventListener('click', function (event) {
        event.preventDefault();

        removeTask(newTaskText.textContent);
        newTaskContainer.remove();
    });

    return newTaskContainer;
};

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const input = event.target.querySelector('.input');

    const inputContainer = event.target.closest('.inputContainer');

    function addTask(name) {

        let indexTask = list.findIndex(item => item.name === name);
        const canAdd = indexTask === -1;

        if (input.value.length < 3 || input.value.length > 30) {
            try {
                throw new Error("Задача не добавлена: Текст задачи должен быть от 3 до 30 символов");
            } catch (error) {
                alert(error.message);
                input.value = '';
            }
            finally {
                input.value = '';
            }
        }
        else if (!canAdd) {
            try {
                throw new Error("Задача не добавлена: Задача с таким имемем уже существует");
            } catch (error) {
                alert(error.message);
            }
            finally {
                input.value = '';
            }
        }
        else {
            const parentInputContainer = inputContainer.closest('.inputContainer');

            const parent = parentInputContainer.parentElement;

            const parentPrevious = parent.previousElementSibling;

            const textPriority = parentPrevious.textContent;

            list.push({ name, status: "To Do", priority: textPriority }),
                showToDoList();

            const taskElement = createTaskDOMElement(input.value, textPriority);

            inputContainer.after(taskElement);

            input.value = '';
        }
    };
    addTask(input.value);
});

for (const task of tasks.tasks) {
    list.push(task);
    const taskNode = createTaskDOMElement(task.name, task.priority);

    const titles = document.querySelectorAll('.priorityTitle');
    const targetTitle = [...titles].find(h2 => h2.textContent === task.priority);
    targetTitle.nextElementSibling.append(taskNode);
};