import { useState } from 'react'

export function RegistrationForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    agreeTerms: false,
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = () => {
    const newErrors = {}

    // ユーザー名のバリデーション
    if (!formData.username) {
      newErrors.username = 'ユーザー名は必須です'
    } else if (formData.username.length < 3) {
      newErrors.username = 'ユーザー名は3文字以上で入力してください'
    } else if (formData.username.length > 20) {
      newErrors.username = 'ユーザー名は20文字以内で入力してください'
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'ユーザー名は英数字とアンダースコアのみ使用できます'
    }

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
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'パスワードには大文字を含めてください'
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = 'パスワードには小文字を含めてください'
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'パスワードには数字を含めてください'
    }

    // パスワード確認のバリデーション
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'パスワード確認は必須です'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'パスワードが一致しません'
    }

    // 年齢のバリデーション
    if (!formData.age) {
      newErrors.age = '年齢は必須です'
    } else {
      const ageNum = parseInt(formData.age, 10)
      if (isNaN(ageNum) || ageNum < 18) {
        newErrors.age = '18歳以上である必要があります'
      } else if (ageNum > 120) {
        newErrors.age = '有効な年齢を入力してください'
      }
    }

    // 性別のバリデーション
    if (!formData.gender) {
      newErrors.gender = '性別を選択してください'
    }

    // 利用規約のバリデーション
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = '利用規約に同意してください'
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
      const submitData = {
        ...formData,
        age: parseInt(formData.age, 10),
      }
      onSubmit?.(submitData)
      alert('登録成功！\n' + JSON.stringify(submitData, null, 2))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">ユーザー名</label>
        <div className="control">
          <input
            className={`input ${errors.username ? 'is-danger' : ''}`}
            type="text"
            name="username"
            placeholder="user_name123"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        {errors.username && <p className="help is-danger">{errors.username}</p>}
      </div>

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
            placeholder="大文字・小文字・数字を含む8文字以上"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {errors.password && <p className="help is-danger">{errors.password}</p>}
      </div>

      <div className="field">
        <label className="label">パスワード確認</label>
        <div className="control">
          <input
            className={`input ${errors.confirmPassword ? 'is-danger' : ''}`}
            type="password"
            name="confirmPassword"
            placeholder="パスワードを再入力"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {errors.confirmPassword && (
          <p className="help is-danger">{errors.confirmPassword}</p>
        )}
      </div>

      <div className="field">
        <label className="label">年齢</label>
        <div className="control">
          <input
            className={`input ${errors.age ? 'is-danger' : ''}`}
            type="number"
            name="age"
            placeholder="18"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        {errors.age && <p className="help is-danger">{errors.age}</p>}
      </div>

      <div className="field">
        <label className="label">性別</label>
        <div className="control">
          <div className="select is-fullwidth">
            <select
              className={errors.gender ? 'is-danger' : ''}
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">選択してください</option>
              <option value="male">男性</option>
              <option value="female">女性</option>
              <option value="other">その他</option>
              <option value="prefer-not-to-say">回答しない</option>
            </select>
          </div>
        </div>
        {errors.gender && <p className="help is-danger">{errors.gender}</p>}
      </div>

      <div className="field">
        <label className="checkbox">
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
          />
          {' '}<a href="#">利用規約</a>に同意する
        </label>
        {errors.agreeTerms && (
          <p className="help is-danger">{errors.agreeTerms}</p>
        )}
      </div>

      <div className="field">
        <div className="control">
          <button
            type="submit"
            className={`button is-success ${isSubmitting ? 'is-loading' : ''}`}
            disabled={isSubmitting}
          >
            登録
          </button>
        </div>
      </div>
    </form>
  )
}
