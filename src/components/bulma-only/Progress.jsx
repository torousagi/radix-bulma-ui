export function Progress({
  value = 0,
  max = 100,
  className = '',
  color = 'is-primary',
  size = '',
}) {
  return (
    <progress
      className={`progress ${color} ${size} ${className}`}
      value={value}
      max={max}
    >
      {Math.round((value / max) * 100)}%
    </progress>
  )
}
