const STORAGE_KEYS = {
    FAVORITE_CITIES: 'favoriteCities',
    CURRENT_CITY: 'currentCity'
};

export function saveCurrentCity(city) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_CITY, JSON.stringify(city));
};

export function saveFavoriteCity(city) {
    localStorage.setItem(STORAGE_KEYS.FAVORITE_CITIES, JSON.stringify(city));
};

export function loadCurrentCities() {
    let currentLocalCity = localStorage.getItem(STORAGE_KEYS.CURRENT_CITY);
    if (currentLocalCity === null) {
        return "";
    }
    else {
        let localCity = JSON.parse(currentLocalCity);
        return localCity;
    }
};

export function loadFavoriteCities() {
    let favoriteLocalCity = localStorage.getItem(STORAGE_KEYS.FAVORITE_CITIES);
    if (favoriteLocalCity === null) {
        return [];
    }
    else {
        let favoriteCity = JSON.parse(favoriteLocalCity);
        return favoriteCity;
    }
};