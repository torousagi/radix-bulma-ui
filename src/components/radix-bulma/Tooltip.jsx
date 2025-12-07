import * as RadixTooltip from '@radix-ui/react-tooltip'

export function TooltipProvider({ children, ...props }) {
  return (
    <RadixTooltip.Provider delayDuration={300} {...props}>
      {children}
    </RadixTooltip.Provider>
  )
}

export function Tooltip({ children, content, side = 'top', ...props }) {
  return (
    <RadixTooltip.Root {...props}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          className="tag is-dark tooltip-content"
          side={side}
          sideOffset={5}
        >
          {content}
          <RadixTooltip.Arrow className="tooltip-arrow" />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  )
}

Tooltip.Provider = TooltipProvider
