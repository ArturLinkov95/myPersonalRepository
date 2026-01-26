const buttonResult = document.getElementById('buttonResult');

function calc() {
    const operandOne = Number(document.getElementById('operandOne').value);
    const select = document.getElementById('operation').value;
    const operandTwo = Number(document.getElementById('operandTwo').value);

    const divResult = document.getElementById('divResult');
    const newResult = document.createElement('div');

    if (select === "add") {
        const addResult = operandOne + operandTwo;
        newResult.textContent = addResult;
    }
    else if (select === "subtr") {
        const subtrResult = operandOne - operandTwo;
        newResult.textContent = subtrResult;
    }
    else if (select === "mult") {
        const multResult = operandOne * operandTwo;
        newResult.textContent = multResult;
    }
    else if (select === "division" && operandTwo === 0) {
        newResult.textContent = 'На ноль делить нельзя';
    }
    else if (select === "division") {
        const divisionResult = operandOne / operandTwo;
        newResult.textContent = divisionResult;
    }
    newResult.addEventListener('click', function () {
        newResult.remove();
    });
    divResult.appendChild(newResult);
    newResult.setAttribute('class', 'newResult');
};

buttonResult.addEventListener('click', calc);