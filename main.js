function Logger() {
    this.start = function () {
        return console.log(this.startTime = new Date());
    };

    let list = [
        'Яблоко', 'Груша', 'Апельсин', 'Банан',
        'Слива', 'Вишня', 'Арбуз', 'Смородина',
        'Клубника', 'Черешня'];

    function showToDoList() {
        for (const task of list) {
            return task;
        }
    };

    showToDoList();

    Object.defineProperty(this, 'result', {
        get: function () {
            return this.endTime - this.startTime;
        }
    });

    this.end = function () {
        return console.log(this.endTime = new Date());
    };
};

const logger = new Logger();

logger.start();

logger.end();

console.log(logger.result);