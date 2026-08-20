import { isFavorite } from './storage.js';

export function renderRecipeGrid(container, recipes, onDetailsClick, onFavClick) {
    container.innerHTML = '';
    
    if (!recipes || recipes.length === 0) {
        container.innerHTML = `<div class="no-results">No recipes found. Try another search!</div>`;
        return;
    }

    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.dataset.id = recipe.idMeal;
        
        const favStatus = isFavorite(recipe.idMeal) ? '❤️' : '🤍';

        card.innerHTML = `
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="card-img">
            <div class="card-info">
                <h3>${recipe.strMeal}</h3>
                <p><span>${recipe.strCategory || ''}</span> <span>${recipe.strArea || ''}</span></p>
                <div class="card-actions">
                    <button class="btn-view-details">View Recipe</button>
                    <button class="btn-fav" data-id="${recipe.idMeal}">${favStatus}</button>
                </div>
            </div>
        `;

        // Card navigation click
        card.querySelector('.btn-view-details').addEventListener('click', () => onDetailsClick(recipe.idMeal));
        
        // Favorite toggle click
        card.querySelector('.btn-fav').addEventListener('click', (e) => {
            e.stopPropagation();
            onFavClick(recipe, e.target);
        });

        container.appendChild(card);
    });
}

export function renderModalContent(container, recipe) {
    // Collect ingredients & measurements dynamically from API payload keys
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (recipe[`strIngredient${i}`]) {
            ingredients.push(`${recipe[`strMeasure${i}`]} ${recipe[`strIngredient${i}`]}`);
        }
    }

    container.innerHTML = `
        <div class="modal-header">
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            <h2>${recipe.strMeal}</h2>
            <p><strong>Category:</strong> ${recipe.strCategory} | <strong>Cuisine:</strong> ${recipe.strArea}</p>
        </div>
        <div class="modal-body-layout">
            <div class="ingredients-box">
                <h3>Ingredients</h3>
                <ul>${ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
            </div>
            <div class="instructions-box">
                <h3>Instructions</h3>
                <p>${recipe.strInstructions.replace(/\r\n|\r|\n/g, '<br><br>')}</p>
                ${recipe.strYoutube ? `<a href="${recipe.strYoutube}" target="_blank" class="youtube-btn">📺 Watch on YouTube</a>` : ''}
            </div>
        </div>
    `;
}

export function populateDropdown(dropdown, items, key) {
    items.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item[key];
        opt.textContent = item[key];
        dropdown.appendChild(opt);
    });
}