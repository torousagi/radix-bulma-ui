import { useState } from 'react'
import {
  NavigationMenu,
  ContextMenu,
  HoverCard,
  Slider,
  Switch,
  Checkbox,
  RadioGroup,
  Progress,
  ScrollArea,
  Toolbar,
} from '../components/radix-bulma'

export function RadixBulmaSample2() {
  const [sliderValue, setSliderValue] = useState([50])
  const [rangeValue, setRangeValue] = useState([25, 75])
  const [switches, setSwitches] = useState({ notify: false, dark: false, autoUpdate: true })
  const [checkboxes, setCheckboxes] = useState({ a: false, b: true, c: false })
  const [radioValue, setRadioValue] = useState('option1')
  const [progressValue, setProgressValue] = useState(60)
  const [textAlign, setTextAlign] = useState('left')

  return (
    <div className="sample-section">
      <h2 className="title is-4">Radix + Bulma (追加コンポーネント)</h2>
      <p className="subtitle is-6 has-text-grey">
        追加のUIコンポーネント
      </p>

      <div className="columns is-multiline">
        {/* Navigation Menu */}
        <div className="column is-12">
          <div className="box">
            <h3 className="title is-5">Navigation Menu</h3>
            <p className="content is-small has-text-grey mb-3">
              キーボードナビゲーション対応のメニュー
            </p>
            <NavigationMenu>
              <NavigationMenu.List>
                <NavigationMenu.Item>
                  <NavigationMenu.Trigger>製品</NavigationMenu.Trigger>
                  <NavigationMenu.Content>
                    <NavigationMenu.Link href="#">機能一覧</NavigationMenu.Link>
                    <NavigationMenu.Link href="#">料金プラン</NavigationMenu.Link>
                    <NavigationMenu.Link href="#">導入事例</NavigationMenu.Link>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                  <NavigationMenu.Trigger>リソース</NavigationMenu.Trigger>
                  <NavigationMenu.Content>
                    <NavigationMenu.Link href="#">ドキュメント</NavigationMenu.Link>
                    <NavigationMenu.Link href="#">API</NavigationMenu.Link>
                    <NavigationMenu.Link href="#">ブログ</NavigationMenu.Link>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
                <NavigationMenu.Link href="#">お問い合わせ</NavigationMenu.Link>
              </NavigationMenu.List>
            </NavigationMenu>
          </div>
        </div>

        {/* Context Menu */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">Context Menu (右クリック)</h3>
            <p className="content is-small has-text-grey mb-3">
              右クリックでメニュー表示
            </p>
            <ContextMenu>
              <ContextMenu.Trigger>
                <div className="context-menu-area">
                  この領域を右クリックしてください
                </div>
              </ContextMenu.Trigger>
              <ContextMenu.Content>
                <ContextMenu.Label>編集</ContextMenu.Label>
                <ContextMenu.Item onSelect={() => alert('コピー')}>
                  コピー
                </ContextMenu.Item>
                <ContextMenu.Item onSelect={() => alert('切り取り')}>
                  切り取り
                </ContextMenu.Item>
                <ContextMenu.Item onSelect={() => alert('貼り付け')}>
                  貼り付け
                </ContextMenu.Item>
                <ContextMenu.Separator />
                <ContextMenu.Sub>
                  <ContextMenu.SubTrigger>その他</ContextMenu.SubTrigger>
                  <ContextMenu.SubContent>
                    <ContextMenu.Item>名前を変更</ContextMenu.Item>
                    <ContextMenu.Item>削除</ContextMenu.Item>
                  </ContextMenu.SubContent>
                </ContextMenu.Sub>
              </ContextMenu.Content>
            </ContextMenu>
          </div>
        </div>

        {/* Hover Card */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">Hover Card</h3>
            <p className="content is-small has-text-grey mb-3">
              ホバーで詳細情報を表示
            </p>
            <p>
              <HoverCard>
                <HoverCard.Trigger>
                  <a className="has-text-link">@user_name</a>
                </HoverCard.Trigger>
                <HoverCard.Content>
                  <div className="media">
                    <div className="media-left">
                      <figure className="image is-48x48">
                        <div className="has-background-primary" style={{ width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                          U
                        </div>
                      </figure>
                    </div>
                    <div className="media-content">
                      <p className="title is-6">User Name</p>
                      <p className="subtitle is-7">@user_name</p>
                    </div>
                  </div>
                  <div className="content is-small">
                    <p>ソフトウェアエンジニア。React/TypeScript が得意。</p>
                    <p className="has-text-grey">フォロワー: 1,234</p>
                  </div>
                </HoverCard.Content>
              </HoverCard>
              さんがコメントしました。
            </p>
          </div>
        </div>

        {/* Slider */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">Slider</h3>
            <p className="content is-small has-text-grey mb-3">
              キーボード操作・ARIA対応
            </p>
            <div className="mb-4">
              <label className="label">音量: {sliderValue[0]}%</label>
              <Slider
                value={sliderValue}
                onValueChange={setSliderValue}
                max={100}
                step={1}
              />
            </div>
            <div>
              <label className="label">範囲: {rangeValue[0]} - {rangeValue[1]}</label>
              <Slider
                value={rangeValue}
                onValueChange={setRangeValue}
                max={100}
                step={5}
              />
            </div>
          </div>
        </div>

        {/* Switch */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">Switch</h3>
            <p className="content is-small has-text-grey mb-3">
              トグルスイッチ（アクセシブル）
            </p>
            <Switch
              label="通知を有効にする"
              checked={switches.notify}
              onCheckedChange={(checked) => setSwitches({ ...switches, notify: checked })}
            />
            <Switch
              label="ダークモード"
              checked={switches.dark}
              onCheckedChange={(checked) => setSwitches({ ...switches, dark: checked })}
            />
            <Switch
              label="自動更新"
              checked={switches.autoUpdate}
              onCheckedChange={(checked) => setSwitches({ ...switches, autoUpdate: checked })}
            />
            <p className="is-size-7 mt-3 has-text-grey">
              通知: {switches.notify ? 'ON' : 'OFF'} / ダーク: {switches.dark ? 'ON' : 'OFF'} / 自動更新: {switches.autoUpdate ? 'ON' : 'OFF'}
            </p>
          </div>
        </div>

        {/* Checkbox */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">Checkbox</h3>
            <p className="content is-small has-text-grey mb-3">
              チェックボックス（アクセシブル）
            </p>
            <Checkbox
              label="利用規約に同意する"
              checked={checkboxes.a}
              onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, a: checked })}
            />
            <Checkbox
              label="メールを受け取る"
              checked={checkboxes.b}
              onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, b: checked })}
            />
            <Checkbox
              label="プロフィールを公開する"
              checked={checkboxes.c}
              onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, c: checked })}
            />
          </div>
        </div>

        {/* Radio Group */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">Radio Group</h3>
            <p className="content is-small has-text-grey mb-3">
              ラジオボタン（矢印キー対応）
            </p>
            <label className="label">プランを選択</label>
            <RadioGroup value={radioValue} onValueChange={setRadioValue}>
              <RadioGroup.Item value="option1" label="無料プラン" />
              <RadioGroup.Item value="option2" label="スタンダード" />
              <RadioGroup.Item value="option3" label="プロ" />
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
              進捗バー（アクセシブル）
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
              カスタムスクロールバー
            </p>
            <ScrollArea style={{ height: 200 }}>
              <div style={{ padding: '1rem' }}>
                <p className="mb-3">スクロール可能なコンテンツ領域です。</p>
                {Array.from({ length: 20 }, (_, i) => (
                  <p key={i} className="mb-2">
                    アイテム {i + 1}: Lorem ipsum dolor sit amet
                  </p>
                ))}
              </div>
            </ScrollArea>
            <p className="is-size-7 mt-2 has-text-grey">
              カスタムスタイルのスクロールバーが表示されます
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">Toolbar</h3>
            <p className="content is-small has-text-grey mb-3">
              キーボードナビゲーション対応
            </p>
            <Toolbar aria-label="テキスト編集ツールバー">
              <Toolbar.Button className="is-small" onClick={() => alert('元に戻す')}>
                ↩ 戻す
              </Toolbar.Button>
              <Toolbar.Button className="is-small" onClick={() => alert('やり直す')}>
                ↪ やり直す
              </Toolbar.Button>
              <Toolbar.Separator />
              <Toolbar.ToggleGroup
                type="single"
                value={textAlign}
                onValueChange={(value) => value && setTextAlign(value)}
                aria-label="テキスト配置"
              >
                <Toolbar.ToggleItem value="left" className="is-small" aria-label="左揃え">
                  ◀
                </Toolbar.ToggleItem>
                <Toolbar.ToggleItem value="center" className="is-small" aria-label="中央揃え">
                  ◆
                </Toolbar.ToggleItem>
                <Toolbar.ToggleItem value="right" className="is-small" aria-label="右揃え">
                  ▶
                </Toolbar.ToggleItem>
              </Toolbar.ToggleGroup>
              <Toolbar.Separator />
              <Toolbar.Link href="#" className="is-small is-link is-light">
                ヘルプ
              </Toolbar.Link>
            </Toolbar>
            <p className="is-size-7 mt-3 has-text-grey">
              配置: {textAlign} / 矢印キーで移動可能
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
