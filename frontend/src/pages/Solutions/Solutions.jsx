import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import '../../styles/globals.css'

const Solutions = () => {
  const solutions = [
    {
      icon: '🏭',
      title: 'Industrial Automation',
      description: 'Automate manufacturing processes with precision robotics and AI-powered quality control.',
      useCases: ['Assembly Lines', 'Quality Inspection', 'Material Handling', 'Predictive Maintenance'],
    },
    {
      icon: '🏫',
      title: 'Education',
      description: 'Engage students with hands-on robotics learning and STEM curriculum integration.',
      useCases: ['STEM Programs', 'Coding Classes', 'Competition Robots', 'Research Projects'],
    },
    {
      icon: '🏥',
      title: 'Healthcare',
      description: 'Improve patient care with medical robotics and autonomous assistance systems.',
      useCases: ['Surgical Assistance', 'Patient Monitoring', 'Lab Automation', 'Rehabilitation'],
    },
    {
      icon: '🏠',
      title: 'Smart Home',
      description: 'Create intelligent home automation with seamless IoT integration.',
      useCases: ['Home Assistants', 'Security Systems', 'Cleaning Robots', 'Energy Management'],
    },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>
      <Navbar />
      
      <section className="hero" style={{ minHeight: '50vh' }}>
        <div className="hero-bg" />
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <h1 className="hero-title">Industry <span className="text-gradient">Solutions</span></h1>
            <p className="hero-subtitle" style={{ margin: '0 auto' }}>
              Tailored robotics solutions for every industry and use case.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
            {solutions.map(({ icon, title, description, useCases }) => (
              <div key={title} className="card" style={{ padding: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                  <div style={{ 
                    fontSize: '3rem', 
                    background: 'var(--gradient-glow)', 
                    padding: '1rem',
                    borderRadius: 'var(--radius-lg)'
                  }}>
                    {icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{title}</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {useCases.map((useCase) => (
                        <span key={useCase} style={{
                          padding: '0.25rem 0.75rem',
                          background: 'var(--bg-elevated)',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.875rem',
                          color: 'var(--text-muted)',
                        }}>
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-darker)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Need a Custom Solution?</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Our team can help you build tailored robotics solutions for your specific needs.
            </p>
            <Link to="/register" className="btn btn-accent btn-lg">Contact Us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Solutions
