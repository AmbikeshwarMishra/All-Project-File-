import React from 'react'

const FILTERS = [
  { id: 'fast-delivery', label: 'Fast Delivery', icon: '🚴' },
  { id: 'rating', label: '4.5+ Rating', icon: '⭐' },
  { id: 'offers', label: 'Offers', icon: '🎁' },
  { id: 'pure-veg', label: 'Pure Veg', icon: '🥗' },
  { id: 'no-contact', label: 'No Contact', icon: '🤝' },
]

export default function FilterBar({ filters, onFilterChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
      {FILTERS.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
            filters.includes(filter.id)
              ? 'bg-zomato-red text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {filter.icon} {filter.label}
        </button>
      ))}
    </div>
  )
}
