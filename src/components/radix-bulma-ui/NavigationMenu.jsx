import * as RadixNavigationMenu from '@radix-ui/react-navigation-menu'

export function NavigationMenu({ children, className = '', ...props }) {
  return (
    <RadixNavigationMenu.Root className={`navbar ${className}`} {...props}>
      {children}
    </RadixNavigationMenu.Root>
  )
}

export function NavigationMenuList({ children, className = '', ...props }) {
  return (
    <RadixNavigationMenu.List className={`navbar-start ${className}`} {...props}>
      {children}
    </RadixNavigationMenu.List>
  )
}

export function NavigationMenuItem({ children, className = '', ...props }) {
  return (
    <RadixNavigationMenu.Item className={`navbar-item has-dropdown is-hoverable ${className}`} {...props}>
      {children}
    </RadixNavigationMenu.Item>
  )
}

export function NavigationMenuTrigger({ children, className = '', ...props }) {
  return (
    <RadixNavigationMenu.Trigger className={`navbar-link ${className}`} {...props}>
      {children}
    </RadixNavigationMenu.Trigger>
  )
}

export function NavigationMenuContent({ children, className = '', ...props }) {
  return (
    <RadixNavigationMenu.Content className={`navbar-dropdown ${className}`} {...props}>
      {children}
    </RadixNavigationMenu.Content>
  )
}

export function NavigationMenuLink({ children, href, className = '', ...props }) {
  return (
    <RadixNavigationMenu.Link href={href} className={`navbar-item ${className}`} {...props}>
      {children}
    </RadixNavigationMenu.Link>
  )
}

export function NavigationMenuViewport({ className = '', ...props }) {
  return (
    <RadixNavigationMenu.Viewport className={`navigation-viewport ${className}`} {...props} />
  )
}

NavigationMenu.List = NavigationMenuList
NavigationMenu.Item = NavigationMenuItem
NavigationMenu.Trigger = NavigationMenuTrigger
NavigationMenu.Content = NavigationMenuContent
NavigationMenu.Link = NavigationMenuLink
NavigationMenu.Viewport = NavigationMenuViewport
