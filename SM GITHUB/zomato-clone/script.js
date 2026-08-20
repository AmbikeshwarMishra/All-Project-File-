const restaurants = [
  {
    id: 1,
    name: 'Biryani House',
    cuisine: 'Biryani • North Indian',
    dish: 'Hyderabadi Dum Biryani',
    intent: 'Lunch',
    rating: '4.7',
    eta: '25 mins',
    fee: 'Free delivery',
    price: '₹280',
    area: 'Whitefield',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: 'Pizza Paradise',
    cuisine: 'Pizza • Italian',
    dish: 'Truffle Mushroom Pizza',
    intent: 'Dinner',
    rating: '4.8',
    eta: '20 mins',
    fee: '₹40 delivery',
    price: '₹320',
    area: 'Indiranagar',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    name: 'Burger Street',
    cuisine: 'Burgers • Fast Food',
    dish: 'Crispy Chicken Burger',
    intent: 'Snack',
    rating: '4.5',
    eta: '15 mins',
    fee: 'Free delivery',
    price: '₹180',
    area: 'Koramangala',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    name: 'Fresh Bowl Co.',
    cuisine: 'Healthy • Salads',
    dish: 'Mediterranean Bowl',
    intent: 'Healthy',
    rating: '4.6',
    eta: '18 mins',
    fee: '₹30 delivery',
    price: '₹220',
    area: 'MG Road',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 5,
    name: 'Sushi Express',
    cuisine: 'Japanese • Sushi',
    dish: 'Rainbow Roll',
    intent: 'Dinner',
    rating: '4.9',
    eta: '30 mins',
    fee: '₹50 delivery',
    price: '₹360',
    area: 'Bandra',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 6,
    name: 'Dosa Delight',
    cuisine: 'South Indian • Breakfast',
    dish: 'Masala Dosa',
    intent: 'Breakfast',
    rating: '4.4',
    eta: '22 mins',
    fee: 'Free delivery',
    price: '₹120',
    area: 'Banashankari',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=900&q=80'
  }
];

const featuredDishes = [
  {
    id: 1001,
    name: 'Hyderabadi Biryani',
    price: '₹280',
    badge: 'Bestseller',
    description: 'Fragrant rice, tender meat, and rich spice layers.',
    image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 1002,
    name: 'Truffle Pizza',
    price: '₹320',
    badge: 'Hot Deal',
    description: 'Wood-fired crust with gooey cheese and truffle aroma.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 1003,
    name: 'Crispy Burger',
    price: '₹180',
    badge: 'Quick Bite',
    description: 'Juicy patty, crisp lettuce, and golden fries on the side.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 1004,
    name: 'Mediterranean Bowl',
    price: '₹220',
    badge: 'Healthy',
    description: 'Fresh greens, roasted veggies, and zesty dressing.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 1005,
    name: 'Paneer Tikka Wrap',
    price: '₹170',
    badge: 'Veg Favorite',
    description: 'Soft wrap packed with smoky paneer and mint chutney.',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 1006,
    name: 'Chocolate Lava Cake',
    price: '₹160',
    badge: 'Dessert',
    description: 'Warm molten chocolate cake with vanilla scoop.',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=900&q=80'
  }
];

const state = {
  search: '',
  location: 'Bangalore, India',
  schedule: 'Now',
  cart: [],
  authMode: 'login',
  user: JSON.parse(localStorage.getItem('zomato-user') || 'null')
};

const restaurantGrid = document.getElementById('restaurantGrid');
const featuredDishesGrid = document.getElementById('featuredDishesGrid');
const searchInput = document.getElementById('searchInput');
const locationInput = document.getElementById('locationInput');
const scheduleInput = document.getElementById('scheduleInput');
const locationBadge = document.getElementById('locationBadge');
const cartList = document.getElementById('cartList');
const cartTotal = document.getElementById('cartTotal');
const emptyCart = document.getElementById('emptyCart');
const authModal = document.getElementById('authModal');
const paymentModal = document.getElementById('paymentModal');
const authTitle = document.getElementById('authTitle');
const authSwitch = document.getElementById('authSwitch');
const authForm = document.getElementById('authForm');
const paymentForm = document.getElementById('paymentForm');
const userBadge = document.getElementById('userBadge');
const toast = document.getElementById('toast');
const historyList = document.getElementById('historyList');
const heroSearchButton = document.getElementById('heroSearchButton');
const discoverButton = document.getElementById('discoverButton');
const logoutButton = document.getElementById('logoutButton');
const loginButton = document.getElementById('loginButton');
const signupButton = document.getElementById('signupButton');
const checkoutButton = document.getElementById('checkoutButton');
const closeAuthButton = document.getElementById('closeAuthButton');
const closePaymentButton = document.getElementById('closePaymentButton');
const useLocationButton = document.getElementById('useLocationButton');
const scheduleSummary = document.getElementById('scheduleSummary');

