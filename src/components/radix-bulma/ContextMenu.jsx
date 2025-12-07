import * as RadixContextMenu from '@radix-ui/react-context-menu'

export function ContextMenu({ children, ...props }) {
  return <RadixContextMenu.Root {...props}>{children}</RadixContextMenu.Root>
}

export function ContextMenuTrigger({ children, className = '', ...props }) {
  return (
    <RadixContextMenu.Trigger className={className} {...props}>
      {children}
    </RadixContextMenu.Trigger>
  )
}

export function ContextMenuContent({ children, className = '', ...props }) {
  return (
    <RadixContextMenu.Portal>
      <RadixContextMenu.Content
        className={`dropdown-content context-menu-content ${className}`}
        {...props}
      >
        {children}
      </RadixContextMenu.Content>
    </RadixContextMenu.Portal>
  )
}

export function ContextMenuItem({ children, className = '', ...props }) {
  return (
    <RadixContextMenu.Item className={`dropdown-item ${className}`} {...props}>
      {children}
    </RadixContextMenu.Item>
  )
}

export function ContextMenuSeparator({ className = '', ...props }) {
  return (
    <RadixContextMenu.Separator className={`dropdown-divider ${className}`} {...props} />
  )
}

export function ContextMenuLabel({ children, className = '', ...props }) {
  return (
    <RadixContextMenu.Label className={`dropdown-item has-text-grey-light ${className}`} {...props}>
      {children}
    </RadixContextMenu.Label>
  )
}

export function ContextMenuSub({ children, ...props }) {
  return <RadixContextMenu.Sub {...props}>{children}</RadixContextMenu.Sub>
}

export function ContextMenuSubTrigger({ children, className = '', ...props }) {
  return (
    <RadixContextMenu.SubTrigger className={`dropdown-item context-menu-subtrigger ${className}`} {...props}>
      {children}
      <span className="icon is-small ml-auto">▶</span>
    </RadixContextMenu.SubTrigger>
  )
}

export function ContextMenuSubContent({ children, className = '', ...props }) {
  return (
    <RadixContextMenu.Portal>
      <RadixContextMenu.SubContent
        className={`dropdown-content context-menu-content ${className}`}
        {...props}
      >
        {children}
      </RadixContextMenu.SubContent>
    </RadixContextMenu.Portal>
  )
}

ContextMenu.Trigger = ContextMenuTrigger
ContextMenu.Content = ContextMenuContent
ContextMenu.Item = ContextMenuItem
ContextMenu.Separator = ContextMenuSeparator
ContextMenu.Label = ContextMenuLabel
ContextMenu.Sub = ContextMenuSub
ContextMenu.SubTrigger = ContextMenuSubTrigger
ContextMenu.SubContent = ContextMenuSubContent
