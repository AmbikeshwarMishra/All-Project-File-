import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-zomato-dark text-white mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-zomato-red mb-4">Zomato</h3>
            <p className="text-gray-400 text-sm">
              Discover the best food around you and order your favorite meals online.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="font-bold mb-4">Useful Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/restaurants" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h4 className="font-bold mb-4">For Users</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Order Online
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Track Orders
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  My Bookings
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Favorites
                </a>
              </li>
            </ul>
          </div>

          {/* For Partners */}
          <div>
            <h4 className="font-bold mb-4">For Partners</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Restaurant Partner
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Delivery Partner
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Advertise With Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-gray-700 p-2 rounded-full hover:bg-zomato-red transition"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="bg-gray-700 p-2 rounded-full hover:bg-zomato-red transition"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="bg-gray-700 p-2 rounded-full hover:bg-zomato-red transition"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="bg-gray-700 p-2 rounded-full hover:bg-zomato-red transition"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2024 Zomato. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
