import * as RadixToast from '@radix-ui/react-toast'
import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback(({ title, description, type = 'info', duration = 5000 }) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, title, description, type, duration }])
    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const getTypeClass = (type) => {
    const types = {
      success: 'is-success',
      error: 'is-danger',
      warning: 'is-warning',
      info: 'is-info',
    }
    return types[type] || 'is-info'
  }

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <RadixToast.Provider swipeDirection="right">
        {children}
        {toasts.map((toast) => (
          <RadixToast.Root
            key={toast.id}
            className={`notification ${getTypeClass(toast.type)} toast-root`}
            duration={toast.duration}
            onOpenChange={(open) => !open && removeToast(toast.id)}
          >
            <div className="toast-content">
              {toast.title && (
                <RadixToast.Title className="has-text-weight-bold">
                  {toast.title}
                </RadixToast.Title>
              )}
              {toast.description && (
                <RadixToast.Description className="toast-description">
                  {toast.description}
                </RadixToast.Description>
              )}
            </div>
            <RadixToast.Close asChild>
              <button className="delete" />
            </RadixToast.Close>
          </RadixToast.Root>
        ))}
        <RadixToast.Viewport className="toast-viewport" />
      </RadixToast.Provider>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export const Toast = {
  Provider: ToastProvider,
  useToast,
}
