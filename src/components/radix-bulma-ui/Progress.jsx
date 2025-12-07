import * as RadixProgress from '@radix-ui/react-progress'

export function Progress({
  value = 0,
  max = 100,
  className = '',
  color = 'is-primary',
  size = '',
  ...props
}) {
  const percentage = (value / max) * 100

  return (
    <RadixProgress.Root
      className={`progress-root ${className}`}
      value={value}
      max={max}
      {...props}
    >
      <RadixProgress.Indicator
        className={`progress-indicator ${color} ${size}`}
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </RadixProgress.Root>
  )
}
