import * as RadixScrollArea from '@radix-ui/react-scroll-area'

export function ScrollArea({ children, className = '', style = {}, ...props }) {
  return (
    <RadixScrollArea.Root className={`scroll-area-root ${className}`} style={style} {...props}>
      <RadixScrollArea.Viewport className="scroll-area-viewport">
        {children}
      </RadixScrollArea.Viewport>
      <RadixScrollArea.Scrollbar className="scroll-area-scrollbar" orientation="vertical">
        <RadixScrollArea.Thumb className="scroll-area-thumb" />
      </RadixScrollArea.Scrollbar>
      <RadixScrollArea.Scrollbar className="scroll-area-scrollbar horizontal" orientation="horizontal">
        <RadixScrollArea.Thumb className="scroll-area-thumb" />
      </RadixScrollArea.Scrollbar>
      <RadixScrollArea.Corner className="scroll-area-corner" />
    </RadixScrollArea.Root>
  )
}
