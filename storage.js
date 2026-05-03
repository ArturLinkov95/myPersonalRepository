const DATE_COUNTDOWN = {
    YEARS: 'years',
    DAYS: 'days',
    HOURS: 'hours'
};

export function saveCountdown(years, days, hours) {
    localStorage.setItem(DATE_COUNTDOWN.YEARS, JSON.stringify(years));
    localStorage.setItem(DATE_COUNTDOWN.DAYS, JSON.stringify(days));
    localStorage.setItem(DATE_COUNTDOWN.HOURS, JSON.stringify(hours));
};

export function loadCountdown() {
    let years = localStorage.getItem(DATE_COUNTDOWN.YEARS);
    let days = localStorage.getItem(DATE_COUNTDOWN.DAYS);
    let hours = localStorage.getItem(DATE_COUNTDOWN.HOURS);
    if (years === null && days === null && hours === null) {
        return "";
    }
    return {
        years: JSON.parse(years),
        days: JSON.parse(days),
        hours: JSON.parse(hours)
    };
};