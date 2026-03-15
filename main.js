const input = document.querySelector('.form-input');
const form = document.querySelector('.form');
const addedLocationList = document.querySelector('.added-location-list');
const choseButton = document.querySelector('.chose-button');

const temp = document.querySelector('.temp');
const selectCityName = document.querySelector('.select-city');
const weatherImg = document.querySelector('.weather-img');

const city = [];

function showCityList() {
    for (let i = 0; i < city.length; i++) {
        console.log(city[i]);
    }
};

function addCity(cityName) {

    let lowerCity = cityName.toLowerCase();
    let lowerCityReplace = lowerCity.replace(/\s/g, "-");
    const indexCity = city.indexOf(lowerCityReplace);

    if (indexCity != -1) {
        try {
            throw new Error("Город с таким названием уже в избранном");
        } catch (error) {
            alert(error.message);
        }
    }
    else {
        city.push(lowerCityReplace);
        drawCity(cityName);
        showCityList();
    }
}

function deleteCity(cityName) {
    const indexCity = city.indexOf(cityName);
    if (indexCity != -1) {
        city.splice(indexCity, 1);

        let element = document.getElementById(cityName);
        element.remove();

        showCityList();
    }
};

function drawCity(cityName) {
    const newLi = document.createElement('li');
    addedLocationList.prepend(newLi);
    newLi.className = 'added-location-city';
    let lowerCityName = cityName.toLowerCase();
    newLi.id = lowerCityName.replace(/\s/g, "-");

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

function searchWeather(cityName) {
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;

    const serverUrlTime = 'http://api.openweathermap.org/data/2.5/forecast';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Город не найден');
            }
            return response.json();
        })
        .then(result => {
            const tempResult = result.main.temp;

            const feelsLike = result.main.feels_like;
            const feelsLikeMath = Math.round(feelsLike - 273.15);

            const sunrise = result.sys.sunrise;
            const sunriseDate = new Date(sunrise);
            const sunriseDateHour = sunriseDate.getHours() - 9;
            const sunriseDateMinutes = sunriseDate.getMinutes() + 15;
            const sunriceTime = `0${sunriseDateHour}:${sunriseDateMinutes}`;

            const sunset = result.sys.sunset;
            const sunsetDate = new Date(sunset);
            const sunsetDateHour = sunsetDate.getHours() + 3;
            const sunsetDateMinutes = sunsetDate.getMinutes() - 20;
            const sunsetTime = `${sunsetDateHour}:${sunsetDateMinutes}`;

            const tempResultMath = Math.round(tempResult - 273.15);

            const lon = result.coord.lon;
            const lat = result.coord.lat;

            fetch(`${serverUrlTime}?lat=${lat}&lon=${lon}&appid=${apiKey}`)
                .then(response => {
                    return response.json();
                })
                .then(result => {
                    const firstTime = new Date(result.list[0].dt_txt);
                    const firstTimeHour = String(firstTime.getHours());
                    const firstTimeHourZero = firstTimeHour.padStart(2, "0");

                    const firstTimeMinute = String(firstTime.getMinutes());
                    const firstTimeMinuteZero = firstTimeMinute.padStart(2, "0");
                    const timeOne = `${firstTimeHourZero}:${firstTimeMinuteZero}`;

                    const timeOneResult = result.list[0].main.temp;
                    const tempOne = Math.round(timeOneResult - 273.15);

                    const feelsLikeResultOne = result.list[0].main.feels_like;
                    const feelsLikeOne = Math.round(feelsLikeResultOne - 273.15);

                    const imgOne = result.list[0].weather[0].icon;


                    const secondTime = new Date(result.list[1].dt_txt);
                    const secondTimeHour = String(secondTime.getHours());
                    const secondTimeHourZero = secondTimeHour.padStart(2, "0");

                    const secondTimeMinute = String(secondTime.getMinutes());
                    const secondTimeMinuteZero = secondTimeMinute.padStart(2, "0");
                    const timeTwo = `${secondTimeHourZero}:${secondTimeMinuteZero}`;

                    const timeTwoResult = result.list[1].main.temp;
                    const tempTwo = Math.round(timeTwoResult - 273.15);

                    const feelsLikeResultTwo = result.list[1].main.feels_like;
                    const feelsLikeTwo = Math.round(feelsLikeResultTwo - 273.15);

                    const imgTwo = result.list[1].weather[0].icon;


                    const thirdTime = new Date(result.list[2].dt_txt);
                    const thirdTimeHour = String(thirdTime.getHours());
                    const thirdTimeHourZero = thirdTimeHour.padStart(2, "0");

                    const thirdTimeMinute = String(thirdTime.getMinutes());
                    const thirdTimeMinuteZero = thirdTimeMinute.padStart(2, "0");
                    const timeThree = `${thirdTimeHourZero}:${thirdTimeMinuteZero}`;

                    const timeThreeResult = result.list[2].main.temp;
                    const tempThree = Math.round(timeThreeResult - 273.15);

                    const feelsLikeResultThree = result.list[2].main.feels_like;
                    const feelsLikeThree = Math.round(feelsLikeResultThree - 273.15);

                    const imgThree = result.list[2].weather[0].icon;

                    drawWeatherExtra('one', timeOne, tempOne, feelsLikeOne, imgOne);
                    drawWeatherExtra('two', timeTwo, tempTwo, feelsLikeTwo, imgTwo);
                    drawWeatherExtra('three', timeThree, tempThree, feelsLikeThree, imgThree);
                })

            if (tempResultMath > 0) {
                temp.textContent = `+${tempResultMath}°`;
            }
            else if (tempResultMath <= 0) {
                temp.textContent = `${tempResultMath}°`;
            }

            selectCityName.textContent = result.name;

            const iconResult = result.weather[0].icon;
            weatherImg.src = `https://openweathermap.org/img/wn/${iconResult}@2x.png`;

            drawWeatherInfo(feelsLikeMath, sunriceTime, sunsetTime);
        })
        .catch(error => alert(error.message));
};

form.addEventListener('submit', function (event) {
    event.preventDefault();

    searchWeather(input.value);
    input.placeholder = input.value;
    input.value = "";
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