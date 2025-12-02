// function calc(operation, a, b) {
//     if (operation === "add") {
//         console.log(a + b)
//     }
//     else if (operation === "subtract") {
//         console.log(a - b)
//     }
//     else if (operation === "multi") {
//         console.log(a * b)
//     }
// }

// calc("add", 17, 14);
// calc("multi", 22, 5);
// calc("subtract", 9, 5);

function calc(operation, a, b) {
    switch (operation) {
        case "add":
            console.log(a + b);
            break;
        case "subtract":
            console.log(a - b);
            break;
        case "multi":
            console.log(a * b);
            break;
        default:
            console.log("Неизвестная операция");
    }
}

calc("add", 17, 14);
calc("multi", 22, 5);
calc("subtract", 9, 5);
calc(" div", 9, 3);