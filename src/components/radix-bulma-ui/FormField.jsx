import { useId, cloneElement, isValidElement } from 'react'

// 共通のフォームフィールドラッパー（エラー表示付き・アクセシビリティ対応）
export function FormField({ label, error, children, className = '' }) {
  const generatedId = useId()
  const inputId = `field-${generatedId}`
  const errorId = error ? `error-${generatedId}` : undefined

  // 子要素にaria属性を自動付与
  const enhancedChildren = isValidElement(children)
    ? cloneElement(children, {
        id: children.props.id || inputId,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': errorId,
      })
    : children

  return (
    <div className={`field ${className}`}>
      {label && <label className="label" htmlFor={inputId}>{label}</label>}
      <div className="control">{enhancedChildren}</div>
      {error && <p id={errorId} className="help is-danger" role="alert">{error}</p>}
    </div>
  )
}
