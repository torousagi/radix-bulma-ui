import { forwardRef } from 'react'
import { FormField } from './FormField'

export const Input = forwardRef(function Input(
  { label, error, type = 'text', className = '', ...props },
  ref
) {
  return (
    <FormField label={label} error={error}>
      <input
        ref={ref}
        type={type}
        className={`input ${error ? 'is-danger' : ''} ${className}`}
        {...props}
      />
    </FormField>
  )
})
