import * as RadixToolbar from '@radix-ui/react-toolbar'

export function Toolbar({ children, className = '', ...props }) {
  return (
    <RadixToolbar.Root className={`toolbar-root field has-addons ${className}`} {...props}>
      {children}
    </RadixToolbar.Root>
  )
}

export function ToolbarButton({ children, className = '', ...props }) {
  return (
    <RadixToolbar.Button className={`button ${className}`} {...props}>
      {children}
    </RadixToolbar.Button>
  )
}

export function ToolbarSeparator({ className = '', ...props }) {
  return (
    <RadixToolbar.Separator className={`toolbar-separator ${className}`} {...props} />
  )
}

export function ToolbarLink({ children, href, className = '', ...props }) {
  return (
    <RadixToolbar.Link href={href} className={`button ${className}`} {...props}>
      {children}
    </RadixToolbar.Link>
  )
}

export function ToolbarToggleGroup({ children, className = '', ...props }) {
  return (
    <RadixToolbar.ToggleGroup className={`toolbar-toggle-group ${className}`} {...props}>
      {children}
    </RadixToolbar.ToggleGroup>
  )
}

export function ToolbarToggleItem({ children, value, className = '', ...props }) {
  return (
    <RadixToolbar.ToggleItem value={value} className={`button toolbar-toggle-item ${className}`} {...props}>
      {children}
    </RadixToolbar.ToggleItem>
  )
}

Toolbar.Button = ToolbarButton
Toolbar.Separator = ToolbarSeparator
Toolbar.Link = ToolbarLink
Toolbar.ToggleGroup = ToolbarToggleGroup
Toolbar.ToggleItem = ToolbarToggleItem
