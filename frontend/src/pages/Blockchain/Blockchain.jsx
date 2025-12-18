import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import '../../styles/globals.css'

const Blockchain = () => {
  const features = [
    {
      icon: '🔐',
      title: 'Secure Licensing',
      description: 'Protect your software with tamper-proof blockchain-based licenses.',
    },
    {
      icon: '📜',
      title: 'Smart Contracts',
      description: 'Automate licensing agreements with self-executing smart contracts.',
    },
    {
      icon: '🎨',
      title: 'NFT Certificates',
      description: 'Issue unique ownership certificates as NFTs for your robots.',
    },
    {
      icon: '📊',
      title: 'Audit Trail',
      description: 'Complete transparency with immutable transaction history.',
    },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>
      <Navbar />
      
      <section className="hero" style={{ minHeight: '50vh' }}>
        <div className="hero-bg" />
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <h1 className="hero-title"><span className="text-gradient">Blockchain</span> Security</h1>
            <p className="hero-subtitle" style={{ margin: '0 auto' }}>
              Secure your robotics software with next-generation blockchain technology.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
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

      <section className="section" style={{ background: 'var(--bg-darker)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>How It Works</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { step: '1', title: 'Connect Wallet', desc: 'Link your Web3 wallet to our platform' },
                  { step: '2', title: 'Purchase License', desc: 'Buy your software license with crypto or fiat' },
                  { step: '3', title: 'Receive NFT', desc: 'Get your unique license NFT on the blockchain' },
                  { step: '4', title: 'Start Building', desc: 'Access all features with verified ownership' },
                ].map(({ step, title, desc }) => (
                  <div key={step} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'var(--gradient-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      flexShrink: 0,
                    }}>
                      {step}
                    </div>
                    <div>
                      <h4 style={{ marginBottom: '0.25rem' }}>{title}</h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>⛓️</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Ethereum Compatible</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Built on ERC-721 standard for maximum compatibility
              </p>
              <Link to="/register" className="btn btn-accent">Get Started</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Blockchain
