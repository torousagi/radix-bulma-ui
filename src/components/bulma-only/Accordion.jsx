import { useState } from 'react'

export function Accordion({ children, type = 'single', defaultValue, className = '' }) {
  const [openItems, setOpenItems] = useState(
    defaultValue ? (Array.isArray(defaultValue) ? defaultValue : [defaultValue]) : []
  )

  const toggleItem = (value) => {
    if (type === 'single') {
      setOpenItems(openItems.includes(value) ? [] : [value])
    } else {
      setOpenItems(
        openItems.includes(value)
          ? openItems.filter((v) => v !== value)
          : [...openItems, value]
      )
    }
  }

  return (
    <div className={`accordion ${className}`}>
      {children({ openItems, toggleItem })}
    </div>
  )
}

export function AccordionItem({ children, value, isOpen, onToggle, className = '' }) {
  return (
    <div className={`card accordion-item ${className}`}>
      {children({ isOpen, onToggle: () => onToggle(value) })}
    </div>
  )
}

export function AccordionTrigger({ children, isOpen, onClick, className = '' }) {
  return (
    <header className={`card-header accordion-trigger ${className}`} onClick={onClick}>
      <p className="card-header-title">{children}</p>
      <span className="card-header-icon">
        <span className="icon" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          ▼
        </span>
      </span>
    </header>
  )
}

export function AccordionContent({ children, isOpen, className = '' }) {
  if (!isOpen) return null
  return (
    <div className={`card-content ${className}`}>
      <div className="content">{children}</div>
    </div>
  )
}
