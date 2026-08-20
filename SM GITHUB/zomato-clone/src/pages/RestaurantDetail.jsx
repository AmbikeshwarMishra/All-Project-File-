import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Star, MapPin, Clock, Zap, ChevronLeft } from 'lucide-react'
import MenuItem from '../components/MenuItem'
import CategoryFilter from '../components/CategoryFilter'
import { mockRestaurants } from '../data/mockData'
import { useCart } from '../context/CartContext'

export default function RestaurantDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { cartItems } = useCart()
  const [selectedCategory, setSelectedCategory] = useState('Biryani')

  const restaurant = mockRestaurants.find((r) => r.id === parseInt(id))

  if (!restaurant) {
    return (
      <div className="container py-16 text-center">
        <p className="text-2xl font-bold text-gray-800 mb-4">Restaurant not found</p>
        <button onClick={() => navigate('/restaurants')} className="btn-primary">
          Back to Restaurants
        </button>
      </div>
    )
  }

  const categories = [...new Set(restaurant.menu.map((item) => item.category))]
  const filteredMenu = restaurant.menu.filter(
    (item) => item.category === selectedCategory
  )

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button & Hero */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white sticky top-16 z-30">
        <div className="container py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 hover:text-zomato-red transition mb-4"
          >
            <ChevronLeft size={24} />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Restaurant Hero */}
      <div className="bg-gradient-to-b from-gray-900 to-white py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Image */}
            <div className="md:col-span-1 order-2 md:order-1">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Details */}
            <div className="md:col-span-2 order-1 md:order-2 text-white md:text-gray-800">
              <h1 className="text-4xl font-bold mb-4">{restaurant.name}</h1>

              {/* Rating & Info */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2 bg-green-100 px-3 py-2 rounded-lg">
                  <Star size={20} className="fill-green-600 text-green-600" />
                  <div>
                    <p className="text-sm font-semibold text-green-600">
                      {restaurant.rating}
                    </p>
                    <p className="text-xs text-green-700">Ratings</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-blue-100 px-3 py-2 rounded-lg">
                  <Clock size={20} className="text-blue-600" />
                  <div>
                    <p className="text-sm font-semibold text-blue-600">
                      {restaurant.deliveryTime} mins
                    </p>
                    <p className="text-xs text-blue-700">Delivery</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-orange-100 px-3 py-2 rounded-lg">
                  <Zap size={20} className="text-orange-600" />
                  <div>
                    <p className="text-sm font-semibold text-orange-600">
                      ₹{restaurant.deliveryFee}
                    </p>
                    <p className="text-xs text-orange-700">Delivery Fee</p>
                  </div>
                </div>
              </div>

              {/* Cuisines */}
              <p className="text-gray-700 mb-4">
                <strong>Cuisines:</strong> {restaurant.cuisines.join(', ')}
              </p>

              {/* Location */}
              <div className="flex items-start gap-2 text-gray-700 mb-6">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-sm">{restaurant.area}, Bangalore</p>
                </div>
              </div>

              {/* Offers */}
              {restaurant.offers && restaurant.offers.length > 0 && (
                <div className="bg-zomato-lightred border border-zomato-red rounded-lg p-4">
                  <p className="font-bold text-zomato-red mb-2">Current Offers:</p>
                  <ul className="text-sm text-gray-800 space-y-1">
                    {restaurant.offers.map((offer, idx) => (
                      <li key={idx}>✓ {offer}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <div>
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          {/* Menu Items */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{selectedCategory}</h2>
            <div className="space-y-4">
              {filteredMenu.length > 0 ? (
                filteredMenu.map((item) => (
                  <MenuItem
                    key={item.id}
                    item={{
                      ...item,
                      restaurantId: restaurant.id,
                      restaurantName: restaurant.name,
                    }}
                  />
                ))
              ) : (
                <p className="text-gray-600 text-center py-8">
                  No items in this category
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <div className="fixed bottom-8 right-8 z-40">
          <button
            onClick={() => navigate('/cart')}
            className="btn-primary py-4 px-6 rounded-full shadow-lg flex items-center gap-2 text-lg"
          >
            View Cart ({cartCount} items)
          </button>
        </div>
      )}
    </div>
  )
}
