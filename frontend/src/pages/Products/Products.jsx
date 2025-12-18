import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import '../../styles/globals.css'

const Products = () => {
  const products = [
    {
      icon: '🤖',
      name: 'Robot SDK',
      description: 'Complete development kit with motor controllers, sensor integrations, and simulation tools.',
      features: ['Motor Controllers', 'Sensor APIs', 'Simulation Environment', 'Hardware Abstraction'],
      price: '$1.6',
    },
    {
      icon: '🧠',
      name: 'AI Engine Pro',
      description: 'Advanced AI models for computer vision, navigation, and autonomous decision-making.',
      features: ['Object Detection', 'Path Planning', 'Voice Recognition', 'Gesture Control'],
      price: '$1.6',
    },
    {
      icon: '🔗',
      name: 'Blockchain Suite',
      description: 'Secure licensing and ownership verification through smart contracts.',
      features: ['Smart Contracts', 'NFT Licensing', 'Secure Authentication', 'Audit Trail'],
      price: '$1.6',
    },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>
      <Navbar />
      
      <section className="hero" style={{ minHeight: '50vh' }}>
        <div className="hero-bg" />
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <h1 className="hero-title">Our <span className="text-gradient">Products</span></h1>
            <p className="hero-subtitle" style={{ margin: '0 auto' }}>
              Everything you need to build, deploy, and scale your robotics projects.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {products.map(({ icon, name, description, features, price }) => (
              <div key={name} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon}</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{name}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>{description}</p>
                <ul style={{ listStyle: 'none', marginBottom: '1.5rem' }}>
                  {features.map((feature) => (
                    <li key={feature} style={{ 
                      padding: '0.5rem 0', 
                      borderBottom: '1px solid var(--border-color)',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{ color: 'var(--color-accent)' }}>✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-accent)' }}>{price}</span>
                  <Link to="/pricing" className="btn btn-primary">Get Started</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Products
