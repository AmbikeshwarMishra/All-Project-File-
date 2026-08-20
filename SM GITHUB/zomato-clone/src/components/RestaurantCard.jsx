import React from 'react'
import { Link } from 'react-router-dom'
import { Star, Zap, MapPin } from 'lucide-react'

export default function RestaurantCard({ restaurant }) {
  return (
    <Link to={`/restaurant/${restaurant.id}`}>
      <div className="card overflow-hidden h-full hover:scale-105 transition-transform">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-gray-200">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          {restaurant.discount && (
            <div className="absolute top-3 left-3 bg-gray-800 text-white px-3 py-1 rounded text-sm font-semibold">
              {restaurant.discount}% OFF
            </div>
          )}
          {restaurant.promoted && (
            <div className="absolute top-3 right-3 bg-zomato-red text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
              <Zap size={14} /> Promoted
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Name & Rating */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded">
              <Star size={14} className="fill-green-600 text-green-600" />
              <span className="text-xs font-semibold text-green-600">
                {restaurant.rating}
              </span>
            </div>
          </div>

          {/* Cuisine & Delivery */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-1">
            {restaurant.cuisines.join(', ')}
          </p>

          {/* Delivery Time & Fee */}
          <div className="flex items-center justify-between text-sm text-gray-700 mb-3">
            <span className="font-semibold">₹{restaurant.deliveryFee} delivery</span>
            <span>{restaurant.deliveryTime} mins</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-gray-600 text-xs mb-3">
            <MapPin size={14} />
            <span className="line-clamp-1">{restaurant.area}</span>
          </div>

          {/* Offers */}
          {restaurant.offers && restaurant.offers.length > 0 && (
            <div className="pt-3 border-t">
              <p className="text-xs font-semibold text-zomato-red mb-2">
                Offers: {restaurant.offers[0]}
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
