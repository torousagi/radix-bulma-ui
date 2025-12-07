import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { forwardRef } from 'react'

export const RadioGroup = forwardRef(function RadioGroup(
  { label, error, children, className = '', ...props },
  ref
) {
  return (
    <div className={`field ${className}`}>
      {label && <label className="label">{label}</label>}
      <RadixRadioGroup.Root ref={ref} className="control radio-group" {...props}>
        {children}
      </RadixRadioGroup.Root>
      {error && <p className="help is-danger">{error}</p>}
    </div>
  )
})

export function RadioGroupItem({ label, value, className = '', id, ...props }) {
  const radioId = id || `radio-${value}-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={`radio-item ${className}`}>
      <RadixRadioGroup.Item className="radio-root" value={value} id={radioId} {...props}>
        <RadixRadioGroup.Indicator className="radio-indicator" />
      </RadixRadioGroup.Item>
      {label && (
        <label className="radio-label" htmlFor={radioId}>
          {label}
        </label>
      )}
    </div>
  )
}

RadioGroup.Item = RadioGroupItem
