export const store = {
    // Auth Storage
    getUsers: () => JSON.parse(localStorage.getItem('users')) || [],
    saveUser: (user) => {
        const users = store.getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    },
    getCurrentUser: () => JSON.parse(localStorage.getItem('currentUser')),
    setCurrentUser: (user) => localStorage.setItem('currentUser', JSON.stringify(user)),
    logout: () => localStorage.removeItem('currentUser'),

    // Cart Storage
    getCart: () => JSON.parse(localStorage.getItem('cart')) || [],
    saveCart: (cart) => localStorage.setItem('cart', JSON.stringify(cart)),
    
    // Wishlist Storage
    getWishlist: () => JSON.parse(localStorage.getItem('wishlist')) || [],
    saveWishlist: (wishlist) => localStorage.setItem('wishlist', JSON.stringify(wishlist)),

    // Orders Storage
    getOrders: () => JSON.parse(localStorage.getItem('orders')) || [],
    saveOrder: (order) => {
        const orders = store.getOrders();
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
    }
};