function renderRestaurants() {
  const filtered = restaurants.filter((restaurant) => {
    const combined = `${restaurant.name} ${restaurant.cuisine} ${restaurant.dish} ${restaurant.intent} ${restaurant.area}`.toLowerCase();
    return combined.includes(state.search.toLowerCase()) && combined.includes(state.location.toLowerCase().split(',')[0].trim().toLowerCase());
  });

  if (!filtered.length) {
    restaurantGrid.innerHTML = '<div class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-600">No matching restaurants. Try a broader search.</div>';
    return;
  }

  restaurantGrid.innerHTML = filtered.map((restaurant) => `
    <article class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <img src="${restaurant.image}" alt="${restaurant.name}" class="h-40 w-full object-cover" />
      <div class="p-5">
        <div class="flex items-start justify-between gap-3">
          <div>
            <h3 class="text-lg font-semibold text-slate-900">${restaurant.name}</h3>
            <p class="mt-1 text-sm text-slate-600">${restaurant.cuisine}</p>
          </div>
          <span class="rounded-full bg-amber-100 px-2.5 py-1 text-sm font-semibold text-amber-700">★ ${restaurant.rating}</span>
        </div>
        <div class="mt-4 rounded-2xl bg-rose-50 p-3 text-sm text-slate-700">
          <p class="font-semibold text-rose-700">Best for ${restaurant.intent}</p>
          <p class="mt-1">${restaurant.dish}</p>
        </div>
        <div class="mt-4 flex items-center justify-between text-sm text-slate-600">
          <span>${restaurant.eta}</span>
          <span>${restaurant.fee}</span>
        </div>
        <div class="mt-4 flex items-center justify-between">
          <span class="text-sm font-semibold text-slate-900">${restaurant.price}</span>
          <button class="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white" data-add="${restaurant.id}">Add</button>
        </div>
      </div>
    </article>
  `).join('');
}

function renderFeaturedDishes() {
  featuredDishesGrid.innerHTML = featuredDishes.map((dish) => `
    <article class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <img src="${dish.image}" alt="${dish.name}" class="h-40 w-full object-cover" />
      <div class="p-5">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-slate-900">${dish.name}</h3>
          <span class="rounded-full bg-rose-100 px-2.5 py-1 text-sm font-semibold text-rose-700">${dish.badge}</span>
        </div>
        <p class="mt-2 text-sm text-slate-600">${dish.description}</p>
        <div class="mt-4 flex items-center justify-between">
          <span class="text-lg font-bold text-slate-900">${dish.price}</span>
          <button class="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white" data-add-dish="${dish.id}">Add</button>
        </div>
      </div>
    </article>
  `).join('');
}

function renderCart() {
  if (!state.cart.length) {
    cartList.innerHTML = '';
    emptyCart.classList.remove('hidden');
    cartTotal.innerHTML = '<span class="text-slate-500">Your cart is empty</span>';
    return;
  }

  emptyCart.classList.add('hidden');
  cartList.innerHTML = state.cart.map((item) => `
    <div class="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
      <div>
        <p class="font-semibold text-slate-900">${item.name}</p>
        <p class="text-sm text-slate-600">${item.dish}</p>
      </div>
      <span class="font-semibold text-rose-700">${item.price}</span>
    </div>
  `).join('');

  const total = state.cart.reduce((sum, item) => sum + Number(item.price.replace(/[^\d]/g, '')), 0);
  cartTotal.innerHTML = `<div class="text-right">
    <p class="text-sm text-slate-500">Estimated total</p>
    <p class="text-2xl font-bold text-slate-900">₹${total}</p>
  </div>`;
}

function renderHistory() {
  const orders = JSON.parse(localStorage.getItem('zomato-orders') || '[]');
  if (!orders.length) {
    historyList.innerHTML = '<li class="rounded-2xl border border-dashed border-slate-300 p-4 text-sm text-slate-600">No history yet. Place your first order to see it here.</li>';
    return;
  }

  historyList.innerHTML = orders.slice(-3).reverse().map((order) => `
    <li class="rounded-2xl border border-slate-200 bg-white p-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="font-semibold text-slate-900">${order.id}</p>
          <p class="text-sm text-slate-600">${order.location} • ${order.schedule}</p>
        </div>
        <span class="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">${order.status}</span>
      </div>
      <p class="mt-2 text-sm text-slate-600">${order.items.map((item) => `${item.name}`).join(', ')}</p>
      <p class="mt-2 text-sm font-semibold text-rose-700">₹${order.total}</p>
    </li>
  `).join('');
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 2200);
}

function openAuth(mode) {
  state.authMode = mode;
  authTitle.textContent = mode === 'login' ? 'Login' : 'Create account';
  authSwitch.textContent = mode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Login';
  authForm.querySelector('button').textContent = mode === 'login' ? 'Login' : 'Create account';
  authModal.classList.remove('hidden');
}

function closeAuth() {
  authModal.classList.add('hidden');
}

function openPayment() {
  if (!state.cart.length) {
    showToast('Add some food to your cart first');
    return;
  }
  paymentModal.classList.remove('hidden');
}

function closePayment() {
  paymentModal.classList.add('hidden');
}

