import * as API from './api.js';
import * as Storage from './storage.js';
import * as UI from './ui.js';

// DOM Elements
const recipeGrid = document.getElementById('recipe-grid');
const sectionTitle = document.getElementById('section-title');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const catFilter = document.getElementById('filter-category');
const areaFilter = document.getElementById('filter-area');
const recipeModal = document.getElementById('recipe-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');

// State tracking variables
let currentView = 'home'; // 'home' or 'favorites'

// Initial Load Strategy
async function init() {
    setupEventHandlers();
    
    // Load default landing content (using "chicken" as default home recipes search array)
    const initialMeals = await API.searchRecipesByName('chicken');
    UI.renderRecipeGrid(recipeGrid, initialMeals, openDetailedModal, handleFavoriteToggle);
    
    // Load dynamic controls dropdown options
    const classes = await API.getCategories();
    if(classes) UI.populateDropdown(catFilter, classes, 'strCategory');
    
    const areas = await API.getAreas();
    if(areas) UI.populateDropdown(areaFilter, areas, 'strArea');
}

// Global Event Handler Bindings
function setupEventHandlers() {
    searchBtn.addEventListener('click', executeSearch);
    searchInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') executeSearch(); });
    
    document.getElementById('btn-surprise').addEventListener('click', showRandomRecipe);
    document.getElementById('nav-home').addEventListener('click', switchToHomeView);
    document.getElementById('nav-favorites').addEventListener('click', switchToFavoritesView);
    
    catFilter.addEventListener('change', async (e) => {
        if (!e.target.value) return;
        areaFilter.value = ''; // Reset sibling context filter
        const filtered = await API.filterByCategory(e.target.value);
        UI.renderRecipeGrid(recipeGrid, filtered, openDetailedModal, handleFavoriteToggle);
    });

    areaFilter.addEventListener('change', async (e) => {
        if (!e.target.value) return;
        catFilter.value = ''; // Reset sibling context filter
        const filtered = await API.filterByArea(e.target.value);
        UI.renderRecipeGrid(recipeGrid, filtered, openDetailedModal, handleFavoriteToggle);
    });

    closeModal.addEventListener('click', () => recipeModal.classList.add('hidden'));
    window.addEventListener('click', (e) => { if (e.target === recipeModal) recipeModal.classList.add('hidden'); });
}

// Action Operations Definitions
async function executeSearch() {
    const query = searchInput.value.trim();
    if (!query) return;
    sectionTitle.textContent = `Search Results for "${query}"`;
    const results = await API.searchRecipesByName(query);
    UI.renderRecipeGrid(recipeGrid, results, openDetailedModal, handleFavoriteToggle);
}

async function showRandomRecipe() {
    const randomArray = await API.getRandomRecipe();
    if(randomArray && randomArray.length > 0) {
        openDetailedModal(randomArray[0].idMeal);
    }
}

async function openDetailedModal(id) {
    const details = await API.getRecipeDetails(id);
    if(details && details.length > 0) {
        UI.renderModalContent(modalBody, details[0]);
        recipeModal.classList.remove('hidden');
    }
}

function handleFavoriteToggle(recipe, buttonElement) {
    const isAdded = Storage.toggleFavorite(recipe);
    buttonElement.textContent = isAdded ? '❤️' : '🤍';
    
    // If user is currently looking at Favorites tab page layout view mode context:
    if (currentView === 'favorites') {
        switchToFavoritesView();
    }
}

async function switchToHomeView() {
    currentView = 'home';
    document.getElementById('nav-home').classList.add('active');
    document.getElementById('nav-favorites').classList.remove('active');
    sectionTitle.textContent = "Latest Discoveries";
    const initialMeals = await API.searchRecipesByName('chicken');
    UI.renderRecipeGrid(recipeGrid, initialMeals, openDetailedModal, handleFavoriteToggle);
}

function switchToFavoritesView() {
    currentView = 'favorites';
    document.getElementById('nav-favorites').classList.add('active');
    document.getElementById('nav-home').classList.remove('active');
    sectionTitle.textContent = "Your Favorite Kitchen Recipes";
    const favs = Storage.getFavorites();
    UI.renderRecipeGrid(recipeGrid, favs, openDetailedModal, handleFavoriteToggle);
}

// Kickstart script environment execution
init();