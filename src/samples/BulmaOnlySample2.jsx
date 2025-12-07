import { useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarMenu,
  NavbarStart,
  NavbarEnd,
  NavbarItem,
  NavbarLink,
  NavbarDropdown,
  NavbarDivider,
  Slider,
  Checkbox,
  RadioGroup,
  Radio,
  Progress,
} from '../components/bulma-only'

export function BulmaOnlySample2() {
  const [sliderValue, setSliderValue] = useState(50)
  const [checkboxes, setCheckboxes] = useState({ a: false, b: true, c: false })
  const [radioValue, setRadioValue] = useState('option1')
  const [progressValue, setProgressValue] = useState(60)

  return (
    <div className="sample-section">
      <h2 className="title is-4">Bulma のみ (追加コンポーネント)</h2>
      <p className="subtitle is-6 has-text-grey">
        Bulma標準のコンポーネント
      </p>

      <div className="columns is-multiline">
        {/* Navbar */}
        <div className="column is-12">
          <div className="box">
            <h3 className="title is-5">Navbar</h3>
            <p className="content is-small has-text-grey mb-3">
              Bulma標準のナビバー
            </p>
            <Navbar color="is-light">
              {({ isActive, toggleMenu }) => (
                <>
                  <NavbarBrand onToggle={toggleMenu} isActive={isActive}>
                    <NavbarItem href="#">
                      <strong>Logo</strong>
                    </NavbarItem>
                  </NavbarBrand>
                  <NavbarMenu isActive={isActive}>
                    <NavbarStart>
                      <NavbarItem hasDropdown isHoverable>
                        <NavbarLink>製品</NavbarLink>
                        <NavbarDropdown>
                          <NavbarItem href="#">機能一覧</NavbarItem>
                          <NavbarItem href="#">料金プラン</NavbarItem>
                          <NavbarDivider />
                          <NavbarItem href="#">導入事例</NavbarItem>
                        </NavbarDropdown>
                      </NavbarItem>
                      <NavbarItem href="#">お問い合わせ</NavbarItem>
                    </NavbarStart>
                  </NavbarMenu>
                </>
              )}
            </Navbar>
          </div>
        </div>

        {/* Context Menu - Not available in Bulma */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">Context Menu</h3>
            <p className="content is-small has-text-grey mb-3">
              Bulma標準にはなし
            </p>
            <div className="context-menu-area">
              <p className="has-text-warning">
                ※Bulma単体ではContext Menuコンポーネントがありません
              </p>
              <p className="is-size-7 mt-2">
                JavaScriptで独自実装が必要
              </p>
            </div>
          </div>
        </div>

        {/* Hover Card - Not available in Bulma */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">Hover Card</h3>
            <p className="content is-small has-text-grey mb-3">
              Bulma標準にはなし
            </p>
            <p>
              <span
                className="has-text-link"
                title="Bulma単体ではHoverCardがないため、title属性で代替"
              >
                @user_name
              </span>
              さんがコメントしました。
            </p>
            <p className="is-size-7 has-text-warning mt-3">
              ※title属性またはカスタムCSS/JSで実装が必要
            </p>
          </div>
        </div>

        {/* Slider */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">Slider</h3>
            <p className="content is-small has-text-grey mb-3">
              ネイティブのrange input
            </p>
            <div className="mb-4">
              <label className="label">音量: {sliderValue}%</label>
              <Slider
                value={sliderValue}
                onChange={setSliderValue}
                max={100}
                step={1}
              />
            </div>
            <p className="is-size-7 has-text-grey">
              ※スタイリングはブラウザ依存
            </p>
          </div>
        </div>

        {/* Switch - Bulma doesn't have native switch */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">Switch</h3>
            <p className="content is-small has-text-grey mb-3">
              Bulma標準にはなし
            </p>
            <div className="bulma-switch mb-2">
              <input type="checkbox" id="bulma-switch-1" />
              <label className="switch-visual" htmlFor="bulma-switch-1"></label>
              <label htmlFor="bulma-switch-1">通知を有効にする</label>
            </div>
            <div className="bulma-switch mb-2">
              <input type="checkbox" id="bulma-switch-2" />
              <label className="switch-visual" htmlFor="bulma-switch-2"></label>
              <label htmlFor="bulma-switch-2">ダークモード</label>
            </div>
            <p className="is-size-7 has-text-warning mt-3">
              ※Bulma拡張またはカスタムCSSが必要
            </p>
          </div>
        </div>

        {/* Checkbox */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">Checkbox</h3>
            <p className="content is-small has-text-grey mb-3">
              Bulma標準のチェックボックス
            </p>
            <Checkbox
              label="利用規約に同意する"
              checked={checkboxes.a}
              onChange={(checked) => setCheckboxes({ ...checkboxes, a: checked })}
            />
            <Checkbox
              label="メールを受け取る"
              checked={checkboxes.b}
              onChange={(checked) => setCheckboxes({ ...checkboxes, b: checked })}
            />
            <Checkbox
              label="プロフィールを公開する"
              checked={checkboxes.c}
              onChange={(checked) => setCheckboxes({ ...checkboxes, c: checked })}
            />
          </div>
        </div>

        {/* Radio Group */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">Radio Group</h3>
            <p className="content is-small has-text-grey mb-3">
              Bulma標準のラジオボタン
            </p>
            <label className="label">プランを選択</label>
            <RadioGroup name="plan" value={radioValue} onChange={setRadioValue}>
              {({ name, value, onChange }) => (
                <>
                  <Radio
                    name={name}
                    value="option1"
                    label="無料プラン"
                    checked={value === 'option1'}
                    onChange={onChange}
                  />
                  <Radio
                    name={name}
                    value="option2"
                    label="スタンダード"
                    checked={value === 'option2'}
                    onChange={onChange}
                  />
                  <Radio
                    name={name}
                    value="option3"
                    label="プロ"
                    checked={value === 'option3'}
                    onChange={onChange}
                  />
                </>
              )}
            </RadioGroup>
            <p className="is-size-7 mt-3 has-text-grey">
              選択: {radioValue}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="column is-12">
          <div className="box">
            <h3 className="title is-5">Progress</h3>
            <p className="content is-small has-text-grey mb-3">
              Bulma標準の進捗バー
            </p>
            <div className="columns">
              <div className="column">
                <label className="label">ダウンロード中: {progressValue}%</label>
                <Progress value={progressValue} color="is-primary" />
              </div>
              <div className="column">
                <label className="label">アップロード: 80%</label>
                <Progress value={80} color="is-info" />
              </div>
              <div className="column">
                <label className="label">完了: 100%</label>
                <Progress value={100} color="is-success" />
              </div>
            </div>
            <div className="buttons mt-3">
              <button
                className="button is-small"
                onClick={() => setProgressValue(Math.max(0, progressValue - 10))}
              >
                -10%
              </button>
              <button
                className="button is-small"
                onClick={() => setProgressValue(Math.min(100, progressValue + 10))}
              >
                +10%
              </button>
            </div>
          </div>
        </div>

        {/* ScrollArea */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">ScrollArea</h3>
            <p className="content is-small has-text-grey mb-3">
              ネイティブのスクロール
            </p>
            <div className="bulma-scroll-area" style={{ height: 200, overflow: 'auto' }}>
              <div style={{ padding: '1rem' }}>
                <p className="mb-3">スクロール可能なコンテンツ領域です。</p>
                {Array.from({ length: 20 }, (_, i) => (
                  <p key={i} className="mb-2">
                    アイテム {i + 1}: Lorem ipsum dolor sit amet
                  </p>
                ))}
              </div>
            </div>
            <p className="is-size-7 mt-2 has-text-warning">
              ※ブラウザ標準のスクロールバー
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">Toolbar</h3>
            <p className="content is-small has-text-grey mb-3">
              Bulma標準のボタングループ
            </p>
            <div className="bulma-toolbar">
              <div className="buttons has-addons mb-0">
                <button className="button is-small" onClick={() => alert('元に戻す')}>
                  ↩ 戻す
                </button>
                <button className="button is-small" onClick={() => alert('やり直す')}>
                  ↪ やり直す
                </button>
              </div>
              <span style={{ width: 1, height: '1.5rem', background: '#dbdbdb', margin: '0 0.5rem' }} />
              <div className="buttons has-addons mb-0">
                <button className="button is-small">◀</button>
                <button className="button is-small is-primary">◆</button>
                <button className="button is-small">▶</button>
              </div>
              <span style={{ width: 1, height: '1.5rem', background: '#dbdbdb', margin: '0 0.5rem' }} />
              <a href="#" className="button is-small is-link is-light">ヘルプ</a>
            </div>
            <p className="is-size-7 mt-3 has-text-warning">
              ※キーボードナビゲーションは手動実装が必要
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
