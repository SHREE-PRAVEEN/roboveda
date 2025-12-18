import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import '../../styles/globals.css'

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$1.6',
      period: '/one-time',
      description: 'Perfect for students and hobbyists',
      features: [
        'Robot SDK Core',
        'Basic AI Models',
        'Community Support',
        '5 Projects',
        'Documentation Access',
      ],
      featured: false,
    },
    {
      name: 'Professional',
      price: '$4.99',
      period: '/month',
      description: 'For serious developers and small teams',
      features: [
        'Everything in Starter',
        'Advanced AI Engine',
        'Blockchain Integration',
        'Priority Support',
        'Unlimited Projects',
        'API Access',
        'Cloud Dashboard',
      ],
      featured: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations',
      features: [
        'Everything in Professional',
        'Custom AI Training',
        'Dedicated Support',
        'SLA Guarantee',
        'On-premise Deployment',
        'Custom Integrations',
        'Training Sessions',
      ],
      featured: false,
    },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>
      <Navbar />
      
      <section className="hero" style={{ minHeight: '40vh' }}>
        <div className="hero-bg" />
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <h1 className="hero-title">Simple, <span className="text-gradient">Affordable</span> Pricing</h1>
            <p className="hero-subtitle" style={{ margin: '0 auto' }}>
              Start building robots today with our unbeatable pricing.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="pricing-grid">
            {plans.map(({ name, price, period, description, features, featured }) => (
              <div 
                key={name} 
                className={`pricing-card ${featured ? 'featured' : ''}`}
                style={featured ? { borderColor: 'var(--color-accent)', transform: 'scale(1.05)' } : {}}
              >
                {featured && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--color-accent)',
                    color: 'var(--bg-dark)',
                    padding: '0.25rem 1rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                  }}>
                    Most Popular
                  </div>
                )}
                <h3 className="pricing-name">{name}</h3>
                <div className="pricing-price">
                  {price}<span>{period}</span>
                </div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{description}</p>
                <ul className="pricing-features">
                  {features.map((feature) => (
                    <li key={feature}>
                      <span style={{ color: 'var(--color-accent)' }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/register" 
                  className={`btn ${featured ? 'btn-accent' : 'btn-outline'}`}
                  style={{ width: '100%' }}
                >
                  {name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Pricing
