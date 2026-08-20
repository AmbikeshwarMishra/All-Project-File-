const STORAGE_KEY = 'gourmet_favorites';

export function getFavorites() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function toggleFavorite(recipe) {
    let favorites = getFavorites();
    const exists = favorites.some(fav => fav.idMeal === recipe.idMeal);
    
    if (exists) {
        favorites = favorites.filter(fav => fav.idMeal !== recipe.idMeal);
    } else {
        favorites.push({
            idMeal: recipe.idMeal,
            strMeal: recipe.strMeal,
            strMealThumb: recipe.strMealThumb,
            strCategory: recipe.strCategory,
            strArea: recipe.strArea
        });
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    return !exists; // Returns true if added, false if removed
}

export function isFavorite(id) {
    return getFavorites().some(fav => fav.idMeal === id);
}