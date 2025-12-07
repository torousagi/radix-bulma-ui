import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { forwardRef, useId } from 'react'

export const RadioGroup = forwardRef(function RadioGroup(
  { label, error, children, className = '', ...props },
  ref
) {
  const generatedId = useId()
  const groupId = `radiogroup-${generatedId}`
  const errorId = error ? `radiogroup-error-${generatedId}` : undefined

  return (
    <div className={`field ${className}`}>
      {label && <label className="label" id={groupId}>{label}</label>}
      <RadixRadioGroup.Root
        ref={ref}
        className="control radio-group"
        aria-labelledby={label ? groupId : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        {...props}
      >
        {children}
      </RadixRadioGroup.Root>
      {error && <p id={errorId} className="help is-danger" role="alert">{error}</p>}
    </div>
  )
})

export function RadioGroupItem({ label, value, className = '', id, ...props }) {
  const generatedId = useId()
  const radioId = id || `radio-${generatedId}`

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
