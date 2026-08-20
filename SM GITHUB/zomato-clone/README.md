# Zomato Clone - React + Vite + Tailwind CSS

A fully responsive Zomato-like food delivery web application built with React, Vite, and Tailwind CSS. This project includes all major Zomato features like restaurant browsing, menu viewing, shopping cart, user authentication, and order tracking.

## 🚀 Features

### Core Features
- **Home Page** - Beautiful hero section with quick category filters and popular restaurants
- **Restaurant Listings** - Browse all restaurants with advanced filters and sorting
- **Search & Filters** - Search by restaurant name or cuisine with category filters
- **Restaurant Details** - View complete menu organized by categories
- **Shopping Cart** - Add/remove items with quantity management
- **User Authentication** - Login/Signup functionality with form validation
- **Checkout** - Complete order placement with delivery address and payment options
- **Order Tracking** - Track orders with real-time status updates
- **Fully Responsive Design** - Works seamlessly on mobile, tablet, and desktop

### Advanced Features
- **Smart Filtering**
  - Fast delivery (≤25 mins)
  - High ratings (≥4.5)
  - Special offers
  - Pure vegetarian options
  - No-contact delivery

- **Sorting Options**
  - Popular
  - Highest rated
  - Fastest delivery
  - Lowest delivery fee

- **User Features**
  - User profile management
  - Multiple delivery addresses
  - Order history
  - Real-time order tracking with status updates
  - Rating and reviews capability

- **Payment Options**
  - Credit/Debit Card
  - Digital Wallet
  - Cash on Delivery

## 📁 Project Structure

```
zomato-clone/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navigation.jsx   # Top navigation bar
│   │   ├── Footer.jsx       # Footer component
│   │   ├── RestaurantCard.jsx
│   │   ├── MenuItem.jsx
│   │   ├── SearchBar.jsx
│   │   ├── FilterBar.jsx
│   │   └── CategoryFilter.jsx
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── Restaurants.jsx
│   │   ├── RestaurantDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── OrderTracking.jsx
│   ├── context/             # Context API
│   │   ├── CartContext.jsx  # Shopping cart state
│   │   └── AuthContext.jsx  # User authentication state
│   ├── data/
│   │   └── mockData.js      # Mock restaurant and menu data
│   ├── styles/
│   │   └── index.css        # Global styles
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **State Management:** Context API
- **HTTP Client:** Axios (ready for API integration)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Step-by-Step Installation

1. **Navigate to the project directory:**
   ```bash
   cd zomato-clone
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - The app will typically run at `http://localhost:3000`
   - Check terminal output for the exact URL

## 🎮 How to Use

### Browsing Restaurants
1. Go to home page and use the search bar to find restaurants or cuisines
2. Click on "View All Restaurants" to see the complete list
3. Apply filters (fast delivery, rating, offers, etc.)
4. Sort by popularity, rating, delivery time, or delivery fee

### Placing an Order
1. Click on a restaurant to view the menu
2. Items are organized by categories (Biryani, Pizza, etc.)
3. Add items to cart using the Add button
4. Manage quantities using +/- buttons
5. View cart and proceed to checkout
6. Fill in delivery address and payment details
7. Place order and track it in real-time

### User Features
1. **Sign Up** - Create a new account with email and phone
2. **Login** - Login with your credentials
3. **View Orders** - Check your order history and status
4. **Track Order** - See real-time delivery status

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile:** 320px - 640px
- **Tablet:** 641px - 1024px
- **Desktop:** 1025px and above

All pages, components, and features adapt perfectly to different screen sizes.

## 💾 Local Storage

The app uses browser's localStorage to persist:
- **Cart Items** - Stored in `zomato-cart`
- **User Data** - Stored in `zomato-user`
- **Order History** - Stored in `zomato-orders`

## 🎨 Color Scheme (Tailwind CSS)

- **Primary Red:** #EF4F5F (Zomato brand color)
- **Light Red:** #FFEBEE (Backgrounds)
- **Dark:** #1C1C1C (Text)
- **Gray:** #F5F5F5 (Light backgrounds)

## 🔐 Authentication

- Mock authentication using Context API
- Email validation and password requirements
- User profile management
- Remember me functionality
- Demo credentials available on login page

## 🏪 Mock Data

The app comes with pre-populated mock data including:
- 8 sample restaurants (Biryani House, Pizza Paradise, Burger King, etc.)
- 20+ menu items per restaurant
- Realistic ratings, delivery times, and prices
- Special offers and discounts

## 🔄 State Management

### CartContext
- Manages shopping cart items
- Add/remove items functionality
- Quantity management
- Total calculation
- LocalStorage persistence

### AuthContext
- User login/signup
- User profile management
- Authentication state
- LocalStorage persistence

## 🚀 Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## 👁️ Preview

The app includes:
- Hero section with animations
- Interactive restaurant cards with ratings and offers
- Smooth category filtering
- Real-time cart updates
- Animated order tracking
- Form validation
- Error handling

## 🐛 Demo Credentials

- **Email:** demo@zomato.com
- **Password:** demo123

## 📝 Future Enhancements

- Real API integration
- Payment gateway integration (Razorpay, Stripe)
- Real-time notifications
- User reviews and ratings
- Loyalty programs
- Restaurant admin panel
- Delivery partner tracking
- SMS/Email notifications
- Advanced analytics

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built as a practice project for learning React + Vite + Tailwind CSS.

## 🤝 Support

For any issues or questions, please create an issue in the project repository.

---

**Happy Ordering! 🍕🍔🍛**
