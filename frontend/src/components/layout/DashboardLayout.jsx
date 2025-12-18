import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../../styles/globals.css'

const DashboardLayout = ({ children }) => {
  const location = useLocation()

  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: '📊' },
    { path: '/dashboard/devices', label: 'Devices', icon: '🤖' },
    { path: '/dashboard/ai', label: 'AI Models', icon: '🧠' },
    { path: '/dashboard/transactions', label: 'Transactions', icon: '💳' },
    { path: '/dashboard/analytics', label: 'Analytics', icon: '📈' },
    { path: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-logo">
          Robo<span style={{ color: 'var(--color-accent)' }}>Veda</span>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(({ path, label, icon }) => (
            <Link
              key={path}
              to={path}
              className={`sidebar-link ${location.pathname === path ? 'active' : ''}`}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
          <Link to="/dashboard/profile" className="sidebar-link">
            <span>👤</span>
            <span>Profile</span>
          </Link>
          <Link to="/" className="sidebar-link">
            <span>🏠</span>
            <span>Back to Home</span>
          </Link>
        </div>
      </aside>

      <main className="dashboard-main">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
