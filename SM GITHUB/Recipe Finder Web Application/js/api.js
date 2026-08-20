const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function fetchFromAPI(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data.meals;
    } catch (error) {
        console.error("API Fetch Error:", error);
        return null;
    }
}

export async function getRandomRecipe() { return await fetchFromAPI('random.php'); }
export async function searchRecipesByName(name) { return await fetchFromAPI(`search.php?s=${name}`); }
export async function getRecipeDetails(id) { return await fetchFromAPI(`lookup.php?i=${id}`); }
export async function getCategories() { return await fetchFromAPI('list.php?c=list'); }
export async function getAreas() { return await fetchFromAPI('list.php?a=list'); }
export async function filterByCategory(cat) { return await fetchFromAPI(`filter.php?c=${cat}`); }
export async function filterByArea(area) { return await fetchFromAPI(`filter.php?a=${area}`); }