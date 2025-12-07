import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'メールアドレスは必須です')
    .email('有効なメールアドレスを入力してください'),
  password: z
    .string()
    .min(1, 'パスワードは必須です')
    .min(8, 'パスワードは8文字以上で入力してください'),
  rememberMe: z.boolean().optional(),
})

export function LoginForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const handleFormSubmit = async (data) => {
    // 送信シミュレーション
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onSubmit?.(data)
    alert('ログイン成功！\n' + JSON.stringify(data, null, 2))
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
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
        <label className="label">パスワード</label>
        <div className="control">
          <input
            className={`input ${errors.password ? 'is-danger' : ''}`}
            type="password"
            placeholder="8文字以上"
            {...register('password')}
          />
        </div>
        {errors.password && (
          <p className="help is-danger">{errors.password.message}</p>
        )}
      </div>

      <div className="field">
        <label className="checkbox">
          <input type="checkbox" {...register('rememberMe')} />
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
