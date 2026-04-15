const STORAGE_KEYS = {
    FAVORITE_CITIES: 'favoriteCities',
    CURRENT_CITY: 'currentCity'
};

export function saveFavoriteCity(city) {
    localStorage.setItem(STORAGE_KEYS.FAVORITE_CITIES, JSON.stringify(city));
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