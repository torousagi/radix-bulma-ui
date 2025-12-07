import { LoginForm, RegistrationForm, ContactForm } from '../components/form-rhf-zod'

export function FormRhfZodSample() {
  return (
    <div className="column">
      <div className="box">
        <h2 className="title is-4 has-text-info">
          React Hook Form + Zod
        </h2>
        <p className="subtitle is-6 has-text-grey">
          宣言的バリデーション・最適化された再レンダリング
        </p>

        <div className="content">
          <h3 className="title is-5">ログインフォーム</h3>
          <p className="is-size-7 has-text-grey mb-3">
            基本的なバリデーション（必須・メール形式・文字数）
          </p>
          <LoginForm />
        </div>

        <hr />

        <div className="content">
          <h3 className="title is-5">登録フォーム</h3>
          <p className="is-size-7 has-text-grey mb-3">
            複雑なバリデーション（パスワード確認・正規表現・条件付き）
          </p>
          <RegistrationForm />
        </div>

        <hr />

        <div className="content">
          <h3 className="title is-5">お問い合わせフォーム</h3>
          <p className="is-size-7 has-text-grey mb-3">
            動的フィールド（useFieldArray）・条件付き表示
          </p>
          <ContactForm />
        </div>

        <hr />

        <div className="content">
          <h3 className="title is-5">RHF + Zod の特徴</h3>
          <div className="tags">
            <span className="tag is-info">useForm</span>
            <span className="tag is-info">zodResolver</span>
            <span className="tag is-info">useFieldArray</span>
            <span className="tag is-info">watch</span>
            <span className="tag is-info">register</span>
          </div>
          <ul className="is-size-7">
            <li><strong>宣言的バリデーション:</strong> Zodスキーマで一元管理</li>
            <li><strong>型安全:</strong> TypeScriptと完全統合</li>
            <li><strong>最適化:</strong> 不要な再レンダリングを防止</li>
            <li><strong>シンプルなAPI:</strong> register()でフィールド登録</li>
            <li><strong>動的フィールド:</strong> useFieldArrayで配列管理</li>
            <li><strong>条件付きバリデーション:</strong> refineで複雑なルール</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
