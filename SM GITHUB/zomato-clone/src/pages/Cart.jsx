import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const navigate = useNavigate()
  const { cartItems, removeFromCart, updateQuantity, getTotal } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-zomato-gray py-12">
        <div className="container text-center py-16">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items yet
          </p>
          <Link to="/restaurants" className="btn-primary">
            Continue Exploring
          </Link>
        </div>
      </div>
    )
  }

  // Group items by restaurant
  const itemsByRestaurant = cartItems.reduce((acc, item) => {
    if (!acc[item.restaurantId]) {
      acc[item.restaurantId] = []
    }
    acc[item.restaurantId].push(item)
    return acc
  }, {})

  const subtotal = getTotal()
  const deliveryFee = 40
  const taxes = Math.round(subtotal * 0.05)
  const total = subtotal + deliveryFee + taxes

  return (
    <div className="min-h-screen bg-zomato-gray py-8">
      <div className="container">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-zomato-red hover:text-red-600 transition"
          >
            <ArrowLeft size={24} />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {Object.entries(itemsByRestaurant).map(([restaurantId, items]) => (
              <div key={restaurantId} className="bg-white rounded-lg shadow-md mb-6 p-6">
                {/* Restaurant Name */}
                <h2 className="text-xl font-bold text-gray-800 mb-4 pb-4 border-b">
                  {items[0].restaurantName}
                </h2>

                {/* Items */}
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-start gap-4 pb-4 border-b last:border-b-0"
                    >
                      {/* Item Details */}
                      <div className="flex-grow">
                        <h3 className="font-semibold text-gray-800 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          ₹{item.price} x {item.quantity}
                        </p>
                        <p className="text-lg font-bold text-zomato-red">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 text-gray-600 hover:bg-gray-100"
                          >
                            <Minus size={18} />
                          </button>
                          <span className="w-8 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-gray-600 hover:bg-gray-100"
                          >
                            <Plus size={18} />
                          </button>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

              {/* Itemization */}
              <div className="space-y-4 mb-6 pb-6 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Delivery Fee</span>
                  <span className="font-semibold">₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Taxes & Charges</span>
                  <span className="font-semibold">₹{taxes}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between mb-6 pb-6 border-b-2 border-zomato-red">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="text-2xl font-bold text-zomato-red">₹{total}</span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate('/checkout')}
                className="btn-primary w-full py-3 text-lg"
              >
                Proceed to Checkout
              </button>

              {/* Continue Shopping */}
              <Link
                to="/restaurants"
                className="block text-center mt-4 text-zomato-red hover:text-red-600 font-semibold transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
