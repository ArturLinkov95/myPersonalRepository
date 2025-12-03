const continentalPhoneBook = {
    "John Wick": 89649874694,
    "Viggo Tarasov": 89763679877,
    "Marcus": 89748763543,
    "Winston": 89749837495,
    "Charon": 89764563911
};

console.log(continentalPhoneBook);

continentalPhoneBook["Ms. Perkins"] = 89746784554;

console.log(continentalPhoneBook);

continentalPhoneBook["Charon"] = +12345678900;

console.log(continentalPhoneBook);

delete continentalPhoneBook["Viggo Tarasov"];

console.log(continentalPhoneBook);

console.log(continentalPhoneBook.Marcus);

console.log(continentalPhoneBook["Charon"]);

console.log(continentalPhoneBook["John Wick"]);

const phoneBook = {
    "Alex Murphy": 87974763443,
    "Anne Lewis": 89769850965,
    "Clarence Boddicker": 89756849843
}

console.log(phoneBook);

const copyPhoneBook = phoneBook;

copyPhoneBook['Dick Jones'] = 89750985764;

console.log(phoneBook);

console.log(copyPhoneBook);

const phoneBookOfContinental = {
    newYork: {
        "Winston": 89749837495,
        "Charon": 89764563911
    },
    tokyo: {
        "Shimazu": 89758749887,
        "Akira": 89750947854
    }
}

console.log(phoneBookOfContinental);

const copy = structuredClone(phoneBookOfContinental);

console.log(copy);

copy.newYork["John Wick"] = 89649874694;

console.log(phoneBookOfContinental);

console.log(copy);