import React from 'react'

export default function SearchBar({ onSearch }) {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search for restaurants or cuisines..."
        onChange={(e) => onSearch(e.target.value)}
        className="input-field"
      />
    </div>
  )
}
