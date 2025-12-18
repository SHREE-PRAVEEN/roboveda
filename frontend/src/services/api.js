import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      // Only redirect if not already on auth pages
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// Auth endpoints
export const login = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password })
  return data
}

export const register = async (email, username, password, wallet_address) => {
  const { data } = await api.post('/auth/register', { 
    email, 
    username, 
    password, 
    wallet_address 
  })
  return data
}

export const verifyToken = async (token) => {
  const { data } = await api.get('/auth/verify', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return data
}

// User endpoints
export const getCurrentUser = async () => {
  const { data } = await api.get('/users/me')
  return data
}

export const updateProfile = async (profileData) => {
  const { data } = await api.put('/users/profile', profileData)
  return data
}

// Device/Robotics endpoints
export const getDevices = async () => {
  const { data } = await api.get('/robotics/devices')
  return data
}

export const registerDevice = async (deviceData) => {
  const { data } = await api.post('/robotics/devices', deviceData)
  return data
}

export const sendDeviceCommand = async (deviceId, command) => {
  const { data } = await api.post(`/robotics/devices/${deviceId}/command`, command)
  return data
}

export const getDeviceStatus = async (deviceId) => {
  const { data } = await api.get(`/robotics/devices/${deviceId}/status`)
  return data
}

// AI endpoints
export const inferenceAI = async (modelType, inputData) => {
  const { data } = await api.post('/ai/inference', { modelType, inputData })
  return data
}

export const getAIModels = async () => {
  const { data } = await api.get('/ai/models')
  return data
}

// Payment/Transaction endpoints
export const createPayment = async (paymentData) => {
  const { data } = await api.post('/payments/create', paymentData)
  return data
}

export const verifyPayment = async (paymentId) => {
  const { data } = await api.get(`/payments/verify/${paymentId}`)
  return data
}

export const getTransactions = async () => {
  const { data } = await api.get('/transactions')
  return data
}

// Blockchain endpoints
export const getBlockchainStatus = async () => {
  const { data } = await api.get('/blockchain/status')
  return data
}

export const createBlockchainTransaction = async (txData) => {
  const { data } = await api.post('/blockchain/transaction', txData)
  return data
}

export default api
