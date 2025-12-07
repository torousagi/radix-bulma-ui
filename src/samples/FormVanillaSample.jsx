import { LoginForm, RegistrationForm, ContactForm } from '../components/form-vanilla'

export function FormVanillaSample() {
  return (
    <div className="column">
      <div className="box">
        <h2 className="title is-4 has-text-warning-dark">
          バニラ React
        </h2>
        <p className="subtitle is-6 has-text-grey">
          useState + 手動バリデーション
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
            動的フィールド（配列state管理）・条件付き表示
          </p>
          <ContactForm />
        </div>

        <hr />

        <div className="content">
          <h3 className="title is-5">バニラ React の特徴</h3>
          <div className="tags">
            <span className="tag is-warning">useState</span>
            <span className="tag is-warning">手動validate</span>
            <span className="tag is-warning">onChange</span>
            <span className="tag is-warning">条件分岐</span>
          </div>
          <ul className="is-size-7">
            <li><strong>完全な制御:</strong> すべての状態を手動管理</li>
            <li><strong>依存関係なし:</strong> 外部ライブラリ不要</li>
            <li><strong>学習コスト:</strong> Reactの基本だけで実装</li>
            <li><strong>冗長なコード:</strong> バリデーションロジックが分散</li>
            <li><strong>再レンダリング:</strong> 各入力で全体が再レンダリング</li>
            <li><strong>保守性:</strong> ルール追加時にコード修正が多い</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
