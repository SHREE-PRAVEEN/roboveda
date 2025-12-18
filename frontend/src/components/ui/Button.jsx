import React from 'react'
import '../../styles/globals.css'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  ...props 
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return 'btn-primary'
      case 'accent':
        return 'btn-accent'
      case 'outline':
        return 'btn-outline'
      case 'ghost':
        return 'btn-ghost'
      default:
        return 'btn-primary'
    }
  }

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'btn-sm'
      case 'lg':
        return 'btn-lg'
      default:
        return ''
    }
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn ${getVariantClass()} ${getSizeClass()} ${className}`}
      style={{
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      {...props}
    >
      {loading ? (
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span 
            style={{
              width: '16px',
              height: '16px',
              border: '2px solid currentColor',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }}
          />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
