import React from 'react'

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="bg-white rounded-lg p-4 mb-6 sticky top-20 z-40">
      <h3 className="font-bold text-lg mb-4 text-gray-800">Menu Categories</h3>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`w-full text-left px-4 py-2 rounded-lg transition ${
              selectedCategory === category
                ? 'bg-zomato-lightred text-zomato-red font-semibold'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
