import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import '../../styles/globals.css'
import '../../styles/theme.css'

export default function Home() {
  const features = [
    {
      icon: '🤖',
      title: 'Robot SDK',
      description: 'Complete robotics development kit with pre-built modules, sensor integrations, and motor controllers.',
    },
    {
      icon: '🧠',
      title: 'AI Engine',
      description: 'Advanced machine learning models for computer vision, path planning, and autonomous decision making.',
    },
    {
      icon: '🔗',
      title: 'Blockchain Security',
      description: 'Secure licensing and ownership verification through smart contracts on the blockchain.',
    },
    {
      icon: '☁️',
      title: 'Cloud Dashboard',
      description: 'Monitor and control your robots remotely with our real-time cloud dashboard.',
    },
    {
      icon: '📡',
      title: 'IoT Integration',
      description: 'Seamlessly connect your robots to IoT devices and smart home ecosystems.',
    },
    {
      icon: '🛡️',
      title: 'Enterprise Security',
      description: 'Bank-grade security with end-to-end encryption and role-based access control.',
    },
  ]

  const stats = [
    { value: '10K+', label: 'Robots Built' },
    { value: '99.9%', label: 'Uptime' },
    { value: '50+', label: 'Countries' },
    { value: '$1.6', label: 'Starting Price' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h1 className="hero-title">
              Build the Future with{' '}
              <span className="text-gradient">RoboVeda</span>
            </h1>
            <p className="hero-subtitle" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
              Premium robotics software, AI-powered automation, and blockchain-secured 
              licensing. Start building your robot empire today for just $1.6.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '4rem' }}>
              <Link to="/pricing" className="btn btn-accent btn-lg">
                Get Started Now
              </Link>
              <Link to="/dev-portal" className="btn btn-outline btn-lg">
                View Documentation
              </Link>
            </div>

            {/* Stats */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: '2rem',
              padding: '2rem',
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-color)',
            }}>
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-accent)' }}>
                    {value}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Everything You Need to Build <span className="text-gradient">Amazing Robots</span>
            </h2>
            <p className="section-subtitle">
              A complete platform for robotics development, from prototype to production.
            </p>
          </div>

          <div className="features-grid">
            {features.map(({ icon, title, description }) => (
              <div key={title} className="feature-card">
                <div className="feature-icon">
                  <span style={{ fontSize: '1.5rem' }}>{icon}</span>
                </div>
                <h3 className="feature-title">{title}</h3>
                <p className="feature-description">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ background: 'var(--gradient-glow)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              Ready to Get Started?
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Join thousands of developers building the next generation of robotics.
            </p>
            <Link to="/register" className="btn btn-accent btn-lg">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
