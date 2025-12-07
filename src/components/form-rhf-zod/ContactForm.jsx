import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1, '名前は必須です'),
  email: z
    .string()
    .min(1, 'メールアドレスは必須です')
    .email('有効なメールアドレスを入力してください'),
  category: z.enum(['general', 'support', 'sales', 'other'], {
    errorMap: () => ({ message: 'カテゴリを選択してください' }),
  }),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  message: z
    .string()
    .min(1, 'メッセージは必須です')
    .min(10, 'メッセージは10文字以上で入力してください')
    .max(1000, 'メッセージは1000文字以内で入力してください'),
  attachments: z
    .array(
      z.object({
        name: z.string().min(1, 'ファイル名は必須です'),
        url: z.string().min(1, 'URLは必須です').url('有効なURLを入力してください'),
      })
    )
    .optional(),
  contactMethod: z.enum(['email', 'phone']).default('email'),
  phoneNumber: z.string().optional(),
}).refine(
  (data) => {
    if (data.contactMethod === 'phone') {
      return data.phoneNumber && data.phoneNumber.length >= 10
    }
    return true
  },
  {
    message: '電話番号は10桁以上で入力してください',
    path: ['phoneNumber'],
  }
)

export function ContactForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      category: undefined,
      priority: 'medium',
      message: '',
      attachments: [],
      contactMethod: 'email',
      phoneNumber: '',
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'attachments',
  })

  const contactMethod = watch('contactMethod')

  const handleFormSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onSubmit?.(data)
    alert('送信成功！\n' + JSON.stringify(data, null, 2))
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="field">
        <label className="label">お名前</label>
        <div className="control">
          <input
            className={`input ${errors.name ? 'is-danger' : ''}`}
            type="text"
            placeholder="山田 太郎"
            {...register('name')}
          />
        </div>
        {errors.name && <p className="help is-danger">{errors.name.message}</p>}
      </div>

      <div className="field">
        <label className="label">メールアドレス</label>
        <div className="control">
          <input
            className={`input ${errors.email ? 'is-danger' : ''}`}
            type="email"
            placeholder="example@email.com"
            {...register('email')}
          />
        </div>
        {errors.email && (
          <p className="help is-danger">{errors.email.message}</p>
        )}
      </div>

      <div className="field">
        <label className="label">カテゴリ</label>
        <div className="control">
          <div className="select is-fullwidth">
            <select
              className={errors.category ? 'is-danger' : ''}
              {...register('category')}
            >
              <option value="">選択してください</option>
              <option value="general">一般的な質問</option>
              <option value="support">サポート</option>
              <option value="sales">営業</option>
              <option value="other">その他</option>
            </select>
          </div>
        </div>
        {errors.category && (
          <p className="help is-danger">{errors.category.message}</p>
        )}
      </div>

      <div className="field">
        <label className="label">優先度</label>
        <div className="control">
          <label className="radio">
            <input type="radio" value="low" {...register('priority')} /> 低
          </label>
          <label className="radio">
            <input type="radio" value="medium" {...register('priority')} /> 中
          </label>
          <label className="radio">
            <input type="radio" value="high" {...register('priority')} /> 高
          </label>
        </div>
        {errors.priority && (
          <p className="help is-danger">{errors.priority.message}</p>
        )}
      </div>

      <div className="field">
        <label className="label">メッセージ</label>
        <div className="control">
          <textarea
            className={`textarea ${errors.message ? 'is-danger' : ''}`}
            placeholder="お問い合わせ内容を入力してください（10文字以上）"
            rows={4}
            {...register('message')}
          />
        </div>
        {errors.message && (
          <p className="help is-danger">{errors.message.message}</p>
        )}
      </div>

      <div className="field">
        <label className="label">連絡方法</label>
        <div className="control">
          <label className="radio">
            <input type="radio" value="email" {...register('contactMethod')} />{' '}
            メール
          </label>
          <label className="radio">
            <input type="radio" value="phone" {...register('contactMethod')} />{' '}
            電話
          </label>
        </div>
      </div>

      {contactMethod === 'phone' && (
        <div className="field">
          <label className="label">電話番号</label>
          <div className="control">
            <input
              className={`input ${errors.phoneNumber ? 'is-danger' : ''}`}
              type="tel"
              placeholder="09012345678"
              {...register('phoneNumber')}
            />
          </div>
          {errors.phoneNumber && (
            <p className="help is-danger">{errors.phoneNumber.message}</p>
          )}
        </div>
      )}

      <div className="field">
        <label className="label">添付ファイル（URL）</label>
        {fields.map((field, index) => (
          <div key={field.id} className="box">
            <div className="field">
              <div className="control">
                <input
                  className={`input ${errors.attachments?.[index]?.name ? 'is-danger' : ''}`}
                  type="text"
                  placeholder="ファイル名"
                  {...register(`attachments.${index}.name`)}
                />
              </div>
              {errors.attachments?.[index]?.name && (
                <p className="help is-danger">
                  {errors.attachments[index].name.message}
                </p>
              )}
            </div>
            <div className="field">
              <div className="control">
                <input
                  className={`input ${errors.attachments?.[index]?.url ? 'is-danger' : ''}`}
                  type="url"
                  placeholder="https://example.com/file.pdf"
                  {...register(`attachments.${index}.url`)}
                />
              </div>
              {errors.attachments?.[index]?.url && (
                <p className="help is-danger">
                  {errors.attachments[index].url.message}
                </p>
              )}
            </div>
            <button
              type="button"
              className="button is-danger is-small"
              onClick={() => remove(index)}
            >
              削除
            </button>
          </div>
        ))}
        <button
          type="button"
          className="button is-info is-small"
          onClick={() => append({ name: '', url: '' })}
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