function updateUserBadge() {
  if (state.user) {
    userBadge.classList.remove('hidden');
    userBadge.innerHTML = `<span class="font-semibold text-slate-900">${state.user.name}</span>`;
    loginButton.classList.add('hidden');
    signupButton.classList.add('hidden');
    logoutButton.classList.remove('hidden');
  } else {
    userBadge.classList.add('hidden');
    loginButton.classList.remove('hidden');
    signupButton.classList.remove('hidden');
    logoutButton.classList.add('hidden');
  }
}

function syncLocationBadge() {
  locationBadge.textContent = state.location;
  scheduleSummary.textContent = `Scheduled for ${state.schedule}`;
}

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-add], [data-add-dish]');
  if (!button) return;

  const restaurant = restaurants.find((item) => item.id === Number(button.getAttribute('data-add')));
  if (restaurant) {
    state.cart.push({
      id: restaurant.id,
      name: restaurant.name,
      dish: restaurant.dish,
      price: restaurant.price
    });
    renderCart();
    showToast(`${restaurant.name} added to cart`);
    return;
  }

  const dish = featuredDishes.find((item) => item.id === Number(button.getAttribute('data-add-dish')));
  if (dish) {
    state.cart.push({
      id: dish.id,
      name: dish.name,
      dish: dish.description,
      price: dish.price
    });
    renderCart();
    showToast(`${dish.name} added to cart`);
  }
});

searchInput.addEventListener('input', (event) => {
  state.search = event.target.value;
  renderRestaurants();
});

locationInput.addEventListener('input', (event) => {
  state.location = event.target.value || 'Bangalore, India';
  syncLocationBadge();
  renderRestaurants();
});

scheduleInput.addEventListener('change', (event) => {
  state.schedule = event.target.value;
  syncLocationBadge();
});

heroSearchButton.addEventListener('click', () => {
  renderRestaurants();
  document.getElementById('discovery').scrollIntoView({ behavior: 'smooth' });
});

discoverButton.addEventListener('click', () => {
  renderRestaurants();
  document.getElementById('discovery').scrollIntoView({ behavior: 'smooth' });
});

useLocationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    showToast('Geolocation is not supported');
    return;
  }

  navigator.geolocation.getCurrentPosition((position) => {
    state.location = `Lat ${position.coords.latitude.toFixed(2)}, Long ${position.coords.longitude.toFixed(2)}`;
    locationInput.value = state.location;
    syncLocationBadge();
    renderRestaurants();
    showToast('Location updated successfully');
  }, () => {
    showToast('Unable to fetch location');
  });
});

loginButton.addEventListener('click', () => openAuth('login'));
signupButton.addEventListener('click', () => openAuth('signup'));
authSwitch.addEventListener('click', () => {
  const nextMode = state.authMode === 'login' ? 'signup' : 'login';
  openAuth(nextMode);
});
closeAuthButton.addEventListener('click', closeAuth);
closePaymentButton.addEventListener('click', closePayment);
checkoutButton.addEventListener('click', openPayment);

logoutButton.addEventListener('click', () => {
  state.user = null;
  localStorage.removeItem('zomato-user');
  updateUserBadge();
  showToast('Logged out');
});

authForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(authForm);
  const name = formData.get('name')?.toString().trim() || 'Guest';
  const email = formData.get('email')?.toString().trim() || '';
  const password = formData.get('password')?.toString().trim() || '';

  if (!email || !password) {
    showToast('Please enter your email and password');
    return;
  }

  state.user = { name: state.authMode === 'signup' ? name : email.split('@')[0], email };
  localStorage.setItem('zomato-user', JSON.stringify(state.user));
  updateUserBadge();
  closeAuth();
  showToast(state.authMode === 'signup' ? 'Account created' : 'Welcome back');
});

paymentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!state.cart.length) {
    showToast('Add items to your cart first');
    return;
  }

  const formData = new FormData(paymentForm);
  const payment = formData.get('payment') || 'UPI';
  const address = formData.get('address')?.toString().trim() || 'Home address';
  const phone = formData.get('phone')?.toString().trim() || 'Not provided';

  const total = state.cart.reduce((sum, item) => sum + Number(item.price.replace(/[^\d]/g, '')), 0);
  const order = {
    id: `ORD-${Date.now()}`,
    items: state.cart,
    location: state.location,
    schedule: state.schedule,
    payment,
    address,
    phone,
    status: 'Confirmed',
    total
  };

  const orders = JSON.parse(localStorage.getItem('zomato-orders') || '[]');
  orders.push(order);
  localStorage.setItem('zomato-orders', JSON.stringify(orders));

  state.cart = [];
  renderCart();
  renderHistory();
  paymentForm.reset();
  closePayment();
  showToast(`Order placed successfully via ${payment}`);
});

window.addEventListener('DOMContentLoaded', () => {
  locationInput.value = state.location;
  syncLocationBadge();
  updateUserBadge();
  renderRestaurants();
  renderFeaturedDishes();
  renderCart();
  renderHistory();
});
