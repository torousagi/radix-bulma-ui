import { useState } from 'react'

export function Tabs({ children, defaultValue, centered = false, boxed = false, className = '' }) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  const classes = ['tabs', className]
  if (centered) classes.push('is-centered')
  if (boxed) classes.push('is-boxed')

  return (
    <div>
      {children({ activeTab, setActiveTab, tabsClassName: classes.join(' ') })}
    </div>
  )
}

export function TabsList({ children, className }) {
  return (
    <div className={className}>
      <ul>{children}</ul>
    </div>
  )
}

export function TabsTrigger({ children, value, activeTab, onClick, className = '' }) {
  return (
    <li className={activeTab === value ? 'is-active' : ''}>
      <a className={className} onClick={() => onClick(value)}>
        {children}
      </a>
    </li>
  )
}

export function TabsContent({ children, value, activeTab, className = '' }) {
  if (activeTab !== value) return null
  return <div className={`box ${className}`}>{children}</div>
}
