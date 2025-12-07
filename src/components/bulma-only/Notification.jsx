import { useState, useCallback, createContext, useContext } from 'react'

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])

  const addNotification = useCallback(({ title, description, type = 'info', duration = 5000 }) => {
    const id = Date.now()
    setNotifications((prev) => [...prev, { id, title, description, type, duration }])

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }
    return id
  }, [])

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
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
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      <div className="notification-container">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification ${getTypeClass(notification.type)}`}
          >
            <button
              className="delete"
              onClick={() => removeNotification(notification.id)}
            />
            {notification.title && (
              <p className="has-text-weight-bold">{notification.title}</p>
            )}
            {notification.description && <p>{notification.description}</p>}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}
