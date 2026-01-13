function createCounter() {
    let count = 0;
    
    function createCounterB() {
        count++;
        return count;
    }
    return createCounterB;
}

let counterA = createCounter();
let counterB = createCounter();

console.log(counterA()); // 1
console.log(counterA()); // 2
console.log(counterA()); // 3

console.log(counterB()); // 1