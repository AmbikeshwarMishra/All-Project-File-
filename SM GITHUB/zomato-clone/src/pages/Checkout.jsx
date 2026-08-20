import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, User, Phone, CreditCard } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Checkout() {
  const navigate = useNavigate()
  const { cartItems, getTotal, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    address: '',
    city: 'Bangalore',
    zipCode: '',
    phone: user?.phone || '',
    nameOnCard: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      // Create order
      const order = {
        id: `ORD-${Date.now()}`,
        items: cartItems,
        total: subtotal + deliveryFee + taxes,
        deliveryAddress: formData.address,
        city: formData.city,
        phone: formData.phone,
        paymentMethod,
        status: 'confirmed',
        estimatedDelivery: new Date(Date.now() + 30 * 60000).toLocaleTimeString(),
      }

      // Save order to localStorage
      const orders = JSON.parse(localStorage.getItem('zomato-orders') || '[]')
      orders.push(order)
      localStorage.setItem('zomato-orders', JSON.stringify(orders))

      // Clear cart
      clearCart()

      // Redirect to order confirmation
      navigate(`/orders?orderId=${order.id}`)
      setIsProcessing(false)
    }, 2000)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zomato-gray py-12">
        <div className="container max-w-2xl">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-xl font-semibold text-gray-800 mb-4">
              Please login to continue
            </p>
            <button
              onClick={() => navigate('/login')}
              className="btn-primary mr-4"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="btn-secondary"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-zomato-gray py-12">
        <div className="container max-w-2xl text-center py-16">
          <p className="text-2xl font-bold text-gray-800 mb-4">
            Your cart is empty
          </p>
          <button
            onClick={() => navigate('/restaurants')}
            className="btn-primary"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  const subtotal = getTotal()
  const deliveryFee = 40
  const taxes = Math.round(subtotal * 0.05)
  const total = subtotal + deliveryFee + taxes

  return (
    <div className="min-h-screen bg-zomato-gray py-8">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2 text-zomato-red hover:text-red-600"
          >
            <ArrowLeft size={24} />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Delivery Address */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <MapPin className="text-zomato-red" />
                  Delivery Address
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter delivery address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP Code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <User className="text-zomato-red" />
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <CreditCard className="text-zomato-red" />
                  Payment Method
                </h2>

                <div className="space-y-4 mb-6">
                  {['card', 'wallet', 'cash'].map((method) => (
                    <label key={method} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-zomato-red"
                      />
                      <span className="text-gray-800 capitalize">
                        {method === 'card' ? 'Credit/Debit Card' : method === 'wallet' ? 'Wallet' : 'Cash on Delivery'}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Card Details */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4 bg-zomato-gray p-4 rounded-lg">
                    <input
                      type="text"
                      name="nameOnCard"
                      placeholder="Name on card"
                      value={formData.nameOnCard}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card number"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="input-field"
                      />
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="input-field"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="btn-primary w-full py-3 text-lg disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-6 pb-6 border-b max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-semibold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Itemization */}
              <div className="space-y-3 mb-6 pb-6 border-b text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Delivery</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Taxes</span>
                  <span>₹{taxes}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between mb-6 pb-6 border-b-2 border-zomato-red">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="text-2xl font-bold text-zomato-red">₹{total}</span>
              </div>

              {/* User Info */}
              <div className="bg-zomato-lightred rounded-lg p-4 text-sm">
                <p className="font-semibold text-gray-800 mb-2">{user?.name}</p>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
