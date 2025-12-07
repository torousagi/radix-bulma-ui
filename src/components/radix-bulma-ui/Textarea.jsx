import { forwardRef } from 'react'
import { FormField } from './FormField'

export const Textarea = forwardRef(function Textarea(
  { label, error, className = '', ...props },
  ref
) {
  return (
    <FormField label={label} error={error}>
      <textarea
        ref={ref}
        className={`textarea ${error ? 'is-danger' : ''} ${className}`}
        {...props}
      />
    </FormField>
  )
})
