import * as RadixRadioGroup from '@radix-ui/react-radio-group'

export function RadioGroup({ children, className = '', ...props }) {
  return (
    <RadixRadioGroup.Root className={`control radio-group ${className}`} {...props}>
      {children}
    </RadixRadioGroup.Root>
  )
}

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
