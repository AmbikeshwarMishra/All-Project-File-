import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, ChefHat, Clock, Zap } from 'lucide-react'
import RestaurantCard from '../components/RestaurantCard'
import { mockRestaurants } from '../data/mockData'

export default function Home() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('Bangalore')

  const filteredRestaurants = mockRestaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisines.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-zomato-red to-red-600 text-white py-12">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              Order food online from your favourite restaurants
            </h1>
            <p className="text-center mb-8 text-red-100">
              Get your food delivered in 30 minutes or less
            </p>

            {/* Search & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Location */}
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your delivery location"
                  className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-800 focus:outline-none"
                />
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for restaurant or cuisine"
                  className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-800 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Category Section */}
      <div className="bg-zomato-gray py-8">
        <div className="container">
          <h2 className="section-title text-center">What's on your mind?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Pizzas', emoji: '🍕' },
              { name: 'Burgers', emoji: '🍔' },
              { name: 'Biryani', emoji: '🍛' },
              { name: 'Chinese', emoji: '🥢' },
              { name: 'Desserts', emoji: '🍰' },
              { name: 'Drinks', emoji: '🥤' },
            ].map((category, idx) => (
              <button
                key={idx}
                onClick={() => setSearchQuery(category.name)}
                className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition"
              >
                <div className="text-4xl mb-2">{category.emoji}</div>
                <p className="font-semibold text-gray-800">{category.name}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-zomato-lightred rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="text-zomato-red" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your order delivered in 30 minutes or less</p>
            </div>
            <div className="text-center">
              <div className="bg-zomato-lightred rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ChefHat className="text-zomato-red" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Best Restaurants</h3>
              <p className="text-gray-600">Order from thousands of restaurants in your area</p>
            </div>
            <div className="text-center">
              <div className="bg-zomato-lightred rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="text-zomato-red" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Track Orders</h3>
              <p className="text-gray-600">Real-time order tracking and updates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurants Section */}
      <div className="py-12 bg-zomato-gray">
        <div className="container">
          <h2 className="section-title">Popular Restaurants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRestaurants.slice(0, 12).map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/restaurants')}
              className="btn-primary"
            >
              View All Restaurants
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-zomato-red text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to order?</h2>
          <p className="text-lg mb-8 text-red-100">
            Browse restaurants, cuisines, and special offers
          </p>
          <button
            onClick={() => navigate('/restaurants')}
            className="bg-white text-zomato-red font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition"
          >
            Explore Restaurants
          </button>
        </div>
      </div>
    </div>
  )
}
