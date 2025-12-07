import * as RadixSwitch from '@radix-ui/react-switch'
import { forwardRef, useId } from 'react'

export const Switch = forwardRef(function Switch(
  { label, error, className = '', id, checked, onCheckedChange, ...props },
  ref
) {
  const generatedId = useId()
  const switchId = id || `switch-${generatedId}`
  const errorId = error ? `switch-error-${generatedId}` : undefined

  return (
    <div className={`field ${className}`}>
      <div className="control switch-control">
        <RadixSwitch.Root
          ref={ref}
          className={`switch-root ${error ? 'is-danger' : ''}`}
          id={switchId}
          checked={checked}
          onCheckedChange={onCheckedChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
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
      {error && <p id={errorId} className="help is-danger" role="alert">{error}</p>}
    </div>
  )
})
