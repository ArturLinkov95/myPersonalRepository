let input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -11, -12, -13, -14, -15];

function countdown(seconds) { // функция обратного отсчета 
  let timeLeft = Number(seconds);

  let timeOver = "Время вышло";

  let interval = setInterval(function () {

    if (timeLeft === 0) {
      console.log(timeOver);
      clearInterval(interval);
    } else {
      debugger; // дебаггер остановит скрипт в этом месте
      console.log(`Осталось: ${timeLeft}`);
    }

    timeLeft--;
  }, 1000);
};

countdown(5);