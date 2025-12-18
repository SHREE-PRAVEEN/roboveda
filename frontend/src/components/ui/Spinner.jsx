import React from 'react'
import '../../styles/globals.css'

const Spinner = ({ size = 'md', text = '' }) => {
  const sizes = {
    sm: { width: 24, height: 24, border: 2 },
    md: { width: 48, height: 48, border: 3 },
    lg: { width: 64, height: 64, border: 4 },
  }

  const { width, height, border } = sizes[size] || sizes.md

  return (
    <div className="spinner-container">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div
          className="spinner"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            borderWidth: `${border}px`,
          }}
        />
        {text && <p style={{ color: 'var(--text-muted)' }}>{text}</p>}
      </div>
    </div>
  )
}

export default Spinner
