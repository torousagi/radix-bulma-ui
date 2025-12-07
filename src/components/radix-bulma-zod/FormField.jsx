// 共通のフォームフィールドラッパー（エラー表示付き）
export function FormField({ label, error, children, className = '' }) {
  return (
    <div className={`field ${className}`}>
      {label && <label className="label">{label}</label>}
      <div className="control">{children}</div>
      {error && <p className="help is-danger">{error}</p>}
    </div>
  )
}
