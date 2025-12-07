import * as RadixPopover from '@radix-ui/react-popover'

export function Popover({ children, ...props }) {
  return <RadixPopover.Root {...props}>{children}</RadixPopover.Root>
}

export function PopoverTrigger({ children, variant = 'info', light = true, size, className = '', ...props }) {
  const variantClass = variant ? `is-${variant}` : ''
  const lightClass = light ? 'is-light' : ''
  const sizeClass = size ? `is-${size}` : ''
  return (
    <RadixPopover.Trigger asChild {...props}>
      <button className={`button ${variantClass} ${lightClass} ${sizeClass} ${className}`.trim()}>{children}</button>
    </RadixPopover.Trigger>
  )
}

export function PopoverContent({ children, className = '', ...props }) {
  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        className={`box ${className}`}
        sideOffset={5}
        {...props}
      >
        {children}
        <RadixPopover.Arrow className="popover-arrow" />
      </RadixPopover.Content>
    </RadixPopover.Portal>
  )
}

export function PopoverClose({ children, className = '', ...props }) {
  return (
    <RadixPopover.Close asChild {...props}>
      <button className={`delete is-small ${className}`} aria-label="close" />
    </RadixPopover.Close>
  )
}

Popover.Trigger = PopoverTrigger
Popover.Content = PopoverContent
Popover.Close = PopoverClose
