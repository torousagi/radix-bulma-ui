import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Input,
  Textarea,
  Select,
  SelectItem,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
} from '../components/radix-bulma-zod'

// ログインフォームスキーマ
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

function LoginForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  })

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000))
    alert('ログイン成功！\n' + JSON.stringify(data, null, 2))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="メールアドレス"
        type="email"
        placeholder="example@email.com"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label="パスワード"
        type="password"
        placeholder="8文字以上"
        error={errors.password?.message}
        {...register('password')}
      />
      <Controller
        name="rememberMe"
        control={control}
        render={({ field }) => (
          <Checkbox
            label="ログイン状態を保持する"
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        )}
      />
      <div className="field">
        <button
          type="submit"
          className={`button is-primary ${isSubmitting ? 'is-loading' : ''}`}
          disabled={isSubmitting}
        >
          ログイン
        </button>
      </div>
    </form>
  )
}

// 登録フォームスキーマ
const registrationSchema = z
  .object({
    username: z
      .string()
      .min(1, 'ユーザー名は必須です')
      .min(3, 'ユーザー名は3文字以上')
      .max(20, 'ユーザー名は20文字以内')
      .regex(/^[a-zA-Z0-9_]+$/, '英数字とアンダースコアのみ'),
    email: z
      .string()
      .min(1, 'メールアドレスは必須です')
      .email('有効なメールアドレスを入力してください'),
    password: z
      .string()
      .min(1, 'パスワードは必須です')
      .min(8, '8文字以上')
      .regex(/[A-Z]/, '大文字を含めてください')
      .regex(/[a-z]/, '小文字を含めてください')
      .regex(/[0-9]/, '数字を含めてください'),
    confirmPassword: z.string().min(1, 'パスワード確認は必須です'),
    age: z
      .string()
      .min(1, '年齢は必須です')
      .transform((v) => parseInt(v, 10))
      .refine((v) => !isNaN(v) && v >= 18, '18歳以上である必要があります'),
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

function RegistrationForm() {
  const {
    register,
    handleSubmit,
    control,
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

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000))
    alert('登録成功！\n' + JSON.stringify(data, null, 2))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="ユーザー名"
        placeholder="user_name123"
        error={errors.username?.message}
        {...register('username')}
      />
      <Input
        label="メールアドレス"
        type="email"
        placeholder="example@email.com"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label="パスワード"
        type="password"
        placeholder="大文字・小文字・数字を含む8文字以上"
        error={errors.password?.message}
        {...register('password')}
      />
      <Input
        label="パスワード確認"
        type="password"
        placeholder="パスワードを再入力"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <Input
        label="年齢"
        type="number"
        placeholder="18"
        error={errors.age?.message}
        {...register('age')}
      />
      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <Select
            label="性別"
            placeholder="選択してください"
            value={field.value}
            onValueChange={field.onChange}
            error={errors.gender?.message}
          >
            <SelectItem value="male">男性</SelectItem>
            <SelectItem value="female">女性</SelectItem>
            <SelectItem value="other">その他</SelectItem>
            <SelectItem value="prefer-not-to-say">回答しない</SelectItem>
          </Select>
        )}
      />
      <Controller
        name="agreeTerms"
        control={control}
        render={({ field }) => (
          <Checkbox
            label={
              <>
                <a href="#">利用規約</a>に同意する
              </>
            }
            checked={field.value}
            onCheckedChange={field.onChange}
            error={errors.agreeTerms?.message}
          />
        )}
      />
      <div className="field">
        <button
          type="submit"
          className={`button is-success ${isSubmitting ? 'is-loading' : ''}`}
          disabled={isSubmitting}
        >
          登録
        </button>
      </div>
    </form>
  )
}

// お問い合わせフォームスキーマ
const contactSchema = z
  .object({
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
      .min(10, '10文字以上')
      .max(1000, '1000文字以内'),
    attachments: z
      .array(
        z.object({
          name: z.string().min(1, 'ファイル名は必須です'),
          url: z.string().min(1, 'URLは必須です').url('有効なURLを入力'),
        })
      )
      .optional(),
    contactMethod: z.enum(['email', 'phone']).default('email'),
    phoneNumber: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.contactMethod === 'phone') {
        return data.phoneNumber && data.phoneNumber.length >= 10
      }
      return true
    },
    { message: '電話番号は10桁以上', path: ['phoneNumber'] }
  )

