import { useState } from 'react'

export function Navbar({ children, className = '', color = '' }) {
  const [isActive, setIsActive] = useState(false)

  return (
    <nav className={`navbar ${color} ${className}`} role="navigation" aria-label="main navigation">
      {children({ isActive, toggleMenu: () => setIsActive(!isActive) })}
    </nav>
  )
}

export function NavbarBrand({ children, onToggle, isActive }) {
  return (
    <div className="navbar-brand">
      {children}
      <a
        role="button"
        className={`navbar-burger ${isActive ? 'is-active' : ''}`}
        aria-label="menu"
        aria-expanded={isActive}
        onClick={onToggle}
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
  )
}

export function NavbarMenu({ children, isActive }) {
  return (
    <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
      {children}
    </div>
  )
}

export function NavbarStart({ children }) {
  return <div className="navbar-start">{children}</div>
}

export function NavbarEnd({ children }) {
  return <div className="navbar-end">{children}</div>
}

export function NavbarItem({ children, href, hasDropdown = false, isHoverable = false, className = '' }) {
  if (hasDropdown) {
    return (
      <div className={`navbar-item has-dropdown ${isHoverable ? 'is-hoverable' : ''} ${className}`}>
        {children}
      </div>
    )
  }

  if (href) {
    return (
      <a className={`navbar-item ${className}`} href={href}>
        {children}
      </a>
    )
  }

  return <div className={`navbar-item ${className}`}>{children}</div>
}

export function NavbarLink({ children, className = '' }) {
  return <a className={`navbar-link ${className}`}>{children}</a>
}

export function NavbarDropdown({ children, className = '' }) {
  return <div className={`navbar-dropdown ${className}`}>{children}</div>
}

export function NavbarDivider() {
  return <hr className="navbar-divider" />
}
