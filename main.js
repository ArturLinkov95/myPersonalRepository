const highForm = document.getElementById("highForm");

highForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const newTaskContainer = document.createElement('div');
    newTaskContainer.classList.add('taskContainer');
    highForm.insertAdjacentElement('afterend', newTaskContainer);

    const newTaskText = document.createElement('p');
    newTaskText.classList.add('taskText');
    newTaskContainer.appendChild(newTaskText);
    const input = highForm.querySelector('.input');
    newTaskText.textContent = input.value;

    const newLabel = document.createElement('label');
    newLabel.classList.add('labelRadioBatton');
    newTaskContainer.appendChild(newLabel);

    const newSelectButtonTask = document.createElement('input');
    newSelectButtonTask.classList.add('selectButtonTask');
    newSelectButtonTask.type = 'radio';
    newLabel.appendChild(newSelectButtonTask);

    const newDeleteButtonTask = document.createElement('button');
    newDeleteButtonTask.classList.add('deleteButtonTask');
    newTaskContainer.appendChild(newDeleteButtonTask);
    newDeleteButtonTask.textContent = 'X';

    input.value = '';
});