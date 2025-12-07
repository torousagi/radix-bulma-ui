import { useState } from 'react'
import {
  Dialog,
  Popover,
  DropdownMenu,
  Select,
  Tooltip,
  TooltipProvider,
  useToast,
  Tabs,
  Accordion,
  Collapsible,
} from '../components/radix-bulma'

export function RadixBulmaSample() {
  const { addToast } = useToast()
  const [selectValue, setSelectValue] = useState('')

  return (
    <div className="sample-section">
      <h2 className="title is-4">Radix + Bulma</h2>
      <p className="subtitle is-6 has-text-grey">
        Radix UIのアクセシビリティ + Bulmaのスタイル
      </p>

      <div className="columns is-multiline">
        {/* Dialog */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">Dialog (モーダル)</h3>
            <p className="content is-small has-text-grey mb-3">
              Esc/外クリック/フォーカス管理を自動処理
            </p>
            <Dialog>
              <Dialog.Trigger className="is-primary">モーダルを開く</Dialog.Trigger>
              <Dialog.Content title="確認ダイアログ">
                <p>この操作を実行してもよろしいですか？</p>
                <p className="has-text-grey is-size-7 mt-2">
                  Escキーまたは外側クリックで閉じます
                </p>
                <Dialog.Footer>
                  <Dialog.Close className="is-success">確認</Dialog.Close>
                  <Dialog.Close>キャンセル</Dialog.Close>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog>
          </div>
        </div>

        {/* Popover */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">Popover</h3>
            <p className="content is-small has-text-grey mb-3">
              位置決め・スクロール境界を自動調整
            </p>
            <Popover>
              <Popover.Trigger className="is-info">ポップオーバー</Popover.Trigger>
              <Popover.Content>
                <Popover.Close />
                <p className="has-text-weight-bold mb-2">追加情報</p>
                <p>ここに詳細な説明を記載できます。</p>
                <p className="is-size-7 has-text-grey mt-2">
                  画面端でも自動的に位置調整されます
                </p>
              </Popover.Content>
            </Popover>
          </div>
        </div>

        {/* Dropdown Menu */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">Dropdown Menu</h3>
            <p className="content is-small has-text-grey mb-3">
              キーボードナビゲーション対応
            </p>
            <DropdownMenu>
              <DropdownMenu.Trigger>アクション</DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label>ファイル操作</DropdownMenu.Label>
                <DropdownMenu.Item onSelect={() => addToast({ title: '新規作成', type: 'info' })}>
                  新規作成
                </DropdownMenu.Item>
                <DropdownMenu.Item onSelect={() => addToast({ title: '開く', type: 'info' })}>
                  開く
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item onSelect={() => addToast({ title: '保存しました', type: 'success' })}>
                  保存
                </DropdownMenu.Item>
                <DropdownMenu.Item onSelect={() => addToast({ title: '削除しました', type: 'error' })}>
                  削除
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu>
          </div>
        </div>

        {/* Select */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">Select</h3>
            <p className="content is-small has-text-grey mb-3">
              IME/タイプアヘッド対応
            </p>
            <Select
              value={selectValue}
              onValueChange={setSelectValue}
              placeholder="フルーツを選択"
            >
              <Select.Group label="柑橘類">
                <Select.Item value="orange">オレンジ</Select.Item>
                <Select.Item value="lemon">レモン</Select.Item>
                <Select.Item value="grapefruit">グレープフルーツ</Select.Item>
              </Select.Group>
              <Select.Separator />
              <Select.Group label="ベリー類">
                <Select.Item value="strawberry">いちご</Select.Item>
                <Select.Item value="blueberry">ブルーベリー</Select.Item>
                <Select.Item value="raspberry">ラズベリー</Select.Item>
              </Select.Group>
            </Select>
            {selectValue && (
              <p className="mt-2 is-size-7">選択: {selectValue}</p>
            )}
          </div>
        </div>

        {/* Tooltip */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">Tooltip</h3>
            <p className="content is-small has-text-grey mb-3">
              フォーカス時も表示・スクリーンリーダー対応
            </p>
            <TooltipProvider>
              <div className="buttons">
                <Tooltip content="上に表示されます" side="top">
                  <button className="button">上</button>
                </Tooltip>
                <Tooltip content="右に表示されます" side="right">
                  <button className="button">右</button>
                </Tooltip>
                <Tooltip content="下に表示されます" side="bottom">
                  <button className="button">下</button>
                </Tooltip>
                <Tooltip content="左に表示されます" side="left">
                  <button className="button">左</button>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>
        </div>

        {/* Toast */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">Toast (通知)</h3>
            <p className="content is-small has-text-grey mb-3">
              スタック管理・自動クローズ
            </p>
            <div className="buttons">
              <button
                className="button is-success"
                onClick={() => addToast({ title: '成功', description: '操作が完了しました', type: 'success' })}
              >
                成功
              </button>
              <button
                className="button is-danger"
                onClick={() => addToast({ title: 'エラー', description: '問題が発生しました', type: 'error' })}
              >
                エラー
              </button>
              <button
                className="button is-warning"
                onClick={() => addToast({ title: '警告', description: '注意が必要です', type: 'warning' })}
              >
                警告
              </button>
              <button
                className="button is-info"
                onClick={() => addToast({ title: '情報', description: '参考情報です', type: 'info' })}
              >
                情報
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="column is-12">
          <div className="box">
            <h3 className="title is-5">Tabs</h3>
            <p className="content is-small has-text-grey mb-3">
              ロービングtabindex・ARIA連携
            </p>
            <Tabs defaultValue="tab1">
              <Tabs.List boxed>
                <Tabs.Trigger value="tab1">概要</Tabs.Trigger>
                <Tabs.Trigger value="tab2">詳細</Tabs.Trigger>
                <Tabs.Trigger value="tab3">設定</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="tab1">
                <p>概要タブの内容です。矢印キーでタブを切り替えられます。</p>
              </Tabs.Content>
              <Tabs.Content value="tab2">
                <p>詳細タブの内容です。Tabキーでコンテンツにフォーカスが移動します。</p>
              </Tabs.Content>
              <Tabs.Content value="tab3">
                <p>設定タブの内容です。スクリーンリーダーでもナビゲーション可能です。</p>
              </Tabs.Content>
            </Tabs>
          </div>
        </div>

        {/* Accordion */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">Accordion</h3>
            <p className="content is-small has-text-grey mb-3">
              開閉・キーボード操作の標準化
            </p>
            <Accordion type="single" collapsible defaultValue="item-1">
              <Accordion.Item value="item-1">
                <Accordion.Trigger>よくある質問 1</Accordion.Trigger>
                <Accordion.Content>
                  <p>回答内容がここに表示されます。Enterキーで開閉できます。</p>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="item-2">
                <Accordion.Trigger>よくある質問 2</Accordion.Trigger>
                <Accordion.Content>
                  <p>別の回答内容です。矢印キーでアイテム間を移動できます。</p>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="item-3">
                <Accordion.Trigger>よくある質問 3</Accordion.Trigger>
                <Accordion.Content>
                  <p>さらに別の回答です。Home/Endキーで最初/最後に移動できます。</p>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>

        {/* Collapsible */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">Collapsible</h3>
            <p className="content is-small has-text-grey mb-3">
              シンプルな開閉UI
            </p>
            <Collapsible>
              <Collapsible.Trigger>詳細設定を表示</Collapsible.Trigger>
              <Collapsible.Content>
                <div className="field">
                  <label className="label">オプション1</label>
                  <input className="input" type="text" placeholder="値を入力" />
                </div>
                <div className="field">
                  <label className="label">オプション2</label>
                  <input className="input" type="text" placeholder="値を入力" />
                </div>
              </Collapsible.Content>
            </Collapsible>
          </div>
        </div>
      </div>
    </div>
  )
}
