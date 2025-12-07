export function Checkbox({
  label,
  checked,
  onChange,
  className = '',
  disabled = false,
  id,
  ...props
}) {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={`field ${className}`}>
      <label className="checkbox" htmlFor={checkboxId}>
        <input
          id={checkboxId}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          {...props}
        />
        {' '}{label}
      </label>
    </div>
  )
}
