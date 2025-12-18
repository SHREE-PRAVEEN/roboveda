import React, { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import api from '../../services/api'
import '../../styles/globals.css'

const VerifyEmail = () => {
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const token = searchParams.get('token')

  React.useEffect(() => {
    if (token) {
      verifyToken()
    }
  }, [token])

  const verifyToken = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await api.post('/api/auth/verify-email', { token })
      setMessage(`✅ ${response.data.message}`)
      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.error || 'Verification failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ textAlign: 'center' }}>
        <h1 className="auth-title">Email Verification</h1>
        
        {loading && (
          <div style={{ padding: '2rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔄</div>
            <p>Verifying your email...</p>
          </div>
        )}

        {message && (
          <div style={{
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            color: '#22c55e',
            padding: '1rem',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '1rem',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
            {message}
            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
              Redirecting to login...
            </p>
          </div>
        )}

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#ef4444',
            padding: '1rem',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '1rem',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>❌</div>
            {error}
          </div>
        )}

        {!loading && !message && !error && (
          <div style={{ padding: '2rem' }}>
            <p>No verification token provided.</p>
            <Link to="/login" className="btn btn-accent" style={{ marginTop: '1rem', display: 'inline-block' }}>
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default VerifyEmail
