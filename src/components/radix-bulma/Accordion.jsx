import * as RadixAccordion from '@radix-ui/react-accordion'

export function Accordion({ children, className = '', ...props }) {
  return (
    <RadixAccordion.Root className={`accordion ${className}`} {...props}>
      {children}
    </RadixAccordion.Root>
  )
}

export function AccordionItem({ children, value, className = '', ...props }) {
  return (
    <RadixAccordion.Item
      value={value}
      className={`card accordion-item ${className}`}
      {...props}
    >
      {children}
    </RadixAccordion.Item>
  )
}

export function AccordionTrigger({ children, className = '', ...props }) {
  return (
    <RadixAccordion.Header asChild>
      <RadixAccordion.Trigger
        className={`card-header accordion-trigger ${className}`}
        {...props}
      >
        <p className="card-header-title">{children}</p>
        <span className="card-header-icon accordion-icon">
          <span className="icon">▼</span>
        </span>
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
  )
}

export function AccordionContent({ children, className = '', ...props }) {
  return (
    <RadixAccordion.Content className={`accordion-content ${className}`} {...props}>
      <div className="card-content">
        <div className="content">{children}</div>
      </div>
    </RadixAccordion.Content>
  )
}

Accordion.Item = AccordionItem
Accordion.Trigger = AccordionTrigger
Accordion.Content = AccordionContent
