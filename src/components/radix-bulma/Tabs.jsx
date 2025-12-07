import * as RadixTabs from '@radix-ui/react-tabs'

export function Tabs({ children, className = '', ...props }) {
  return (
    <RadixTabs.Root className={className} {...props}>
      {children}
    </RadixTabs.Root>
  )
}

export function TabsList({ children, className = '', centered = false, boxed = false, ...props }) {
  const classes = ['tabs', className]
  if (centered) classes.push('is-centered')
  if (boxed) classes.push('is-boxed')

  return (
    <div className={classes.join(' ')}>
      <RadixTabs.List asChild {...props}>
        <ul>{children}</ul>
      </RadixTabs.List>
    </div>
  )
}

export function TabsTrigger({ children, value, className = '', ...props }) {
  return (
    <RadixTabs.Trigger value={value} asChild {...props}>
      <li className={className}>
        <a>{children}</a>
      </li>
    </RadixTabs.Trigger>
  )
}

export function TabsContent({ children, value, className = '', ...props }) {
  return (
    <RadixTabs.Content value={value} className={`box ${className}`} {...props}>
      {children}
    </RadixTabs.Content>
  )
}

Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent
