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

function searchWeather(cityName) {
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Город не найден');
            }
            return response.json();
        })
        .then(result => {
            const tempResult = result.main.temp;
            const tempResultMath = Math.round(tempResult - 273.15);
            if (tempResultMath > 0) {
                temp.textContent = `+${tempResultMath}°`;
            }
            else if (tempResultMath <= 0) {
                temp.textContent = `${tempResultMath}°`;
            }

            selectCityName.textContent = result.name;

            const iconResult = result.weather[0].icon;
            weatherImg.src = `https://openweathermap.org/img/wn/${iconResult}@2x.png`;
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