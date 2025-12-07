import { useState } from 'react'

export function LoginForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = () => {
    const newErrors = {}

    // メールアドレスのバリデーション
    if (!formData.email) {
      newErrors.email = 'メールアドレスは必須です'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください'
    }

    // パスワードのバリデーション
    if (!formData.password) {
      newErrors.password = 'パスワードは必須です'
    } else if (formData.password.length < 8) {
      newErrors.password = 'パスワードは8文字以上で入力してください'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    // フィールド変更時にエラーをクリア
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onSubmit?.(formData)
      alert('ログイン成功！\n' + JSON.stringify(formData, null, 2))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">メールアドレス</label>
        <div className="control">
          <input
            className={`input ${errors.email ? 'is-danger' : ''}`}
            type="email"
            name="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        {errors.email && <p className="help is-danger">{errors.email}</p>}
      </div>

      <div className="field">
        <label className="label">パスワード</label>
        <div className="control">
          <input
            className={`input ${errors.password ? 'is-danger' : ''}`}
            type="password"
            name="password"
            placeholder="8文字以上"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {errors.password && <p className="help is-danger">{errors.password}</p>}
      </div>

      <div className="field">
        <label className="checkbox">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
          />
          {' '}ログイン状態を保持する
        </label>
      </div>

      <div className="field">
        <div className="control">
          <button
            type="submit"
            className={`button is-primary ${isSubmitting ? 'is-loading' : ''}`}
            disabled={isSubmitting}
          >
            ログイン
          </button>
        </div>
      </div>
    </form>
  )
}
