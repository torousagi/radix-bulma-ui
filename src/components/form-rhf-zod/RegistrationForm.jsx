import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const registrationSchema = z
  .object({
    username: z
      .string()
      .min(1, 'ユーザー名は必須です')
      .min(3, 'ユーザー名は3文字以上で入力してください')
      .max(20, 'ユーザー名は20文字以内で入力してください')
      .regex(/^[a-zA-Z0-9_]+$/, 'ユーザー名は英数字とアンダースコアのみ使用できます'),
    email: z
      .string()
      .min(1, 'メールアドレスは必須です')
      .email('有効なメールアドレスを入力してください'),
    password: z
      .string()
      .min(1, 'パスワードは必須です')
      .min(8, 'パスワードは8文字以上で入力してください')
      .regex(/[A-Z]/, 'パスワードには大文字を含めてください')
      .regex(/[a-z]/, 'パスワードには小文字を含めてください')
      .regex(/[0-9]/, 'パスワードには数字を含めてください'),
    confirmPassword: z.string().min(1, 'パスワード確認は必須です'),
    age: z
      .string()
      .min(1, '年齢は必須です')
      .transform((val) => parseInt(val, 10))
      .refine((val) => !isNaN(val) && val >= 18, '18歳以上である必要があります')
      .refine((val) => val <= 120, '有効な年齢を入力してください'),
    gender: z.enum(['male', 'female', 'other', 'prefer-not-to-say'], {
      errorMap: () => ({ message: '性別を選択してください' }),
    }),
    agreeTerms: z.literal(true, {
      errorMap: () => ({ message: '利用規約に同意してください' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'パスワードが一致しません',
    path: ['confirmPassword'],
  })

export function RegistrationForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: '',
      gender: undefined,
      agreeTerms: false,
    },
  })

  const handleFormSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onSubmit?.(data)
    alert('登録成功！\n' + JSON.stringify(data, null, 2))
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="field">
        <label className="label">ユーザー名</label>
        <div className="control">
          <input
            className={`input ${errors.username ? 'is-danger' : ''}`}
            type="text"
            placeholder="user_name123"
            {...register('username')}
          />
        </div>
        {errors.username && (
          <p className="help is-danger">{errors.username.message}</p>
        )}
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
        <label className="label">パスワード</label>
        <div className="control">
          <input
            className={`input ${errors.password ? 'is-danger' : ''}`}
            type="password"
            placeholder="大文字・小文字・数字を含む8文字以上"
            {...register('password')}
          />
        </div>
        {errors.password && (
          <p className="help is-danger">{errors.password.message}</p>
        )}
      </div>

      <div className="field">
        <label className="label">パスワード確認</label>
        <div className="control">
          <input
            className={`input ${errors.confirmPassword ? 'is-danger' : ''}`}
            type="password"
            placeholder="パスワードを再入力"
            {...register('confirmPassword')}
          />
        </div>
        {errors.confirmPassword && (
          <p className="help is-danger">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="field">
        <label className="label">年齢</label>
        <div className="control">
          <input
            className={`input ${errors.age ? 'is-danger' : ''}`}
            type="number"
            placeholder="18"
            {...register('age')}
          />
        </div>
        {errors.age && <p className="help is-danger">{errors.age.message}</p>}
      </div>

      <div className="field">
        <label className="label">性別</label>
        <div className="control">
          <div className="select is-fullwidth">
            <select
              className={errors.gender ? 'is-danger' : ''}
              {...register('gender')}
            >
              <option value="">選択してください</option>
              <option value="male">男性</option>
              <option value="female">女性</option>
              <option value="other">その他</option>
              <option value="prefer-not-to-say">回答しない</option>
            </select>
          </div>
        </div>
        {errors.gender && (
          <p className="help is-danger">{errors.gender.message}</p>
        )}
      </div>

      <div className="field">
        <label className="checkbox">
          <input type="checkbox" {...register('agreeTerms')} />
          {' '}<a href="#">利用規約</a>に同意する
        </label>
        {errors.agreeTerms && (
          <p className="help is-danger">{errors.agreeTerms.message}</p>
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
