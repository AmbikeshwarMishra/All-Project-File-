import { api } from './api.js';
import { store } from './store.js';

const app = document.getElementById('app');
let allProducts = []; // Cache for search/sort

// --- UTILITIES ---
const showToast = (msg) => {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
};

const updateNavCounts = () => {
    document.getElementById('cart-count').innerText = store.getCart().reduce((acc, item) => acc + item.qty, 0);
    document.getElementById('wishlist-count').innerText = store.getWishlist().length;
    const user = store.getCurrentUser();
    document.getElementById('nav-profile').innerText = user ? 'Dashboard' : 'Login';
};

// --- ROUTER ---
const router = async () => {
    const hash = window.location.hash || '#home';
    app.innerHTML = '<div class="loader"></div>'; // Loading indicator
    updateNavCounts();

    try {
        if (hash === '#home') await renderHome();
        else if (hash === '#cart') renderCart();
        else if (hash === '#wishlist') renderWishlist();
        else if (hash === '#checkout') renderCheckout();
        else if (hash === '#dashboard' || hash === '#login' || hash === '#register') renderAuthFlow(hash);
        else app.innerHTML = '<h2>404 - Page Not Found</h2>';
    } catch (err) {
        app.innerHTML = `<div style="color: red; text-align: center; margin-top: 2rem;">
            <h2>Error Loading Page</h2><p>${err.message}</p>
        </div>`;
    }
};

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);

// --- HOME & PRODUCTS ---
async function renderHome() {
    if (allProducts.length === 0) {
        allProducts = await api.getProducts();
    }
    const categories = await api.getCategories();

    app.innerHTML = `
        <div class="controls">
            <input type="text" id="searchInput" placeholder="Search products...">
            <select id="categorySelect">
                <option value="all">All Categories</option>
                ${categories.map(c => `<option value="${c}">${c}</option>`).join('')}
            </select>
            <select id="sortSelect">
                <option value="default">Sort By</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
            </select>
        </div>
        <div class="product-grid" id="productGrid"></div>
    `;

    const renderGrid = (products) => {
        const grid = document.getElementById('productGrid');
        if (products.length === 0) return grid.innerHTML = '<p>No products found.</p>';
        
        grid.innerHTML = products.map(p => `
            <div class="card">
                <img src="${p.image}" alt="${p.title}">
                <h3>${p.title}</h3>
                <p class="price">$${p.price.toFixed(2)}</p>
                <p>⭐ ${p.rating.rate} (${p.rating.count})</p>
                <div class="card-actions">
                    <button onclick="window.addToCart(${p.id})">Add to Cart</button>
                    <button class="${store.getWishlist().includes(p.id) ? 'danger' : ''}" onclick="window.toggleWishlist(${p.id})">♥</button>
                </div>
            </div>
        `).join('');
    };

    const applyFilters = () => {
        let filtered = [...allProducts];
        const search = document.getElementById('searchInput').value.toLowerCase();
        const category = document.getElementById('categorySelect').value;
        const sort = document.getElementById('sortSelect').value;

        if (search) filtered = filtered.filter(p => p.title.toLowerCase().includes(search));
        if (category !== 'all') filtered = filtered.filter(p => p.category === category);
        
        if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
        if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
        if (sort === 'rating') filtered.sort((a, b) => b.rating.rate - a.rating.rate);

        renderGrid(filtered);
    };

    document.getElementById('searchInput').addEventListener('input', applyFilters);
    document.getElementById('categorySelect').addEventListener('change', applyFilters);
    document.getElementById('sortSelect').addEventListener('change', applyFilters);
    
    renderGrid(allProducts);
}

// --- CART LOGIC ---
window.addToCart = (id) => {
    const product = allProducts.find(p => p.id === id);
    const cart = store.getCart();
    const existing = cart.find(item => item.id === id);
    
    if (existing) existing.qty += 1;
    else cart.push({ ...product, qty: 1 });
    
    store.saveCart(cart);
    updateNavCounts();
    showToast('Added to cart!');
};

window.updateQty = (id, delta) => {
    let cart = store.getCart();
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
    store.saveCart(cart);
    renderCart();
    updateNavCounts();
};

window.clearCart = () => { store.saveCart([]); renderCart(); updateNavCounts(); };

