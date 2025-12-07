import { useState } from 'react'
import {
  DialogTrigger,
  DialogContent,
  DialogFooter,
  useDialog,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownDivider,
  Select,
  SelectOption,
  SelectGroup,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  useNotification,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../components/bulma-only'

export function BulmaOnlySample() {
  const dialog = useDialog()
  const { addNotification } = useNotification()
  const [selectValue, setSelectValue] = useState('')

  return (
    <div className="sample-section">
      <h2 className="title is-4">Bulma のみ</h2>
      <p className="subtitle is-6 has-text-grey">
        Bulma標準のスタイル（カスタム実装）
      </p>

      <div className="columns is-multiline">
        {/* Dialog */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">Dialog (モーダル)</h3>
            <p className="content is-small has-text-grey mb-3">
              基本的なEsc/外クリック対応
            </p>
            <DialogTrigger onClick={dialog.onOpen} className="is-primary">
              モーダルを開く
            </DialogTrigger>
            <DialogContent
              title="確認ダイアログ"
              open={dialog.open}
              onClose={dialog.onClose}
            >
              <p>この操作を実行してもよろしいですか？</p>
              <p className="has-text-grey is-size-7 mt-2">
                Escキーまたは外側クリックで閉じます
              </p>
              <DialogFooter>
                <button className="button is-success" onClick={dialog.onClose}>
                  確認
                </button>
                <button className="button" onClick={dialog.onClose}>
                  キャンセル
                </button>
              </DialogFooter>
            </DialogContent>
          </div>
        </div>

        {/* Dropdown */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">Dropdown Menu</h3>
            <p className="content is-small has-text-grey mb-3">
              基本的なドロップダウン
            </p>
            <Dropdown>
              {({ toggle }) => (
                <>
                  <DropdownTrigger onClick={toggle}>アクション</DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem onClick={() => addNotification({ title: '新規作成', type: 'info' })}>
                      新規作成
                    </DropdownItem>
                    <DropdownItem onClick={() => addNotification({ title: '開く', type: 'info' })}>
                      開く
                    </DropdownItem>
                    <DropdownDivider />
                    <DropdownItem onClick={() => addNotification({ title: '保存しました', type: 'success' })}>
                      保存
                    </DropdownItem>
                    <DropdownItem onClick={() => addNotification({ title: '削除しました', type: 'error' })}>
                      削除
                    </DropdownItem>
                  </DropdownMenu>
                </>
              )}
            </Dropdown>
          </div>
        </div>

        {/* Select */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">Select</h3>
            <p className="content is-small has-text-grey mb-3">
              ネイティブselect要素
            </p>
            <Select
              value={selectValue}
              onChange={setSelectValue}
              placeholder="フルーツを選択"
            >
              <SelectGroup label="柑橘類">
                <SelectOption value="orange">オレンジ</SelectOption>
                <SelectOption value="lemon">レモン</SelectOption>
                <SelectOption value="grapefruit">グレープフルーツ</SelectOption>
              </SelectGroup>
              <SelectGroup label="ベリー類">
                <SelectOption value="strawberry">いちご</SelectOption>
                <SelectOption value="blueberry">ブルーベリー</SelectOption>
                <SelectOption value="raspberry">ラズベリー</SelectOption>
              </SelectGroup>
            </Select>
            {selectValue && (
              <p className="mt-2 is-size-7">選択: {selectValue}</p>
            )}
          </div>
        </div>

        {/* Tooltip - Bulma doesn't have built-in tooltip */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">Tooltip</h3>
            <p className="content is-small has-text-grey mb-3">
              Bulma標準にはTooltipなし
            </p>
            <div className="buttons">
              <button className="button" title="CSSのtitle属性で代替">
                title属性
              </button>
            </div>
            <p className="is-size-7 has-text-warning">
              ※Bulma単体ではTooltipコンポーネントがありません
            </p>
          </div>
        </div>

        {/* Notification/Toast */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">Notification (通知)</h3>
            <p className="content is-small has-text-grey mb-3">
              カスタム実装の通知
            </p>
            <div className="buttons">
              <button
                className="button is-success"
                onClick={() => addNotification({ title: '成功', description: '操作が完了しました', type: 'success' })}
              >
                成功
              </button>
              <button
                className="button is-danger"
                onClick={() => addNotification({ title: 'エラー', description: '問題が発生しました', type: 'error' })}
              >
                エラー
              </button>
              <button
                className="button is-warning"
                onClick={() => addNotification({ title: '警告', description: '注意が必要です', type: 'warning' })}
              >
                警告
              </button>
              <button
                className="button is-info"
                onClick={() => addNotification({ title: '情報', description: '参考情報です', type: 'info' })}
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
              クリックでの切り替えのみ
            </p>
            <Tabs defaultValue="tab1" boxed>
              {({ activeTab, setActiveTab, tabsClassName }) => (
                <>
                  <TabsList className={tabsClassName}>
                    <TabsTrigger value="tab1" activeTab={activeTab} onClick={setActiveTab}>
                      概要
                    </TabsTrigger>
                    <TabsTrigger value="tab2" activeTab={activeTab} onClick={setActiveTab}>
                      詳細
                    </TabsTrigger>
                    <TabsTrigger value="tab3" activeTab={activeTab} onClick={setActiveTab}>
                      設定
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1" activeTab={activeTab}>
                    <p>概要タブの内容です。クリックでタブを切り替えます。</p>
                  </TabsContent>
                  <TabsContent value="tab2" activeTab={activeTab}>
                    <p>詳細タブの内容です。キーボードナビゲーションは限定的です。</p>
                  </TabsContent>
                  <TabsContent value="tab3" activeTab={activeTab}>
                    <p>設定タブの内容です。ARIA属性は手動で追加が必要です。</p>
                  </TabsContent>
                </>
              )}
            </Tabs>
          </div>
        </div>

        {/* Accordion */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">Accordion</h3>
            <p className="content is-small has-text-grey mb-3">
              クリックでの開閉のみ
            </p>
            <Accordion type="single" defaultValue="item-1">
              {({ openItems, toggleItem }) => (
                <>
                  <AccordionItem value="item-1" isOpen={openItems.includes('item-1')} onToggle={toggleItem}>
                    {({ isOpen, onToggle }) => (
                      <>
                        <AccordionTrigger isOpen={isOpen} onClick={onToggle}>
                          よくある質問 1
                        </AccordionTrigger>
                        <AccordionContent isOpen={isOpen}>
                          <p>回答内容がここに表示されます。クリックで開閉します。</p>
                        </AccordionContent>
                      </>
                    )}
                  </AccordionItem>
                  <AccordionItem value="item-2" isOpen={openItems.includes('item-2')} onToggle={toggleItem}>
                    {({ isOpen, onToggle }) => (
                      <>
                        <AccordionTrigger isOpen={isOpen} onClick={onToggle}>
                          よくある質問 2
                        </AccordionTrigger>
                        <AccordionContent isOpen={isOpen}>
                          <p>別の回答内容です。キーボード操作は限定的です。</p>
                        </AccordionContent>
                      </>
                    )}
                  </AccordionItem>
                  <AccordionItem value="item-3" isOpen={openItems.includes('item-3')} onToggle={toggleItem}>
                    {({ isOpen, onToggle }) => (
                      <>
                        <AccordionTrigger isOpen={isOpen} onClick={onToggle}>
                          よくある質問 3
                        </AccordionTrigger>
                        <AccordionContent isOpen={isOpen}>
                          <p>さらに別の回答です。ARIA属性は手動実装が必要です。</p>
                        </AccordionContent>
                      </>
                    )}
                  </AccordionItem>
                </>
              )}
            </Accordion>
          </div>
        </div>

        {/* Collapsible - same as accordion single item */}
        <div className="column is-6">
          <div className="box">
            <h3 className="title is-5">Collapsible</h3>
            <p className="content is-small has-text-grey mb-3">
              Accordionと同等の実装
            </p>
            <Accordion type="single">
              {({ openItems, toggleItem }) => (
                <AccordionItem value="details" isOpen={openItems.includes('details')} onToggle={toggleItem}>
                  {({ isOpen, onToggle }) => (
                    <>
                      <AccordionTrigger isOpen={isOpen} onClick={onToggle}>
                        詳細設定を表示
                      </AccordionTrigger>
                      <AccordionContent isOpen={isOpen}>
                        <div className="field">
                          <label className="label">オプション1</label>
                          <input className="input" type="text" placeholder="値を入力" />
                        </div>
                        <div className="field">
                          <label className="label">オプション2</label>
                          <input className="input" type="text" placeholder="値を入力" />
                        </div>
                      </AccordionContent>
                    </>
                  )}
                </AccordionItem>
              )}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
