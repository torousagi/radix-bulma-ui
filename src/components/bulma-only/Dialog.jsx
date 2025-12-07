import { useState, useEffect, useRef } from 'react'

export function Dialog({ children, open, onOpenChange }) {
  return children({ open, onOpenChange })
}

export function DialogTrigger({ children, onClick, className = '' }) {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

export function DialogContent({ children, title, open, onClose, className = '' }) {
  const contentRef = useRef(null)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && open) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className={`modal is-active ${className}`}>
      <div className="modal-background" onClick={onClose} />
      <div className="modal-card" ref={contentRef} style={{ zIndex: 41 }}>
        {title && (
          <header className="modal-card-head">
            <p className="modal-card-title">{title}</p>
            <button className="delete" aria-label="close" onClick={onClose} />
          </header>
        )}
        <section className="modal-card-body">{children}</section>
      </div>
    </div>
  )
}

export function DialogFooter({ children }) {
  return <footer className="modal-card-foot">{children}</footer>
}

export function useDialog(initialOpen = false) {
  const [open, setOpen] = useState(initialOpen)
  return {
    open,
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false),
    onToggle: () => setOpen((prev) => !prev),
  }
}
