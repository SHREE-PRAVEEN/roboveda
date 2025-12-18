import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/globals.css'

const Dashboard = () => {
  const stats = [
    { label: 'Active Robots', value: '12', change: '+2 this week', positive: true, icon: '🤖' },
    { label: 'AI Models', value: '5', change: '+1 new', positive: true, icon: '🧠' },
    { label: 'Total Spent', value: '$24.80', change: '15 licenses', positive: true, icon: '💳' },
    { label: 'API Calls', value: '45.2K', change: '+12% vs last month', positive: true, icon: '📡' },
  ]

  const recentActivity = [
    { action: 'Robot deployed', target: 'Industrial Arm v2', time: '2 hours ago', icon: '🚀' },
    { action: 'AI model trained', target: 'Vision Detection v3', time: '5 hours ago', icon: '🧠' },
    { action: 'License renewed', target: 'Professional Plan', time: '1 day ago', icon: '💳' },
    { action: 'New device added', target: 'Sensor Array #4', time: '2 days ago', icon: '📦' },
  ]

  const devices = [
    { name: 'Industrial Arm', status: 'online', lastSeen: 'Now', battery: 85 },
    { name: 'Delivery Bot', status: 'online', lastSeen: 'Now', battery: 62 },
    { name: 'Warehouse Scanner', status: 'offline', lastSeen: '2h ago', battery: 0 },
    { name: 'Assembly Unit', status: 'busy', lastSeen: 'Now', battery: 94 },
  ]

  return (
    <div style={{ color: 'var(--text-primary)' }}>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <Link to="/dashboard/devices" className="btn btn-accent">
          + Add Device
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map(({ label, value, change, positive, icon }) => (
          <div key={label} className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p className="stat-label">{label}</p>
                <p className="stat-value">{value}</p>
                <p className={`stat-change ${positive ? 'positive' : 'negative'}`}>
                  {positive ? '↑' : '↓'} {change}
                </p>
              </div>
              <span style={{ fontSize: '2rem' }}>{icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
        {/* Devices Table */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Your Devices</h2>
            <Link to="/dashboard/devices" style={{ color: 'var(--color-primary-light)', fontSize: '0.875rem' }}>
              View All →
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {devices.map(({ name, status, lastSeen, battery }) => (
              <div 
                key={name} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '1rem',
                  background: 'var(--bg-elevated)',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🤖</span>
                  <div>
                    <p style={{ fontWeight: '500' }}>{name}</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Last seen: {lastSeen}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {battery > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem' }}>🔋</span>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{battery}%</span>
                    </div>
                  )}
                  <span className={`status-${status}`} style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    background: status === 'online' ? 'rgba(0, 255, 136, 0.1)' : 
                               status === 'busy' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(113, 113, 122, 0.1)',
                  }}>
                    {status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Recent Activity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {recentActivity.map(({ action, target, time, icon }, idx) => (
              <div 
                key={idx}
                style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '1rem',
                  paddingBottom: idx < recentActivity.length - 1 ? '1rem' : 0,
                  borderBottom: idx < recentActivity.length - 1 ? '1px solid var(--border-color)' : 'none',
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>{icon}</span>
                <div>
                  <p style={{ fontWeight: '500', marginBottom: '0.25rem' }}>{action}</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{target}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