function ContactForm() {
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

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000))
    alert('送信成功！\n' + JSON.stringify(data, null, 2))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="お名前"
        placeholder="山田 太郎"
        error={errors.name?.message}
        {...register('name')}
      />
      <Input
        label="メールアドレス"
        type="email"
        placeholder="example@email.com"
        error={errors.email?.message}
        {...register('email')}
      />
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select
            label="カテゴリ"
            placeholder="選択してください"
            value={field.value}
            onValueChange={field.onChange}
            error={errors.category?.message}
          >
            <SelectItem value="general">一般的な質問</SelectItem>
            <SelectItem value="support">サポート</SelectItem>
            <SelectItem value="sales">営業</SelectItem>
            <SelectItem value="other">その他</SelectItem>
          </Select>
        )}
      />
      <Controller
        name="priority"
        control={control}
        render={({ field }) => (
          <RadioGroup
            label="優先度"
            value={field.value}
            onValueChange={field.onChange}
            error={errors.priority?.message}
          >
            <RadioGroupItem value="low" label="低" />
            <RadioGroupItem value="medium" label="中" />
            <RadioGroupItem value="high" label="高" />
          </RadioGroup>
        )}
      />
      <Textarea
        label="メッセージ"
        placeholder="お問い合わせ内容（10文字以上）"
        rows={4}
        error={errors.message?.message}
        {...register('message')}
      />
      <Controller
        name="contactMethod"
        control={control}
        render={({ field }) => (
          <RadioGroup
            label="連絡方法"
            value={field.value}
            onValueChange={field.onChange}
          >
            <RadioGroupItem value="email" label="メール" />
            <RadioGroupItem value="phone" label="電話" />
          </RadioGroup>
        )}
      />
      {contactMethod === 'phone' && (
        <Input
          label="電話番号"
          type="tel"
          placeholder="09012345678"
          error={errors.phoneNumber?.message}
          {...register('phoneNumber')}
        />
      )}

      <div className="field">
        <label className="label">添付ファイル（URL）</label>
        {fields.map((field, index) => (
          <div key={field.id} className="box">
            <Input
              placeholder="ファイル名"
              error={errors.attachments?.[index]?.name?.message}
              {...register(`attachments.${index}.name`)}
            />
            <Input
              type="url"
              placeholder="https://example.com/file.pdf"
              error={errors.attachments?.[index]?.url?.message}
              {...register(`attachments.${index}.url`)}
            />
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

      <div className="field mt-4">
        <button
          type="submit"
          className={`button is-primary ${isSubmitting ? 'is-loading' : ''}`}
          disabled={isSubmitting}
        >
          送信
        </button>
      </div>
    </form>
  )
}

export function FormRadixBulmaZodSample() {
  return (
    <div className="column">
      <div className="box">
        <h2 className="title is-4 has-text-info">Radix + Bulma + Zod</h2>
        <p className="subtitle is-6 has-text-grey">
          Radix UIコンポーネント + RHF + Zodバリデーション
        </p>

        <div className="content">
          <h3 className="title is-5">ログインフォーム</h3>
          <p className="is-size-7 has-text-grey mb-3">
            Input, Checkbox コンポーネント使用
          </p>
          <LoginForm />
        </div>

        <hr />

        <div className="content">
          <h3 className="title is-5">登録フォーム</h3>
          <p className="is-size-7 has-text-grey mb-3">
            Input, Select, Checkbox コンポーネント使用
          </p>
          <RegistrationForm />
        </div>

        <hr />

        <div className="content">
          <h3 className="title is-5">お問い合わせフォーム</h3>
          <p className="is-size-7 has-text-grey mb-3">
            Input, Textarea, Select, RadioGroup, useFieldArray 使用
          </p>
          <ContactForm />
        </div>

        <hr />

        <div className="content">
          <h3 className="title is-5">Radix + Bulma + Zod の特徴</h3>
          <div className="tags">
            <span className="tag is-info">Radix UI</span>
            <span className="tag is-info">Bulma CSS</span>
            <span className="tag is-info">react-hook-form</span>
            <span className="tag is-info">Zod</span>
            <span className="tag is-info">Controller</span>
          </div>
          <ul className="is-size-7">
            <li>
              <strong>アクセシビリティ:</strong> Radix UIの自動ARIA対応
            </li>
            <li>
              <strong>キーボード操作:</strong> Select/RadioGroupの矢印キー操作
            </li>
            <li>
              <strong>宣言的バリデーション:</strong> Zodスキーマで一元管理
            </li>
            <li>
              <strong>エラー表示:</strong> 各コンポーネントにerror prop
            </li>
            <li>
              <strong>Controller:</strong> 非標準inputの状態連携
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