function renderCart() {
    const cart = store.getCart();
    if (cart.length === 0) {
        app.innerHTML = '<h2>Your Cart</h2><p>Cart is empty. <a href="#home">Go shopping</a></p>';
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const tax = subtotal * 0.10; // 10% tax
    const total = subtotal + tax;

    app.innerHTML = `
        <h2>Shopping Cart</h2>
        <table>
            <thead><tr><th>Product</th><th>Price</th><th>Qty</th><th>Total</th><th>Actions</th></tr></thead>
            <tbody>
                ${cart.map(item => `
                    <tr>
                        <td data-label="Product">${item.title.substring(0, 30)}...</td>
                        <td data-label="Price">$${item.price.toFixed(2)}</td>
                        <td data-label="Qty">
                            <button onclick="window.updateQty(${item.id}, -1)">-</button>
                            <span style="margin: 0 10px">${item.qty}</span>
                            <button onclick="window.updateQty(${item.id}, 1)">+</button>
                        </td>
                        <td data-label="Total">$${(item.price * item.qty).toFixed(2)}</td>
                        <td data-label="Actions"><button class="danger" onclick="window.updateQty(${item.id}, -999)">Remove</button></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <div class="cart-summary">
            <p>Subtotal: $${subtotal.toFixed(2)}</p>
            <p>Tax (10%): $${tax.toFixed(2)}</p>
            <h3>Total: $${total.toFixed(2)}</h3>
            <br>
            <button class="danger" onclick="window.clearCart()">Clear Cart</button>
            <button onclick="window.location.hash='#checkout'">Proceed to Checkout</button>
        </div>
    `;
}

// --- WISHLIST LOGIC ---
window.toggleWishlist = (id) => {
    let wishlist = store.getWishlist();
    if (wishlist.includes(id)) wishlist = wishlist.filter(itemId => itemId !== id);
    else wishlist.push(id);
    store.saveWishlist(wishlist);
    updateNavCounts();
    if (window.location.hash === '#home') renderHome();
    if (window.location.hash === '#wishlist') renderWishlist();
};

function renderWishlist() {
    const wishlistIds = store.getWishlist();
    if (wishlistIds.length === 0) return app.innerHTML = '<h2>Wishlist</h2><p>Your wishlist is empty.</p>';
    
    const wishlistProducts = allProducts.filter(p => wishlistIds.includes(p.id));
    app.innerHTML = `<h2>Your Wishlist</h2><div class="product-grid">
        ${wishlistProducts.map(p => `
            <div class="card">
                <img src="${p.image}">
                <h3>${p.title}</h3>
                <p class="price">$${p.price.toFixed(2)}</p>
                <div class="card-actions">
                    <button onclick="window.addToCart(${p.id})">Add to Cart</button>
                    <button class="danger" onclick="window.toggleWishlist(${p.id})">Remove</button>
                </div>
            </div>
        `).join('')}
    </div>`;
}

// --- CHECKOUT ---
function renderCheckout() {
    const user = store.getCurrentUser();
    if (!user) {
        showToast('Please login to checkout');
        window.location.hash = '#login';
        return;
    }
    const cart = store.getCart();
    if (cart.length === 0) return window.location.hash = '#home';

    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0) * 1.10;

    app.innerHTML = `
        <form id="checkoutForm" class="checkout-form">
            <h2>Checkout</h2>
            <p style="margin-bottom: 1rem">Total Amount: <strong>$${total.toFixed(2)}</strong></p>
            <input type="text" placeholder="Full Name" required>
            <input type="text" placeholder="Shipping Address" required>
            <input type="text" placeholder="Credit Card (Mock)" required>
            <button type="submit" style="width: 100%">Place Order</button>
        </form>
    `;

    document.getElementById('checkoutForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const order = {
            id: 'ORD-' + Math.floor(Math.random() * 1000000),
            date: new Date().toLocaleDateString(),
            items: cart,
            total: total,
            userEmail: user.email
        };
        store.saveOrder(order);
        store.saveCart([]);
        showToast(`Order ${order.id} placed successfully!`);
        window.location.hash = '#dashboard';
    });
}

// --- AUTH & DASHBOARD ---
function renderAuthFlow(hash) {
    const user = store.getCurrentUser();
    
    if (hash === '#dashboard') {
        if (!user) return window.location.hash = '#login';
        
        const userOrders = store.getOrders().filter(o => o.userEmail === user.email);
        const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0);

        app.innerHTML = `
            <h2>My Dashboard</h2>
            <div class="dashboard-grid">
                <div class="profile-card">
                    <h3>Profile</h3>
                    <p>Email: ${user.email}</p>
                    <p>Total Orders: ${userOrders.length}</p>
                    <p>Total Spent: $${totalSpent.toFixed(2)}</p>
                    <button class="danger" style="margin-top: 1rem" onclick="window.logout()">Logout</button>
                </div>
                <div>
                    <h3>Order History</h3>
                    ${userOrders.length === 0 ? '<p>No orders yet.</p>' : userOrders.map(o => `
                        <div class="card" style="margin-bottom: 1rem; text-align: left;">
                            <strong>Order ID:</strong> ${o.id} <br>
                            <strong>Date:</strong> ${o.date} <br>
                            <strong>Total:</strong> $${o.total.toFixed(2)}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } else {
        if (user) return window.location.hash = '#dashboard';
        const isLogin = hash === '#login';
        app.innerHTML = `
            <form id="authForm" class="auth-form">
                <h2>${isLogin ? 'Login' : 'Register'}</h2>
                <input type="email" id="email" placeholder="Email" required>
                <input type="password" id="password" placeholder="Password" required>
                <button type="submit" style="width: 100%">${isLogin ? 'Login' : 'Register'}</button>
                <p style="margin-top: 1rem; text-align: center">
                    ${isLogin ? 'Need an account? <a href="#register">Register</a>' : 'Have an account? <a href="#login">Login</a>'}
                </p>
            </form>
        `;

        document.getElementById('authForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (isLogin) {
                const users = store.getUsers();
                const found = users.find(u => u.email === email && u.password === password);
                if (found) {
                    store.setCurrentUser(found);
                    showToast('Logged in successfully!');
                    window.location.hash = '#dashboard';
                } else {
                    showToast('Invalid credentials!');
                }
            } else {
                store.saveUser({ email, password });
                store.setCurrentUser({ email });
                showToast('Registered successfully!');
                window.location.hash = '#dashboard';
            }
        });
    }
}

window.logout = () => {
    store.logout();
    updateNavCounts();
    window.location.hash = '#login';
    showToast('Logged out');
};