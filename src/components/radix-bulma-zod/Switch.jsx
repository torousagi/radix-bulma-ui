import * as RadixSwitch from '@radix-ui/react-switch'
import { forwardRef } from 'react'

export const Switch = forwardRef(function Switch(
  { label, error, className = '', id, checked, onCheckedChange, ...props },
  ref
) {
  const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={`field ${className}`}>
      <div className="control switch-control">
        <RadixSwitch.Root
          ref={ref}
          className={`switch-root ${error ? 'is-danger' : ''}`}
          id={switchId}
          checked={checked}
          onCheckedChange={onCheckedChange}
          {...props}
        >
          <RadixSwitch.Thumb className="switch-thumb" />
        </RadixSwitch.Root>
        {label && (
          <label className="switch-label" htmlFor={switchId}>
            {label}
          </label>
        )}
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </div>
  )
})
