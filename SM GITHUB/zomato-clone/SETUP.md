# Quick Start Guide - Zomato Clone

## ⚡ Quick Setup (5 minutes)

### Step 1: Install Dependencies
Open terminal in the `zomato-clone` directory and run:
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to `http://localhost:3000` (or the URL shown in your terminal)

## 🎯 What to Do First

### Explore the Home Page
- See the hero section with search functionality
- Browse "What's on your mind?" categories
- Scroll to see popular restaurants

### Browse Restaurants
- Click "Explore Restaurants" or go to `/restaurants`
- Use the search bar to find restaurants
- Try filters (Fast Delivery, High Rating, Offers, etc.)
- Sort by different criteria

### Place a Sample Order
1. Click on any restaurant (e.g., "Biryani House")
2. View the menu organized by categories
3. Click "Add" on items to add to cart
4. Use +/- to adjust quantities
5. Click "View Cart" floating button
6. Review cart and click "Proceed to Checkout"
7. Sign up or login first if needed
8. Fill in delivery details
9. Choose payment method
10. Click "Place Order"

### Track Your Order
- Navigate to "Orders" page (top navigation)
- Click on an order to see details
- View real-time delivery status
- See estimated delivery time

### Test User Authentication
- Click "Sign up" to create new account
- Or click "Login" and use demo credentials:
  - Email: demo@zomato.com
  - Password: demo123

## 🔧 Available Scripts

### Development
```bash
npm run dev
```
Starts the development server with hot reload.

### Build
```bash
npm run build
```
Creates optimized production build.

### Preview
```bash
npm run preview
```
Preview the production build locally.

## 📱 Test Responsive Design

1. **Mobile:** Resize browser to 375px width
2. **Tablet:** Resize browser to 768px width
3. **Desktop:** Keep default size

All layouts adapt automatically!

## 🧪 Test Different Features

### Search & Filter
- Home page search bar
- Restaurant search in `/restaurants`
- Try filter combinations

### Cart Management
- Add multiple items from different restaurants
- Update quantities
- Remove items
- Clear entire cart

### Authentication
- Sign up with new email
- Login with demo credentials
- View user profile in navigation
- Logout functionality

### Order Management
- Place an order
- View order history
- Check delivery status
- See order details and items

## 📂 Important Files to Know

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app with routing |
| `src/context/CartContext.jsx` | Cart state management |
| `src/context/AuthContext.jsx` | User authentication |
| `src/data/mockData.js` | Sample restaurant data |
| `tailwind.config.js` | Tailwind CSS configuration |
| `index.html` | HTML entry point |

## 🎨 Customization

### Change Brand Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  zomato: {
    red: '#YOUR_COLOR', // Change primary color
  }
}
```

### Add More Restaurants
Edit `src/data/mockData.js` and add to `mockRestaurants` array.

### Modify Navigation
Edit `src/components/Navigation.jsx`

## 🚨 Troubleshooting

### Port Already in Use
If port 3000 is busy, edit `vite.config.js`:
```javascript
port: 3001 // Change to different port
```

### Dependencies Not Installing
```bash
rm -rf node_modules package-lock.json
npm install
```

### Styles Not Loading
Clear browser cache (Ctrl+Shift+Delete) and reload.

## 📚 Learn More

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Router Documentation](https://reactrouter.com)

## 🎓 Next Steps

1. **API Integration:** Replace mock data with real API calls
2. **Authentication:** Integrate with backend authentication
3. **Payment:** Add Razorpay or Stripe integration
4. **Database:** Connect to Firebase or MongoDB
5. **Deployment:** Deploy to Vercel or Netlify

## 💡 Tips

- Use browser DevTools to inspect elements
- Check Console for any errors
- LocalStorage persists data across sessions
- Clear localStorage if you want fresh start:
  ```javascript
  localStorage.clear() // In browser console
  ```

---

**Ready to start? Run `npm install && npm run dev` and enjoy! 🚀**
