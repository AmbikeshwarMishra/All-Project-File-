import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ShoppingCart, User, LogOut, MapPin } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { cartItems } = useCart()
  const { user, logout } = useAuth()

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  const handleLogout = () => {
    logout()
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-zomato-red">Zomato</div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/restaurants" className="text-gray-700 hover:text-zomato-red transition">
              Restaurants
            </Link>
            <Link to="/orders" className="text-gray-700 hover:text-zomato-red transition">
              Orders
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Location */}
            <div className="flex items-center gap-2 text-gray-700 cursor-pointer hover:text-zomato-red">
              <MapPin size={20} />
              <span className="text-sm">Deliver to</span>
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-zomato-red transition"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-zomato-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth */}
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-zomato-lightred">
                  <User size={18} className="text-zomato-red" />
                  <span className="text-sm text-zomato-red font-semibold">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-zomato-red transition"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="btn-secondary text-sm py-1 px-4">
                  Login
                </Link>
                <Link to="/signup" className="btn-primary text-sm py-1 px-4">
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-zomato-red transition"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-zomato-red text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t">
            <Link
              to="/restaurants"
              className="block py-2 px-4 text-gray-700 hover:bg-zomato-lightred"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Restaurants
            </Link>
            <Link
              to="/orders"
              className="block py-2 px-4 text-gray-700 hover:bg-zomato-lightred"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Orders
            </Link>
            <div className="border-t my-2"></div>
            {user ? (
              <>
                <div className="px-4 py-2">
                  <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-600">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 px-4 text-gray-700 hover:bg-zomato-lightred text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 px-4 text-gray-700 hover:bg-zomato-lightred"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block py-2 px-4 text-gray-700 hover:bg-zomato-lightred"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
