export function RadioGroup({ children, name, value, onChange, className = '' }) {
  return (
    <div className={`control ${className}`}>
      {children({ name, value, onChange })}
    </div>
  )
}

export function Radio({ label, value, name, checked, onChange, className = '', disabled = false }) {
  const radioId = `radio-${name}-${value}`

  return (
    <label className={`radio ${className}`} htmlFor={radioId}>
      <input
        type="radio"
        id={radioId}
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        disabled={disabled}
      />
      {' '}{label}
    </label>
  )
}
