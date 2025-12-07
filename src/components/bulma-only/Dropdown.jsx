import { useState, useRef, useEffect } from 'react'

export function Dropdown({ children, className = '' }) {
  const [isActive, setIsActive] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsActive(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      className={`dropdown ${isActive ? 'is-active' : ''} ${className}`}
      ref={dropdownRef}
    >
      {children({ isActive, setIsActive, toggle: () => setIsActive(!isActive) })}
    </div>
  )
}

export function DropdownTrigger({ children, onClick, className = '' }) {
  return (
    <div className="dropdown-trigger">
      <button
        className={`button ${className}`}
        aria-haspopup="true"
        onClick={onClick}
      >
        <span>{children}</span>
        <span className="icon is-small">
          <span>▼</span>
        </span>
      </button>
    </div>
  )
}

export function DropdownMenu({ children, className = '' }) {
  return (
    <div className="dropdown-menu" role="menu">
      <div className={`dropdown-content ${className}`}>{children}</div>
    </div>
  )
}

export function DropdownItem({ children, onClick, className = '' }) {
  return (
    <a className={`dropdown-item ${className}`} onClick={onClick}>
      {children}
    </a>
  )
}

export function DropdownDivider() {
  return <hr className="dropdown-divider" />
}
