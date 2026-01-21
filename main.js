const buttonResult = document.getElementById('buttonResult');

let result = document.getElementById('result');

function calc() {
    const operandOne = Number(document.getElementById('operandOne').value);
    const select = document.getElementById('operation').value;
    const operandTwo = Number(document.getElementById('operandTwo').value);
    if (select === "add") {
        const addResult = operandOne + operandTwo;
        result.textContent = addResult;
    }
    else if (select === "subtr") {
        const subtrResult = operandOne - operandTwo;
        result.textContent = subtrResult;
    }
    else if (select === "mult") {
        const multResult = operandOne * operandTwo;
        result.textContent = multResult;
    }
    else if (select === "division" && operandTwo === 0) {
        result.textContent = 'На ноль делить нельзя';
    }
    else if (select === "division") {
        const divisionResult = operandOne / operandTwo;
        result.textContent = divisionResult;
    }
};

buttonResult.addEventListener('click', calc);