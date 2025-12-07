import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { forwardRef, useId } from 'react'

export const Checkbox = forwardRef(function Checkbox(
  { label, error, className = '', id, checked, onCheckedChange, indeterminate, ...props },
  ref
) {
  const generatedId = useId()
  const checkboxId = id || `checkbox-${generatedId}`
  const errorId = error ? `checkbox-error-${generatedId}` : undefined

  // indeterminateの場合は'indeterminate'、それ以外はcheckedをそのまま使用
  const checkboxState = indeterminate ? 'indeterminate' : checked

  return (
    <div className={`field ${className}`}>
      <div className="control checkbox-control">
        <RadixCheckbox.Root
          ref={ref}
          className={`checkbox-root ${error ? 'is-danger' : ''}`}
          id={checkboxId}
          checked={checkboxState}
          onCheckedChange={onCheckedChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          {...props}
        >
          <RadixCheckbox.Indicator className="checkbox-indicator">
            {indeterminate ? '−' : '✓'}
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        {label && (
          <label className="checkbox-label" htmlFor={checkboxId}>
            {label}
          </label>
        )}
      </div>
      {error && <p id={errorId} className="help is-danger" role="alert">{error}</p>}
    </div>
  )
})
