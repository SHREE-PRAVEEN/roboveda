import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import '../../styles/globals.css'

const DevPortal = () => {
  const docs = [
    { icon: '📖', title: 'Getting Started', description: 'Quick start guide to set up your development environment', link: '#' },
    { icon: '🔧', title: 'API Reference', description: 'Complete API documentation for all endpoints', link: '#' },
    { icon: '📚', title: 'Tutorials', description: 'Step-by-step tutorials for common use cases', link: '#' },
    { icon: '💡', title: 'Examples', description: 'Sample projects and code snippets', link: '#' },
    { icon: '❓', title: 'FAQ', description: 'Frequently asked questions and answers', link: '#' },
    { icon: '💬', title: 'Community', description: 'Join our developer community for support', link: '#' },
  ]

  const codeExample = `import { Robot } from '@roboveda/sdk';

const robot = new Robot({
  apiKey: 'your-api-key',
  model: 'standard-v2'
});

await robot.connect();
await robot.move({ x: 100, y: 50 });
await robot.rotate(90);

console.log('Robot ready!');`

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>
      <Navbar />
      
      <section className="hero" style={{ minHeight: '40vh' }}>
        <div className="hero-bg" />
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <h1 className="hero-title">Developer <span className="text-gradient">Portal</span></h1>
            <p className="hero-subtitle" style={{ margin: '0 auto' }}>
              Everything you need to build amazing robotics applications.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Quick Start</h2>
              <pre style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                overflow: 'auto',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
              }}>
                <code>{codeExample}</code>
              </pre>
              <div style={{ marginTop: '1.5rem' }}>
                <Link to="/register" className="btn btn-accent">Get Your API Key</Link>
              </div>
            </div>
            <div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Resources</h2>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {docs.slice(0, 4).map(({ icon, title, description }) => (
                  <div key={title} className="card" style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>{icon}</span>
                      <div>
                        <h4 style={{ marginBottom: '0.25rem' }}>{title}</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-darker)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Documentation</h2>
            <p className="section-subtitle">Comprehensive guides and references for all skill levels.</p>
          </div>
          <div className="features-grid">
            {docs.map(({ icon, title, description }) => (
              <div key={title} className="feature-card" style={{ cursor: 'pointer' }}>
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

      <Footer />
    </div>
  )
}

export default DevPortal
