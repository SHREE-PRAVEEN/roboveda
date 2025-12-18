import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import '../../styles/globals.css'

const About = () => {
  const team = [
    { name: 'Alex Chen', role: 'CEO & Founder', avatar: '👨‍💼' },
    { name: 'Sarah Kim', role: 'CTO', avatar: '👩‍💻' },
    { name: 'Mike Johnson', role: 'Head of AI', avatar: '🧑‍🔬' },
    { name: 'Emily Davis', role: 'Head of Blockchain', avatar: '👩‍🔧' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>
      <Navbar />
      
      <section className="hero" style={{ minHeight: '60vh' }}>
        <div className="hero-bg" />
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h1 className="hero-title">About <span className="text-gradient">RoboVeda</span></h1>
            <p className="hero-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
              We're on a mission to democratize robotics by making powerful software 
              accessible to everyone at an affordable price.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Our Story</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.8' }}>
                Founded in 2023, RoboVeda started with a simple idea: robotics software 
                shouldn't cost thousands of dollars. We believe that innovation should be 
                accessible to students, hobbyists, and startups alike.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                Today, we serve over 10,000 developers across 50+ countries, helping them 
                build everything from educational robots to industrial automation systems.
              </p>
            </div>
            <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🤖</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Our Mission</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Empowering the next generation of robotics innovators
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-darker)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">The passionate people behind RoboVeda</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
            {team.map(({ name, role, avatar }) => (
              <div key={name} className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{avatar}</div>
                <h4 style={{ marginBottom: '0.25rem' }}>{name}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default About
