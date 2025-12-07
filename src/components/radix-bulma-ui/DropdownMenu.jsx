import * as RadixDropdown from '@radix-ui/react-dropdown-menu'

export function DropdownMenu({ children, ...props }) {
  return <RadixDropdown.Root {...props}>{children}</RadixDropdown.Root>
}

export function DropdownMenuTrigger({ children, variant = 'light', size, className = '', ...props }) {
  const variantClass = variant ? `is-${variant}` : ''
  const sizeClass = size ? `is-${size}` : ''
  return (
    <RadixDropdown.Trigger asChild {...props}>
      <button className={`button ${variantClass} ${sizeClass} ${className}`.trim()}>
        {children}
        <span className="icon is-small">
          <span>▼</span>
        </span>
      </button>
    </RadixDropdown.Trigger>
  )
}

export function DropdownMenuContent({ children, className = '', ...props }) {
  return (
    <RadixDropdown.Portal>
      <RadixDropdown.Content
        className={`dropdown-content ${className}`}
        sideOffset={5}
        {...props}
      >
        {children}
      </RadixDropdown.Content>
    </RadixDropdown.Portal>
  )
}

export function DropdownMenuItem({ children, className = '', ...props }) {
  return (
    <RadixDropdown.Item className={`dropdown-item ${className}`} {...props}>
      {children}
    </RadixDropdown.Item>
  )
}

export function DropdownMenuSeparator({ className = '', ...props }) {
  return (
    <RadixDropdown.Separator
      className={`dropdown-divider ${className}`}
      {...props}
    />
  )
}

export function DropdownMenuLabel({ children, className = '', ...props }) {
  return (
    <RadixDropdown.Label
      className={`dropdown-item has-text-grey-light ${className}`}
      {...props}
    >
      {children}
    </RadixDropdown.Label>
  )
}

DropdownMenu.Trigger = DropdownMenuTrigger
DropdownMenu.Content = DropdownMenuContent
DropdownMenu.Item = DropdownMenuItem
DropdownMenu.Separator = DropdownMenuSeparator
DropdownMenu.Label = DropdownMenuLabel
