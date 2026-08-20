import React from 'react'
import { Plus, Minus } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function MenuItem({ item }) {
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart()
  const cartItem = cartItems.find((ci) => ci.id === item.id)
  const quantity = cartItem?.quantity || 0

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-start gap-4">
      {/* Item Details */}
      <div className="flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <h4 className="font-semibold text-gray-800">{item.name}</h4>
          {item.isVeg ? (
            <div className="border-2 border-green-600 w-4 h-4 rounded flex items-center justify-center">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            </div>
          ) : (
            <div className="border-2 border-red-600 w-4 h-4 rounded flex items-center justify-center">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            </div>
          )}
        </div>
        <p className="text-gray-700 font-semibold mb-2">₹{item.price}</p>
        <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
        {item.rating && (
          <p className="text-xs text-gray-500 mt-2">⭐ {item.rating}</p>
        )}
      </div>

      {/* Image & Add Button */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-200">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {quantity === 0 ? (
          <button
            onClick={() =>
              addToCart({
                ...item,
                restaurantId: item.restaurantId,
                restaurantName: item.restaurantName,
              })
            }
            className="btn-secondary text-sm py-1 px-4 whitespace-nowrap"
          >
            Add
          </button>
        ) : (
          <div className="flex items-center gap-2 border border-zomato-red rounded-lg px-2 py-1">
            <button
              onClick={() => updateQuantity(item.id, quantity - 1)}
              className="text-zomato-red hover:bg-zomato-lightred p-1"
            >
              <Minus size={16} />
            </button>
            <span className="w-6 text-center font-semibold text-sm">{quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, quantity + 1)}
              className="text-zomato-red hover:bg-zomato-lightred p-1"
            >
              <Plus size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
