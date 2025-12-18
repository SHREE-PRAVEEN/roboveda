import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../styles/globals.css'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    
    try {
      // Add your registration logic here
      console.log('Register:', formData)
      navigate('/login')
    } catch (err) {
      setError('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>
            Robo<span style={{ color: 'var(--color-accent)' }}>Veda</span>
          </Link>
          <h1 className="auth-title" style={{ marginTop: '1.5rem' }}>Create Account</h1>
          <p className="auth-subtitle">Start building robots today</p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#ef4444',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '1.5rem',
            fontSize: '0.875rem',
          }}>
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div>
            <label className="label">Full Name</label>
            <input
              type="text"
              name="name"
              className="input"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
            />
          </div>
          <div>
            <label className="label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="input"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ fontSize: '0.875rem' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" required style={{ marginTop: '0.25rem' }} />
              <span style={{ color: 'var(--text-secondary)' }}>
                I agree to the <Link to="/terms" style={{ color: 'var(--color-primary-light)' }}>Terms of Service</Link> and{' '}
                <Link to="/privacy" style={{ color: 'var(--color-primary-light)' }}>Privacy Policy</Link>
              </span>
            </label>
          </div>
          <button 
            type="submit" 
            className="btn btn-accent" 
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-divider">
          <span>or continue with</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <button className="btn btn-outline">
            <span>🌐</span> Google
          </button>
          <button className="btn btn-outline">
            <span>🐙</span> GitHub
          </button>
        </div>

        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--color-accent)' }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
