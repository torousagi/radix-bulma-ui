import * as RadixHoverCard from '@radix-ui/react-hover-card'

export function HoverCard({ children, ...props }) {
  return <RadixHoverCard.Root openDelay={200} closeDelay={100} {...props}>{children}</RadixHoverCard.Root>
}

export function HoverCardTrigger({ children, className = '', ...props }) {
  return (
    <RadixHoverCard.Trigger asChild {...props}>
      <span className={`hover-card-trigger ${className}`}>{children}</span>
    </RadixHoverCard.Trigger>
  )
}

export function HoverCardContent({ children, className = '', ...props }) {
  return (
    <RadixHoverCard.Portal>
      <RadixHoverCard.Content
        className={`box hover-card-content ${className}`}
        sideOffset={5}
        {...props}
      >
        {children}
        <RadixHoverCard.Arrow className="hover-card-arrow" />
      </RadixHoverCard.Content>
    </RadixHoverCard.Portal>
  )
}

HoverCard.Trigger = HoverCardTrigger
HoverCard.Content = HoverCardContent
