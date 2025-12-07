import * as RadixDialog from '@radix-ui/react-dialog'

export function Dialog({ children, ...props }) {
  return <RadixDialog.Root {...props}>{children}</RadixDialog.Root>
}

export function DialogTrigger({ children, variant = 'primary', size, className = '', ...props }) {
  const variantClass = variant ? `is-${variant}` : ''
  const sizeClass = size ? `is-${size}` : ''
  return (
    <RadixDialog.Trigger asChild {...props}>
      <button className={`button ${variantClass} ${sizeClass} ${className}`.trim()}>{children}</button>
    </RadixDialog.Trigger>
  )
}

export function DialogContent({ children, title, className = '', ...props }) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="modal-background" />
      <RadixDialog.Content className={`modal is-active ${className}`} {...props}>
        <div className="modal-card">
          {title && (
            <header className="modal-card-head">
              <RadixDialog.Title className="modal-card-title">
                {title}
              </RadixDialog.Title>
              <RadixDialog.Close asChild>
                <button className="delete" aria-label="close" />
              </RadixDialog.Close>
            </header>
          )}
          <section className="modal-card-body">{children}</section>
        </div>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  )
}

export function DialogFooter({ children }) {
  return <footer className="modal-card-foot">{children}</footer>
}

export function DialogClose({ children, variant = 'light', size, className = '', ...props }) {
  const variantClass = variant ? `is-${variant}` : ''
  const sizeClass = size ? `is-${size}` : ''
  return (
    <RadixDialog.Close asChild {...props}>
      <button className={`button ${variantClass} ${sizeClass} ${className}`.trim()}>{children}</button>
    </RadixDialog.Close>
  )
}

Dialog.Trigger = DialogTrigger
Dialog.Content = DialogContent
Dialog.Footer = DialogFooter
Dialog.Close = DialogClose
