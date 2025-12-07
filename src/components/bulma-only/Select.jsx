export function Select({ children, value, onChange, placeholder, className = '' }) {
  return (
    <div className={`select ${className}`}>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
    </div>
  )
}

export function SelectOption({ children, value, disabled = false }) {
  return (
    <option value={value} disabled={disabled}>
      {children}
    </option>
  )
}

export function SelectGroup({ children, label }) {
  return <optgroup label={label}>{children}</optgroup>
}
