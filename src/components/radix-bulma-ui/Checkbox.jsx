import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { forwardRef } from 'react'

export const Checkbox = forwardRef(function Checkbox(
  { label, error, className = '', id, checked, onCheckedChange, ...props },
  ref
) {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={`field ${className}`}>
      <div className="control checkbox-control">
        <RadixCheckbox.Root
          ref={ref}
          className={`checkbox-root ${error ? 'is-danger' : ''}`}
          id={checkboxId}
          checked={checked}
          onCheckedChange={onCheckedChange}
          {...props}
        >
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
      {error && <p className="help is-danger">{error}</p>}
    </div>
  )
})
