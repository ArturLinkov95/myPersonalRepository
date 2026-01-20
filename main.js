const startPause = document.getElementById('startPause');
const stopButton = document.getElementById('stop');

const timer = document.getElementById('timer');

function timerFunc() {
    let zero = Number(timer.textContent);
    zero++;
    return timer.textContent = zero;
};

let IntervalId = null;

function setIntervals() {
    if (IntervalId === null)
        IntervalId = setInterval(timerFunc, 1000);
    else {
        clearInterval(IntervalId);
        IntervalId = null;
    }
};

function zero() {
    clearInterval(IntervalId);
    IntervalId = null;
    timer.textContent = 0;
}

startPause.addEventListener('click', setIntervals);

stopButton.addEventListener('click', zero);