const input = document.querySelector('.form-input');
const form = document.querySelector('.form');

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
            const temp = document.querySelector('.temp');
            const tempResult = result.main.temp;
            const tempResultMath = Math.round(tempResult - 273.15);
            if (tempResultMath > 0) {
                temp.textContent = `+${tempResultMath}°`;
            }
            else if (tempResultMath <= 0) {
                temp.textContent = `${tempResultMath}°`;
            }

            const selectCityName = document.querySelector('.select-city');
            selectCityName.textContent = result.name;

            const iconResult = result.weather[0].icon;
            const weatherImg = document.querySelector('.weather-img');
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