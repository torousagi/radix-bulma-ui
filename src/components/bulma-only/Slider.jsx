export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  className = '',
  color = '',
  size = '',
  ...props
}) {
  return (
    <input
      type="range"
      className={`slider ${color} ${size} ${className}`}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      min={min}
      max={max}
      step={step}
      {...props}
    />
  )
}
