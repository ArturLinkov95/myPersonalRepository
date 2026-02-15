const form = document.getElementById("wrapperToDo");

let list = [];

function showToDoList() {
    for (const task of list) {
        console.log(task);
    }
};

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const input = event.target.querySelector('.input');

    const inputContainer = event.target.closest('.inputContainer');

    function addTask(name) {

        let indexTast = list.findIndex(item => item.name === name);
        const canAdd = indexTast === -1;
        if (canAdd) {
            const newTaskContainer = document.createElement('div');
            newTaskContainer.classList.add('taskContainer');
            inputContainer.insertAdjacentElement('afterend', newTaskContainer);

            const newTaskText = document.createElement('p');
            newTaskText.classList.add('taskText');
            newTaskContainer.appendChild(newTaskText);
            newTaskText.textContent = input.value;

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

            const parentInputContainer = inputContainer.closest('.inputContainer');

            const parent = parentInputContainer.parentElement;

            const parentPrevious = parent.previousElementSibling;

            const textPriority = parentPrevious.textContent;

            list.push({ name, status: "To Do", priority: textPriority }),
                showToDoList();

            newDeleteButtonTask.addEventListener('click', function (event) {
                event.preventDefault();

                function removeTask(name) {
                    const toDoListIndex = list.findIndex(item => item.name === name);
                    list.splice(toDoListIndex, 1);
                    showToDoList();
                };

                removeTask(newTaskText.textContent);
                newTaskContainer.remove();
            });

            newSelectButtonTask.addEventListener('click', function (event) {
                event.preventDefault();

                function changeStatus(name, priority) {
                    const toDoListIndex = list.findIndex(item => item.name === name);
                    if (toDoListIndex !== -1 && list[toDoListIndex].status === "To Do") {
                        name, list[toDoListIndex].status = "Done", list[toDoListIndex].priority = priority;
                        newTaskText.style.backgroundColor = '#eee4e4';
                        newSelectButtonTask.style.backgroundColor = 'rgb(179, 171, 169)';
                        showToDoList();
                    }
                    else {
                        list[toDoListIndex].status = "To Do";
                        newTaskText.style.backgroundColor = 'white';
                        newSelectButtonTask.style.backgroundColor = 'white';
                        showToDoList();
                    }
                }
                changeStatus(newTaskText.textContent, textPriority)
            });

            input.value = '';
        }
        else {
            alert("Задача не добавлена: Задача с таким имемем уже существует");
            input.value = '';
        }
    };

    addTask(input.value);

});