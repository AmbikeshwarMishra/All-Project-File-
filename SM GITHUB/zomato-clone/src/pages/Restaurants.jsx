import React, { useState } from 'react'
import { Search } from 'lucide-react'
import RestaurantCard from '../components/RestaurantCard'
import FilterBar from '../components/FilterBar'
import { mockRestaurants } from '../data/mockData'

export default function Restaurants() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState([])
  const [sortBy, setSortBy] = useState('popular')

  const handleFilterChange = (filterId) => {
    setFilters((prev) =>
      prev.includes(filterId) ? prev.filter((f) => f !== filterId) : [...prev, filterId]
    )
  }

  let filteredRestaurants = mockRestaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisines.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesFilters =
      filters.length === 0 ||
      filters.every((filter) => {
        if (filter === 'fast-delivery') return restaurant.deliveryTime <= 25
        if (filter === 'rating') return restaurant.rating >= 4.5
        if (filter === 'offers') return restaurant.offers && restaurant.offers.length > 0
        if (filter === 'pure-veg')
          return restaurant.menu.every((item) => item.isVeg)
        return true
      })

    return matchesSearch && matchesFilters
  })

  // Sort restaurants
  if (sortBy === 'rating') {
    filteredRestaurants.sort((a, b) => b.rating - a.rating)
  } else if (sortBy === 'delivery-time') {
    filteredRestaurants.sort((a, b) => a.deliveryTime - b.deliveryTime)
  } else if (sortBy === 'delivery-fee') {
    filteredRestaurants.sort((a, b) => a.deliveryFee - b.deliveryFee)
  }

  return (
    <div className="min-h-screen bg-zomato-gray py-8">
      <div className="container">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for restaurants or cuisines..."
              className="input-field pl-12 py-3"
            />
          </div>
        </div>

        {/* Filters */}
        <FilterBar filters={filters} onFilterChange={handleFilterChange} />

        {/* Sort Options */}
        <div className="mb-6 flex gap-4 flex-wrap">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-zomato-red"
          >
            <option value="popular">Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="delivery-time">Fastest Delivery</option>
            <option value="delivery-fee">Lowest Delivery Fee</option>
          </select>
        </div>

        {/* Results */}
        {filteredRestaurants.length > 0 ? (
          <>
            <p className="text-gray-600 mb-6">
              Showing {filteredRestaurants.length} restaurants
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-2xl font-bold text-gray-700 mb-2">
              No restaurants found
            </p>
            <p className="text-gray-600">
              Try searching with different keywords or clearing some filters
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
