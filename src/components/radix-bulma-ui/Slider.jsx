import * as RadixSlider from '@radix-ui/react-slider'
import { forwardRef } from 'react'

export const Slider = forwardRef(function Slider(
  {
    label,
    error,
    className = '',
    value,
    defaultValue = [50],
    max = 100,
    min = 0,
    step = 1,
    onValueChange,
    ...props
  },
  ref
) {
  const currentValue = value || defaultValue

  return (
    <div className={`field ${className}`}>
      {label && <label className="label">{label}</label>}
      <div className="control">
        <RadixSlider.Root
          ref={ref}
          className={`slider-root ${error ? 'is-danger' : ''}`}
          value={value}
          defaultValue={defaultValue}
          max={max}
          min={min}
          step={step}
          onValueChange={onValueChange}
          {...props}
        >
          <RadixSlider.Track className="slider-track">
            <RadixSlider.Range className="slider-range" />
          </RadixSlider.Track>
          {currentValue.map((_, i) => (
            <RadixSlider.Thumb key={i} className="slider-thumb" />
          ))}
        </RadixSlider.Root>
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </div>
  )
})
