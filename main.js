const phoneBookOfContinental = {
    newYork: {
        "John Wick": 89649874694,
        "Viggo Tarasov": 89763679877,
        "Marcus": 89748763543,
        "Winston": 89749837495,
        "Charon": 89764563911
    },
    tokyo: {
        "Shimazu": 89758749887,
        "Akira": 89750947854
    },
    addInNewYork(name, number) {
        this.newYork[name] = number;
    },
    addInTokyo(name, number) {
        this.tokyo[name] = number;
    },
    deleteInNewYork(name) {
        delete this.newYork[name];
    },
    deleteTokyo(name) {
        delete this.newYork[name];
    }
};

phoneBookOfContinental.addInNewYork("Ms. Perkins", 89648749834);

console.log(phoneBookOfContinental.newYork['Ms. Perkins']);

phoneBookOfContinental.deleteInNewYork("Marcus");

console.log(phoneBookOfContinental.newYork);

phoneBookOfContinental.addInTokyo("Nobody", 89487649837);

console.log(phoneBookOfContinental.tokyo);

console.log("Akira" in phoneBookOfContinental.tokyo);

console.log("Akira" in phoneBookOfContinental.newYork);

for (const name in phoneBookOfContinental.newYork) {
    console.log(name, "-", phoneBookOfContinental.newYork[name]);
};

console.log(" ");


for (const name in phoneBookOfContinental.tokyo) {
    console.log(name, "-", phoneBookOfContinental.tokyo[name]);
};