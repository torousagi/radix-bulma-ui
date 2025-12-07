import { useState } from 'react'

export function ContactForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    priority: 'medium',
    message: '',
    contactMethod: 'email',
    phoneNumber: '',
  })
  const [attachments, setAttachments] = useState([])
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = () => {
    const newErrors = {}

    // 名前のバリデーション
    if (!formData.name) {
      newErrors.name = '名前は必須です'
    }

    // メールアドレスのバリデーション
    if (!formData.email) {
      newErrors.email = 'メールアドレスは必須です'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください'
    }

    // カテゴリのバリデーション
    if (!formData.category) {
      newErrors.category = 'カテゴリを選択してください'
    }

    // メッセージのバリデーション
    if (!formData.message) {
      newErrors.message = 'メッセージは必須です'
    } else if (formData.message.length < 10) {
      newErrors.message = 'メッセージは10文字以上で入力してください'
    } else if (formData.message.length > 1000) {
      newErrors.message = 'メッセージは1000文字以内で入力してください'
    }

    // 電話番号のバリデーション（電話を選択した場合）
    if (formData.contactMethod === 'phone') {
      if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
        newErrors.phoneNumber = '電話番号は10桁以上で入力してください'
      }
    }

    // 添付ファイルのバリデーション
    const attachmentErrors = []
    attachments.forEach((attachment, index) => {
      const attError = {}
      if (!attachment.name) {
        attError.name = 'ファイル名は必須です'
      }
      if (!attachment.url) {
        attError.url = 'URLは必須です'
      } else if (!/^https?:\/\/.+/.test(attachment.url)) {
        attError.url = '有効なURLを入力してください'
      }
      if (Object.keys(attError).length > 0) {
        attachmentErrors[index] = attError
      }
    })
    if (attachmentErrors.length > 0) {
      newErrors.attachments = attachmentErrors
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleAttachmentChange = (index, field, value) => {
    setAttachments((prev) => {
      const newAttachments = [...prev]
      newAttachments[index] = { ...newAttachments[index], [field]: value }
      return newAttachments
    })
    // エラーをクリア
    if (errors.attachments?.[index]?.[field]) {
      setErrors((prev) => {
        const newAttachmentErrors = [...(prev.attachments || [])]
        if (newAttachmentErrors[index]) {
          newAttachmentErrors[index] = { ...newAttachmentErrors[index], [field]: undefined }
        }
        return { ...prev, attachments: newAttachmentErrors }
      })
    }
  }

  const addAttachment = () => {
    setAttachments((prev) => [...prev, { name: '', url: '' }])
  }

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
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
        attachments: attachments.length > 0 ? attachments : undefined,
      }
      onSubmit?.(submitData)
      alert('送信成功！\n' + JSON.stringify(submitData, null, 2))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">お名前</label>
        <div className="control">
          <input
            className={`input ${errors.name ? 'is-danger' : ''}`}
            type="text"
            name="name"
            placeholder="山田 太郎"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        {errors.name && <p className="help is-danger">{errors.name}</p>}
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
        <label className="label">カテゴリ</label>
        <div className="control">
          <div className="select is-fullwidth">
            <select
              className={errors.category ? 'is-danger' : ''}
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">選択してください</option>
              <option value="general">一般的な質問</option>
              <option value="support">サポート</option>
              <option value="sales">営業</option>
              <option value="other">その他</option>
            </select>
          </div>
        </div>
        {errors.category && <p className="help is-danger">{errors.category}</p>}
      </div>

      <div className="field">
        <label className="label">優先度</label>
        <div className="control">
          <label className="radio">
            <input
              type="radio"
              name="priority"
              value="low"
              checked={formData.priority === 'low'}
              onChange={handleChange}
            />{' '}
            低
          </label>
          <label className="radio">
            <input
              type="radio"
              name="priority"
              value="medium"
              checked={formData.priority === 'medium'}
              onChange={handleChange}
            />{' '}
            中
          </label>
          <label className="radio">
            <input
              type="radio"
              name="priority"
              value="high"
              checked={formData.priority === 'high'}
              onChange={handleChange}
            />{' '}
            高
          </label>
        </div>
      </div>

      <div className="field">
        <label className="label">メッセージ</label>
        <div className="control">
          <textarea
            className={`textarea ${errors.message ? 'is-danger' : ''}`}
            name="message"
            placeholder="お問い合わせ内容を入力してください（10文字以上）"
            rows={4}
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        {errors.message && <p className="help is-danger">{errors.message}</p>}
      </div>

      <div className="field">
        <label className="label">連絡方法</label>
        <div className="control">
          <label className="radio">
            <input
              type="radio"
              name="contactMethod"
              value="email"
              checked={formData.contactMethod === 'email'}
              onChange={handleChange}
            />{' '}
            メール
          </label>
          <label className="radio">
            <input
              type="radio"
              name="contactMethod"
              value="phone"
              checked={formData.contactMethod === 'phone'}
              onChange={handleChange}
            />{' '}
            電話
          </label>
        </div>
      </div>

      {formData.contactMethod === 'phone' && (
        <div className="field">
          <label className="label">電話番号</label>
          <div className="control">
            <input
              className={`input ${errors.phoneNumber ? 'is-danger' : ''}`}
              type="tel"
              name="phoneNumber"
              placeholder="09012345678"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          {errors.phoneNumber && (
            <p className="help is-danger">{errors.phoneNumber}</p>
          )}
        </div>
      )}

      <div className="field">
        <label className="label">添付ファイル（URL）</label>
        {attachments.map((attachment, index) => (
          <div key={index} className="box">
            <div className="field">
              <div className="control">
                <input
                  className={`input ${errors.attachments?.[index]?.name ? 'is-danger' : ''}`}
                  type="text"
                  placeholder="ファイル名"
                  value={attachment.name}
                  onChange={(e) =>
                    handleAttachmentChange(index, 'name', e.target.value)
                  }
                />
              </div>
              {errors.attachments?.[index]?.name && (
                <p className="help is-danger">
                  {errors.attachments[index].name}
                </p>
              )}
            </div>
            <div className="field">
              <div className="control">
                <input
                  className={`input ${errors.attachments?.[index]?.url ? 'is-danger' : ''}`}
                  type="url"
                  placeholder="https://example.com/file.pdf"
                  value={attachment.url}
                  onChange={(e) =>
                    handleAttachmentChange(index, 'url', e.target.value)
                  }
                />
              </div>
              {errors.attachments?.[index]?.url && (
                <p className="help is-danger">{errors.attachments[index].url}</p>
              )}
            </div>
            <button
              type="button"
              className="button is-danger is-small"
              onClick={() => removeAttachment(index)}
            >
              削除
            </button>
          </div>
        ))}
        <button
          type="button"
          className="button is-info is-small"
          onClick={addAttachment}
        >
          + 添付ファイルを追加
        </button>
      </div>

      <div className="field">
        <div className="control">
          <button
            type="submit"
            className={`button is-primary ${isSubmitting ? 'is-loading' : ''}`}
            disabled={isSubmitting}
          >
            送信
          </button>
        </div>
      </div>
    </form>
  )
}
