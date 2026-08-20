import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields')
        setIsLoading(false)
        return
      }

      // Mock login validation
      if (!formData.email.includes('@')) {
        setError('Please enter a valid email address')
        setIsLoading(false)
        return
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters')
        setIsLoading(false)
        return
      }

      // Simulate API call
      setTimeout(() => {
        login(formData.email, formData.password)
        navigate('/')
        setIsLoading(false)
      }, 1000)
    } catch (err) {
      setError('Login failed. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zomato-red to-red-600 flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-zomato-red mb-2">Zomato</h1>
          <p className="text-gray-600">Order your favorite food online</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="text-red-600 mt-1 flex-shrink-0" size={20} />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                className="input-field pl-12"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••"
                className="input-field pl-12"
              />
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 text-zomato-red" />
              <span className="text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-zomato-red hover:text-red-600 font-semibold">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full py-3 text-lg disabled:opacity-50 mt-6"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="bg-blue-50 rounded-lg p-4 mt-6">
          <p className="text-xs font-semibold text-gray-800 mb-2">Demo Credentials:</p>
          <p className="text-xs text-gray-700 mb-1">Email: demo@zomato.com</p>
          <p className="text-xs text-gray-700">Password: demo123</p>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-gray-700 mt-6">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-zomato-red hover:text-red-600 font-bold"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  )
}
