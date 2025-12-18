import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import * as api from '../services/api'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      try {
        const userData = await api.verifyToken(token)
        setUser(userData)
      } catch (error) {
        localStorage.removeItem('auth_token')
      }
    }
    setLoading(false)
  }

  const login = async (email, password) => {
    try {
      const response = await api.login(email, password)
      localStorage.setItem('auth_token', response.token)
      setUser(response.user)
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.message || 'Login failed')
      throw error
    }
  }

  const register = async (email, username, password, walletAddress) => {
    try {
      const response = await api.register(email, username, password, walletAddress)
      localStorage.setItem('auth_token', response.token)
      setUser(response.user)
      toast.success('Account created successfully!')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.message || 'Registration failed')
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    setUser(null)
    navigate('/')
    toast.success('Logged out successfully')
  }

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }))
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout, 
      updateUser 
    }}>
      {children}
    </AuthContext.Provider>
  )
}
