// Local Storage Keys
const USERS_KEY = 'netflix_pro_users';
const SESSION_KEY = 'netflix_pro_session';

// Initialize DB if empty
if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([]));
}

function registerUser(email, password) {
    let users = JSON.parse(localStorage.getItem(USERS_KEY));
    if (users.find(u => u.email === email)) {
        alert("Account already exists! Please login.");
        window.location.href = "login.html";
        return false;
    }
    users.push({ email, password });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    const session = { email, password, plan: 'Standard', paid: false };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return true;
}

function loginUser(email, password) {
    let users = JSON.parse(localStorage.getItem(USERS_KEY));
    let user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(user));
        window.location.href = "browse.html";
    } else {
        alert("Invalid Email or Password. Please try again.");
    }
}

function logoutUser() {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = "index.html";
}

// Protect Routes (Redirect logic)
function checkAuth() {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    const currentPage = window.location.pathname.split('/').pop();

    if (session && (currentPage === 'index.html' || currentPage === 'login.html' || currentPage === '' || currentPage === 'signup.html')) {
        window.location.href = 'browse.html';
    } else if (!session && (currentPage === 'browse.html' || currentPage === 'plan.html' || currentPage === 'payment.html')) {
        window.location.href = 'index.html';
    }
}

// Run check on every page load
checkAuth();