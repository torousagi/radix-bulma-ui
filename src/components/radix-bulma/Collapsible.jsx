import * as RadixCollapsible from '@radix-ui/react-collapsible'

export function Collapsible({ children, className = '', ...props }) {
  return (
    <RadixCollapsible.Root className={`card ${className}`} {...props}>
      {children}
    </RadixCollapsible.Root>
  )
}

export function CollapsibleTrigger({ children, className = '', ...props }) {
  return (
    <RadixCollapsible.Trigger
      className={`card-header collapsible-trigger ${className}`}
      {...props}
    >
      <p className="card-header-title">{children}</p>
      <span className="card-header-icon collapsible-icon">
        <span className="icon">▼</span>
      </span>
    </RadixCollapsible.Trigger>
  )
}

export function CollapsibleContent({ children, className = '', ...props }) {
  return (
    <RadixCollapsible.Content className={`collapsible-content ${className}`} {...props}>
      <div className="card-content">
        <div className="content">{children}</div>
      </div>
    </RadixCollapsible.Content>
  )
}

Collapsible.Trigger = CollapsibleTrigger
Collapsible.Content = CollapsibleContent
