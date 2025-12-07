import * as RadixCheckbox from '@radix-ui/react-checkbox'

export function Checkbox({ label, className = '', id, ...props }) {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={`field ${className}`}>
      <div className="control checkbox-control">
        <RadixCheckbox.Root className="checkbox-root" id={checkboxId} {...props}>
          <RadixCheckbox.Indicator className="checkbox-indicator">
            ✓
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        {label && (
          <label className="checkbox-label" htmlFor={checkboxId}>
            {label}
          </label>
        )}
      </div>
    </div>
  )
}
