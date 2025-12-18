import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Spinner from './components/ui/Spinner'
import DashboardLayout from './components/layout/DashboardLayout'
import './styles/globals.css'
import './styles/theme.css'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home/Home'))
const About = lazy(() => import('./pages/About/About'))
const Products = lazy(() => import('./pages/Products/Products'))
const Pricing = lazy(() => import('./pages/Products/Pricing'))
const Solutions = lazy(() => import('./pages/Solutions/Solutions'))
const Blockchain = lazy(() => import('./pages/Blockchain/Blockchain'))
const AILabs = lazy(() => import('./pages/AI-Labs/AILabs'))
const DevPortal = lazy(() => import('./pages/DevPortal/DevPortal'))
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'))
const Login = lazy(() => import('./pages/Auth/Login'))
const Register = lazy(() => import('./pages/Auth/Register'))

function App() {
  return (
    <Suspense fallback={<Spinner text="Loading..." />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/blockchain" element={<Blockchain />} />
        <Route path="/ai-labs" element={<AILabs />} />
        <Route path="/dev-portal" element={<DevPortal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard/*" element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        } />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  )
}

export default App
