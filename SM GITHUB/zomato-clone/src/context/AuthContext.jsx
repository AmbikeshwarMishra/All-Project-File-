import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('zomato-user')
      return savedUser ? JSON.parse(savedUser) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('zomato-user', JSON.stringify(user))
    } else {
      localStorage.removeItem('zomato-user')
    }
  }, [user])

  const login = (email, password) => {
    // Mock login - in real app, verify against backend
    const userData = {
      id: Date.now(),
      email,
      name: email.split('@')[0],
      phone: '+91 9876543210',
      addresses: [],
    }
    setUser(userData)
    return userData
  }

  const signup = (name, email, password) => {
    // Mock signup - in real app, save to backend
    const userData = {
      id: Date.now(),
      email,
      name,
      phone: '+91 9876543210',
      addresses: [],
    }
    setUser(userData)
    return userData
  }

  const logout = () => {
    setUser(null)
  }

  const updateProfile = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
