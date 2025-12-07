import * as RadixSelect from '@radix-ui/react-select'

export function Select({ children, placeholder = '選択してください', ...props }) {
  return (
    <RadixSelect.Root {...props}>
      <RadixSelect.Trigger className="button select-trigger">
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon className="icon is-small">
          <span>▼</span>
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className="dropdown-content select-content" position="popper" sideOffset={5}>
          <RadixSelect.ScrollUpButton className="select-scroll-button">
            ▲
          </RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport>{children}</RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className="select-scroll-button">
            ▼
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}

export function SelectGroup({ children, label, ...props }) {
  return (
    <RadixSelect.Group {...props}>
      {label && (
        <RadixSelect.Label className="dropdown-item has-text-grey-light">
          {label}
        </RadixSelect.Label>
      )}
      {children}
    </RadixSelect.Group>
  )
}

export function SelectItem({ children, className = '', ...props }) {
  return (
    <RadixSelect.Item className={`dropdown-item ${className}`} {...props}>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className="select-indicator">
        ✓
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  )
}

export function SelectSeparator({ className = '', ...props }) {
  return (
    <RadixSelect.Separator
      className={`dropdown-divider ${className}`}
      {...props}
    />
  )
}

Select.Group = SelectGroup
Select.Item = SelectItem
Select.Separator = SelectSeparator
