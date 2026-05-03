import { addYears, differenceInDays, intervalToDuration } from 'https://esm.sh/date-fns';

import { saveCountdown, loadCountdown } from './storage.js';

const dateButton = document.getElementById('dateButton');
const inputFutureDate = document.getElementById('inputFutureDate');
const spanYears = document.getElementById('spanYears');
const spanDays = document.getElementById('spanDays');
const spanHours = document.getElementById('spanHours');

let savedData = loadCountdown();

function formatYears(years) {
    if (years === undefined) {
        years = 0;
        return `${years} лет `;
    }
    else if (years % 100 >= 11 && years % 100 <= 14
        || years % 10 === 0
        || years % 10 >= 5 && years % 10 <= 9) {
        return `${years} лет `;

    }
    else if (years % 10 === 1) {
        return `${years} год `;
    }
    else if (years % 10 >= 2 && years % 10 <= 4) {
        return `${years} года `;
    }
};

function formatDays(days) {
    if (days % 100 >= 11 && days % 100 <= 14
        || days === 0
        || days % 10 === 0
        || days % 10 >= 5 && days % 10 <= 9) {
        return `${days} дней `;
    }
    else if (days % 10 === 1) {
        return `${days} день `;
    }
    else if (days % 10 >= 2 && days % 10 <= 4) {
        return `${days} дня `;
    }
};

function formatHours(hours) {
    if (hours === undefined) {
        return `0 часов `;
    }
    else if (hours === 1) {
        return `${hours} час `;
    }
    else if (hours >= 2 && hours <= 4) {
        return `${hours} часа `;
    }
    else {
        return `${hours} часов `;
    }
};

function saveData() {
    if (!savedData)
        return;
    else {
        spanYears.innerHTML = formatYears(savedData.years);
        spanDays.innerHTML = formatDays(savedData.days);
        spanHours.innerHTML = formatHours(savedData.hours)
    }
};

saveData();

function countdown(event) {
    event.preventDefault();

    const currentDate = new Date();
    const inputDate = new Date(inputFutureDate.value);

    if (!inputFutureDate.value || isNaN(inputDate) || inputDate <= currentDate) {
        spanYears.innerHTML = 'Введена дата из прошлого или некорректное значение';
        spanDays.innerHTML = '';
        spanHours.innerHTML = '';
        return;
    };

    const duration = intervalToDuration({ start: currentDate, end: inputDate });

    const years = duration.years ?? 0;

    const futureDate = addYears(currentDate, years);

    spanYears.innerHTML = formatYears(years);

    const remainingDays = differenceInDays(inputDate, currentDate);
    const futureMinusInputDays = differenceInDays(inputDate, futureDate);

    let daysNumber;

    if (years === 0) {
        daysNumber = remainingDays;
    }
    else {
        daysNumber = futureMinusInputDays;
    }

    spanDays.innerHTML = formatDays(daysNumber);

    spanHours.innerHTML = formatHours(duration.hours);

    saveCountdown(years, daysNumber, duration.hours);
};

dateButton.addEventListener('click', countdown);