// function countdown(sec) {
//     function timer() {
//         if (sec <= 0) {
//             return;
//         }
//         console.log(`Осталось секунд: ${sec}`);
//         sec--;
//     }

//     let timeId = setInterval(hello, 1000);

//     setTimeout(() => {
//         clearInterval(timeId);
//         console.log('Время вышло');
//     }, sec * 1000);

//     timer();
// }

// countdown(0);

function countdown(sec) {
    if (sec === 0) {
        console.log('Время вышло');
    }
    if (sec >= 1) {
        console.log(`Осталось секунд: ${sec}`);
        sec--;
        setTimeout(() => countdown(sec), 1000); // уточнить касательно этого момента
    }
};

countdown(5);