import * as RadixSlider from '@radix-ui/react-slider'

export function Slider({
  className = '',
  value,
  defaultValue = [50],
  max = 100,
  min = 0,
  step = 1,
  ...props
}) {
  return (
    <RadixSlider.Root
      className={`slider-root ${className}`}
      value={value}
      defaultValue={defaultValue}
      max={max}
      min={min}
      step={step}
      {...props}
    >
      <RadixSlider.Track className="slider-track">
        <RadixSlider.Range className="slider-range" />
      </RadixSlider.Track>
      {(value || defaultValue).map((_, i) => (
        <RadixSlider.Thumb key={i} className="slider-thumb" />
      ))}
    </RadixSlider.Root>
  )
}
