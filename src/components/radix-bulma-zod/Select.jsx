import * as RadixSelect from '@radix-ui/react-select'
import { forwardRef } from 'react'
import { FormField } from './FormField'

export const Select = forwardRef(function Select(
  { label, error, placeholder = '選択してください', children, className = '', ...props },
  ref
) {
  return (
    <FormField label={label} error={error} className={className}>
      <RadixSelect.Root {...props}>
        <RadixSelect.Trigger
          ref={ref}
          className={`button select-trigger is-fullwidth ${error ? 'is-danger' : ''}`}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon className="icon is-small">
            <span>▼</span>
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content
            className="dropdown-content select-content"
            position="popper"
            sideOffset={5}
          >
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
    </FormField>
  )
})

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

Select.Item = SelectItem
