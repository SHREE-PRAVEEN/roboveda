import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import '../../styles/globals.css'

const AILabs = () => {
  const models = [
    {
      icon: '👁️',
      name: 'Vision AI',
      description: 'Object detection, face recognition, and visual SLAM for navigation.',
      accuracy: '98.5%',
    },
    {
      icon: '🗣️',
      name: 'Speech AI',
      description: 'Natural language understanding and voice command processing.',
      accuracy: '96.2%',
    },
    {
      icon: '🧠',
      name: 'Decision AI',
      description: 'Reinforcement learning for autonomous decision making.',
      accuracy: '94.8%',
    },
    {
      icon: '📍',
      name: 'Navigation AI',
      description: 'Path planning and obstacle avoidance algorithms.',
      accuracy: '99.1%',
    },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>
      <Navbar />
      
      <section className="hero" style={{ minHeight: '50vh' }}>
        <div className="hero-bg" />
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <h1 className="hero-title"><span className="text-gradient">AI</span> Labs</h1>
            <p className="hero-subtitle" style={{ margin: '0 auto' }}>
              Cutting-edge artificial intelligence models trained specifically for robotics applications.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
            {models.map(({ icon, name, description, accuracy }) => (
              <div key={name} className="card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '3rem' }}>{icon}</div>
                  <div style={{
                    background: 'var(--color-accent)',
                    color: 'var(--bg-dark)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                  }}>
                    {accuracy} Accuracy
                  </div>
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{name}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-darker)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Train Your Own Models</h2>
            <p className="section-subtitle">Upload your data and train custom AI models for your specific use case.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link to="/register" className="btn btn-accent btn-lg">Start Training</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AILabs
