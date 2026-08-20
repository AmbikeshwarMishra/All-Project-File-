const BASE_URL = 'https://fakestoreapi.com';

export const api = {
    async getProducts() {
        try {
            const response = await fetch(`${BASE_URL}/products`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    },
    
    async getCategories() {
        try {
            const response = await fetch(`${BASE_URL}/products/categories`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw error;
        }
    }
};