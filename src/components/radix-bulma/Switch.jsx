import * as RadixSwitch from '@radix-ui/react-switch'

export function Switch({ label, className = '', id, ...props }) {
  const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={`field ${className}`}>
      <div className="control switch-control">
        <RadixSwitch.Root className="switch-root" id={switchId} {...props}>
          <RadixSwitch.Thumb className="switch-thumb" />
        </RadixSwitch.Root>
        {label && (
          <label className="switch-label" htmlFor={switchId}>
            {label}
          </label>
        )}
      </div>
    </div>
  )
}
