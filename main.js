import { saveFavoriteCity, loadFavoriteCities } from './storage.js';
import { format } from 'https://esm.sh/date-fns';

const input = document.querySelector('.form-input');
const form = document.querySelector('.form');
const addedLocationList = document.querySelector('.added-location-list');
const choseButton = document.querySelector('.chose-button');

const temp = document.querySelector('.temp');
const selectCityName = document.querySelector('.select-city');
const weatherImg = document.querySelector('.weather-img');

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

function createCookie(cityName) {
    // const date = new Date(Date.now() + 60 * 60 * 1000);
    // let expires = date.toUTCString(); // это если бы я использовал expires

    document.cookie = `currentCity=${cityName}; max-age=3600; path=/`; // здесь вместо max-age нужно было бы указать expires=${expires};
};

const cityCurrent = getCookie('currentCity');

function loadCurrentCitiesCookie(cookie) {
    if (cookie === null) {
        return "";
    }
    else {
        return cookie;
    }
};

loadCurrentCitiesCookie(cityCurrent);

let cityFavorite = new Set(loadFavoriteCities());

function drawLocalFavorite() {
    let setCityFavorite = [...cityFavorite];
    for (let i = 0; i < setCityFavorite.length; i++) {
        const city = setCityFavorite[i];
        const cityName = city[0].toUpperCase() + city.slice(1);

        drawCity(cityName);
    }
};

drawLocalFavorite();

function drawLocalCurrent() {
    if (cityCurrent === undefined)
        return;
    else {
        searchWeather(cityCurrent);
    }
};

drawLocalCurrent();

function showCityList() {
    let setCityFavorite = [...cityFavorite];
    for (let i = 0; i < setCityFavorite.length; i++) {
        console.log(setCityFavorite[i]);
    }
};

function addCity(cityName) {
    let lowerCity = cityName.toLowerCase();
    let lowerCityReplace = lowerCity.replace(/\s/g, '-');

    if (cityName === '') {
        return;
    }
    if (cityFavorite.has(lowerCityReplace)) {
        try {
            throw new Error('Город с таким названием уже в избранном');
        } catch (error) {
            return alert(error.message);
        }
    }
    else {
        cityFavorite.add(lowerCityReplace);
        saveFavoriteCity([...cityFavorite]);

        drawCity(cityName);
        showCityList();
    }
};

function deleteCity(cityName) {
    cityFavorite.delete(cityName);

    let element = document.getElementById(cityName);
    element.remove();

    saveFavoriteCity([...cityFavorite]);
    showCityList();
};

function drawCity(cityName) {
    const newLi = document.createElement('li');
    addedLocationList.prepend(newLi);
    newLi.className = 'added-location-city';
    let lowerCityName = cityName.toLowerCase();
    newLi.id = lowerCityName.replace(/\s/g, '-');

    const newSpan = document.createElement('span');
    const newButton = document.createElement('button');
    newButton.innerHTML = 'X';

    newButton.className = 'delete-btn';

    newLi.prepend(newSpan);
    newLi.appendChild(newButton);

    newSpan.innerHTML = cityName;
};

function drawWeatherInfo(feelsLike, sunrise, sunset) {
    const feelsLikeLi = document.querySelector('.feels-like');
    feelsLikeLi.textContent = `Feels like: ${feelsLike}`;

    const sunriseLi = document.querySelector('.sunrise');
    sunriseLi.textContent = `Sunrise: ${sunrise}`;

    const sunsetLi = document.querySelector('.sunset');
    sunsetLi.textContent = `Sunset: ${sunset}`;
};

function drawWeatherExtra(index, time, temp, feelsLike, img) {
    const extraTime = document.querySelector(`#extra-time-${index}`);
    extraTime.textContent = time;

    const extraTemp = document.querySelector(`#extra-temp-${index}`);
    extraTemp.textContent = `Temperature: ${temp}`;

    const extraFeelsLike = document.querySelector(`#extra-feels-like-${index}`);
    extraFeelsLike.textContent = `Feels like: ${feelsLike}`;

    const extraImg = document.querySelector(`#extra-img-${index}`);
    extraImg.src = `https://openweathermap.org/img/wn/${img}.png`;

    const newHr = document.querySelector(`#hr-${index}`);
    newHr.className = 'hr-class';
};

