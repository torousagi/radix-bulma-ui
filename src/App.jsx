import { useState } from 'react'
import { ToastProvider } from './components/radix-bulma'
import { NotificationProvider } from './components/bulma-only'
import { RadixBulmaSample } from './samples/RadixBulmaSample'
import { BulmaOnlySample } from './samples/BulmaOnlySample'
import { RadixBulmaSample2 } from './samples/RadixBulmaSample2'
import { BulmaOnlySample2 } from './samples/BulmaOnlySample2'
import { FormRhfZodSample } from './samples/FormRhfZodSample'
import { FormVanillaSample } from './samples/FormVanillaSample'
import { FormRadixBulmaZodSample } from './samples/FormRadixBulmaZodSample'
import { RadixBulmaUISample } from './samples/RadixBulmaUISample'
import 'bulma/css/bulma.min.css'
import './styles/custom.css'

function App() {
  const [view, setView] = useState('both')
  const [category, setCategory] = useState('radix-bulma-ui')

  // カテゴリに応じた表示切替ラベル
  const getViewLabels = () => {
    if (category === 'forms') {
      return {
        left: 'RHF + Zod',
        right: 'バニラ React',
      }
    }
    if (category === 'forms-radix') {
      return {
        left: 'Radix + Zod',
        right: 'バニラ React',
      }
    }
    return {
      left: 'Radix + Bulma',
      right: 'Bulma のみ',
    }
  }

  const viewLabels = getViewLabels()

  // カテゴリに応じた説明文
  const getCategoryDescription = () => {
    if (category === 'radix-bulma-ui') {
      return '実開発向け統合パッケージのコンポーネント一覧・使用例'
    }
    if (category === 'forms') {
      return 'React Hook Form + Zod と バニラReactのフォーム実装を比較できます'
    }
    if (category === 'forms-radix') {
      return 'Radix UI + Bulma + Zod と バニラReactのフォーム実装を比較できます'
    }
    return 'Radix UI + Bulma と Bulma単体の操作性を比較できます'
  }

  // カテゴリに応じた比較ポイント
  const getComparisonPoints = () => {
    if (category === 'radix-bulma-ui') {
      return (
        <ul className="mt-2">
          <li><strong>汎用UI</strong>: Dialog, Tabs, Toast, Tooltip, DropdownMenu, Accordion など</li>
          <li><strong>フォーム部品</strong>: Input, Textarea, Select, Checkbox, RadioGroup, Switch, Slider</li>
          <li><strong>特徴</strong>: forwardRef + error prop でRHF連携可能</li>
        </ul>
      )
    }
    if (category === 'forms') {
      return (
        <ul className="mt-2">
          <li><strong>バリデーション方法</strong>: Zodスキーマ vs 手動条件分岐</li>
          <li><strong>状態管理</strong>: useForm vs 複数useState</li>
          <li><strong>コード量</strong>: 宣言的 vs 命令的</li>
          <li><strong>再レンダリング</strong>: 最適化済み vs 全体更新</li>
          <li><strong>動的フィールド</strong>: useFieldArray vs 配列state</li>
        </ul>
      )
    }
    if (category === 'forms-radix') {
      return (
        <ul className="mt-2">
          <li><strong>Radix UIコンポーネント</strong>: Select, Checkbox, RadioGroup等</li>
          <li><strong>アクセシビリティ</strong>: ARIA属性自動付与、キーボード操作</li>
          <li><strong>Controller連携</strong>: 非標準inputのRHF統合</li>
          <li><strong>エラー表示</strong>: 各コンポーネントにerror prop</li>
          <li><strong>バリデーション</strong>: Zodスキーマで一元管理</li>
        </ul>
      )
    }
    return (
      <ul className="mt-2">
        <li><strong>キーボード操作</strong>: Tab, Esc, Enter, 矢印キーでの操作</li>
        <li><strong>フォーカス管理</strong>: モーダル内でのフォーカストラップ、フォーカス復帰</li>
        <li><strong>アクセシビリティ</strong>: スクリーンリーダー対応、ARIA属性</li>
        <li><strong>位置調整</strong>: 画面端での自動位置調整</li>
      </ul>
    )
  }

  // ページタイトル
  const getPageTitle = () => {
    if (category === 'radix-bulma-ui') {
      return 'radix-bulma-ui コンポーネント'
    }
    if (category === 'forms' || category === 'forms-radix') {
      return 'フォームライブラリ比較'
    }
    return 'UI コンポーネント比較'
  }

  // コンテンツのレンダリング
  const renderContent = () => {
    if (category === 'radix-bulma-ui') {
      return <RadixBulmaUISample />
    }

    if (category === 'forms') {
      if (view === 'both') {
        return (
          <div className="columns">
            <FormRhfZodSample />
            <FormVanillaSample />
          </div>
        )
      } else if (view === 'radix') {
        return <FormRhfZodSample />
      } else {
        return <FormVanillaSample />
      }
    }

    if (category === 'forms-radix') {
      if (view === 'both') {
        return (
          <div className="columns">
            <FormRadixBulmaZodSample />
            <FormVanillaSample />
          </div>
        )
      } else if (view === 'radix') {
        return <FormRadixBulmaZodSample />
      } else {
        return <FormVanillaSample />
      }
    }

    if (category === 'basic') {
      if (view === 'both') {
        return (
          <div className="columns">
            <div className="column">
              <RadixBulmaSample />
            </div>
            <div className="column">
              <BulmaOnlySample />
            </div>
          </div>
        )
      } else if (view === 'radix') {
        return <RadixBulmaSample />
      } else {
        return <BulmaOnlySample />
      }
    }

    // extra
    if (view === 'both') {
      return (
        <div className="columns">
          <div className="column">
            <RadixBulmaSample2 />
          </div>
          <div className="column">
            <BulmaOnlySample2 />
          </div>
        </div>
      )
    } else if (view === 'radix') {
      return <RadixBulmaSample2 />
    } else {
      return <BulmaOnlySample2 />
    }
  }

  const isFormCategory = category === 'forms' || category === 'forms-radix'
  const isSingleViewCategory = category === 'radix-bulma-ui'

  return (
    <ToastProvider>
      <NotificationProvider>
        <div className="app">
          <nav className="navbar is-dark">
            <div className="navbar-brand">
              <span className="navbar-item has-text-weight-bold">
                Headless UI Comparison
              </span>
            </div>
            <div className="navbar-menu is-active">
              <div className="navbar-start">
                <div className="navbar-item">
                  <div className="buttons">
                    <button
                      className={`button is-small ${category === 'radix-bulma-ui' ? 'is-success' : 'is-dark'}`}
                      onClick={() => setCategory('radix-bulma-ui')}
                    >
                      radix-bulma-ui
                    </button>
                    <button
                      className={`button is-small ${category === 'basic' ? 'is-warning' : 'is-dark'}`}
                      onClick={() => setCategory('basic')}
                    >
                      基本コンポーネント
                    </button>
                    <button
                      className={`button is-small ${category === 'extra' ? 'is-warning' : 'is-dark'}`}
                      onClick={() => setCategory('extra')}
                    >
                      追加コンポーネント
                    </button>
                    <button
                      className={`button is-small ${category === 'forms' ? 'is-warning' : 'is-dark'}`}
                      onClick={() => setCategory('forms')}
                    >
                      フォーム(RHF)
                    </button>
                    <button
                      className={`button is-small ${category === 'forms-radix' ? 'is-warning' : 'is-dark'}`}
                      onClick={() => setCategory('forms-radix')}
                    >
                      フォーム(Radix)
                    </button>
                  </div>
                </div>
              </div>
              {!isSingleViewCategory && (
                <div className="navbar-end">
                  <div className="navbar-item">
                    <div className="buttons">
                      <button
                        className={`button is-small ${view === 'both' ? 'is-primary' : 'is-light'}`}
                        onClick={() => setView('both')}
                      >
                        両方
                      </button>
                      <button
                        className={`button is-small ${view === 'radix' ? 'is-primary' : 'is-light'}`}
                        onClick={() => setView('radix')}
                      >
                        {viewLabels.left}
                      </button>
                      <button
                        className={`button is-small ${view === 'bulma' ? 'is-primary' : 'is-light'}`}
                        onClick={() => setView('bulma')}
                      >
                        {viewLabels.right}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          <section className="section">
            <div className="container">
              <h1 className="title is-3">{getPageTitle()}</h1>
              <p className="subtitle">
                {getCategoryDescription()}
              </p>

              <div className="content mb-5">
                <div className={`message ${isFormCategory ? 'is-success' : 'is-info'}`}>
                  <div className="message-body">
                    <strong>比較ポイント:</strong>
                    {getComparisonPoints()}
                  </div>
                </div>
              </div>

              {renderContent()}
            </div>
          </section>

          <footer className="footer">
            <div className="content has-text-centered">
              <p className="is-size-7 has-text-grey">
                Headless UI Comparison - Radix UI + Bulma vs Bulma Only | RHF + Zod vs Vanilla React
              </p>
            </div>
          </footer>
        </div>
      </NotificationProvider>
    </ToastProvider>
  )
}

export default App
