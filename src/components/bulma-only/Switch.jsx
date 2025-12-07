export function Switch({
  label,
  checked,
  onChange,
  className = '',
  color = '',
  size = '',
  id,
  ...props
}) {
  const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={`field ${className}`}>
      <input
        id={switchId}
        type="checkbox"
        className={`switch ${color} ${size}`}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        {...props}
      />
      <label htmlFor={switchId}>{label}</label>
    </div>
  )
}