async function searchWeather(cityName) {
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const serverUrlTime = 'http://api.openweathermap.org/data/2.5/forecast';

    try {
        const res1 = await fetch(`${serverUrl}?q=${cityName}&appid=${apiKey}`);

        if (!res1.ok) {
            throw new Error('Город не найден');
        }
        const result = await res1.json();

        const tempResult = result.main.temp;

        const feelsLike = result.main.feels_like;
        const feelsLikeMath = Math.round(feelsLike - 273.15);

        const sunrise = result.sys.sunrise;
        const sunriceThousen = sunrise * 1000;
        const sunriceTimeResult = format(sunriceThousen, 'HH:mm'); // время рассвета

        const sunset = result.sys.sunset;
        const sunsetThousen = sunset * 1000;
        const sunsetTimeResult = format(sunsetThousen, 'HH:mm');

        const tempResultMath = Math.round(tempResult - 273.15);

        const lon = result.coord.lon;
        const lat = result.coord.lat;

        const res2 = await fetch(`${serverUrlTime}?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const result2 = await res2.json();

        const firstTime = new Date(result2.list[0].dt_txt);
        const firstTimeHour = String(firstTime.getHours());
        const firstTimeHourZero = firstTimeHour.padStart(2, '0');

        const firstTimeMinute = String(firstTime.getMinutes());
        const firstTimeMinuteZero = firstTimeMinute.padStart(2, '0');
        const timeOne = `${firstTimeHourZero}:${firstTimeMinuteZero}`;

        const timeOneResult = result2.list[0].main.temp;
        const tempOne = Math.round(timeOneResult - 273.15);

        const feelsLikeResultOne = result2.list[0].main.feels_like;
        const feelsLikeOne = Math.round(feelsLikeResultOne - 273.15);

        const imgOne = result2.list[0].weather[0].icon;

        const secondTime = new Date(result2.list[1].dt_txt);
        const secondTimeHour = String(secondTime.getHours());
        const secondTimeHourZero = secondTimeHour.padStart(2, '0');

        const secondTimeMinute = String(secondTime.getMinutes());
        const secondTimeMinuteZero = secondTimeMinute.padStart(2, '0');
        const timeTwo = `${secondTimeHourZero}:${secondTimeMinuteZero}`;

        const timeTwoResult = result2.list[1].main.temp;
        const tempTwo = Math.round(timeTwoResult - 273.15);

        const feelsLikeResultTwo = result2.list[1].main.feels_like;
        const feelsLikeTwo = Math.round(feelsLikeResultTwo - 273.15);

        const imgTwo = result2.list[1].weather[0].icon;

        const thirdTime = new Date(result2.list[2].dt_txt);
        const thirdTimeHour = String(thirdTime.getHours());
        const thirdTimeHourZero = thirdTimeHour.padStart(2, '0');

        const thirdTimeMinute = String(thirdTime.getMinutes());
        const thirdTimeMinuteZero = thirdTimeMinute.padStart(2, '0');
        const timeThree = `${thirdTimeHourZero}:${thirdTimeMinuteZero}`;

        const timeThreeResult = result2.list[2].main.temp;
        const tempThree = Math.round(timeThreeResult - 273.15);

        const feelsLikeResultThree = result2.list[2].main.feels_like;
        const feelsLikeThree = Math.round(feelsLikeResultThree - 273.15);

        const imgThree = result2.list[2].weather[0].icon;

        drawWeatherExtra('one', timeOne, tempOne, feelsLikeOne, imgOne);
        drawWeatherExtra('two', timeTwo, tempTwo, feelsLikeTwo, imgTwo);
        drawWeatherExtra('three', timeThree, tempThree, feelsLikeThree, imgThree);

        if (tempResultMath > 0) {
            temp.textContent = `+${tempResultMath}°`;
        }
        else if (tempResultMath <= 0) {
            temp.textContent = `${tempResultMath}°`;
        }

        selectCityName.textContent = result.name;

        const iconResult = result.weather[0].icon;
        weatherImg.src = `https://openweathermap.org/img/wn/${iconResult}@2x.png`;

        drawWeatherInfo(feelsLikeMath, sunriceTimeResult, sunsetTimeResult);

        createCookie(cityName);
    }
    catch (error) {
        alert(error.message);
    }
};

form.addEventListener('submit', function (event) {
    event.preventDefault();

    searchWeather(input.value);
    input.placeholder = input.value;
    input.value = '';
});

addedLocationList.addEventListener('click', function (event) {
    event.preventDefault();

    const deleteBtn = event.target.closest('.delete-btn');
    const span = event.target.closest('span');
    if (deleteBtn) {
        const liName = deleteBtn.parentElement;
        deleteCity(liName.id);
    }
    else if (span) {
        searchWeather(span.innerHTML);
    }
});

choseButton.addEventListener('click', function (event) {
    event.preventDefault();

    const choseButtonTarget = event.target.closest('.chose-button');
    const titleName = choseButtonTarget.previousElementSibling;

    addCity(titleName.innerHTML);
});