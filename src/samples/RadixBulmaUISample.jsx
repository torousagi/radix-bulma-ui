import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  // 汎用UI
  Dialog,
  Tabs,
  ToastProvider,
  useToast,
  Tooltip,
  TooltipProvider,
  DropdownMenu,
  Popover,
  Accordion,
  Collapsible,
  ContextMenu,
  HoverCard,
  Progress,
  ScrollArea,
  // フォーム部品
  Input,
  Textarea,
  Select,
  SelectItem,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Switch,
  Slider,
  // 新規追加
  Combobox,
  DataTable,
} from '../components/radix-bulma-ui'

// =============================================
// 汎用UIコンポーネントのサンプル
// =============================================

function DialogSample() {
  return (
    <div className="box">
      <h3 className="title is-5">Dialog</h3>
      <p className="is-size-7 has-text-grey mb-3">モーダルダイアログ</p>
      <pre className="is-size-7 mb-3">{`<Dialog>
  <Dialog.Trigger>開く</Dialog.Trigger>
  <Dialog.Content title="タイトル">
    <p>内容</p>
    <Dialog.Footer>
      <Dialog.Close variant="success">OK</Dialog.Close>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog>`}</pre>
      <Dialog>
        <Dialog.Trigger>モーダルを開く</Dialog.Trigger>
        <Dialog.Content title="サンプルダイアログ">
          <p>Escキーまたは外側クリックで閉じます。</p>
          <Dialog.Footer>
            <Dialog.Close variant="success">OK</Dialog.Close>
            <Dialog.Close>キャンセル</Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </div>
  )
}

function TabsSample() {
  return (
    <div className="box">
      <h3 className="title is-5">Tabs</h3>
      <p className="is-size-7 has-text-grey mb-3">タブ切り替え</p>
      <pre className="is-size-7 mb-3">{`<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">タブ1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">タブ2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">内容1</Tabs.Content>
  <Tabs.Content value="tab2">内容2</Tabs.Content>
</Tabs>`}</pre>
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
          <p>詳細タブの内容です。</p>
        </Tabs.Content>
        <Tabs.Content value="tab3">
          <p>設定タブの内容です。</p>
        </Tabs.Content>
      </Tabs>
    </div>
  )
}

function ToastSample() {
  const { addToast } = useToast()

  return (
    <div className="box">
      <h3 className="title is-5">Toast</h3>
      <p className="is-size-7 has-text-grey mb-3">通知トースト</p>
      <pre className="is-size-7 mb-3">{`// App.jsx で ToastProvider で囲む
<ToastProvider>
  <App />
</ToastProvider>

// コンポーネント内で使用
const { addToast } = useToast()
addToast({
  title: '成功',
  description: '保存しました',
  type: 'success', // success | error | warning | info
  duration: 5000
})`}</pre>
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
  )
}

function TooltipSample() {
  return (
    <div className="box">
      <h3 className="title is-5">Tooltip</h3>
      <p className="is-size-7 has-text-grey mb-3">ツールチップ</p>
      <pre className="is-size-7 mb-3">{`<TooltipProvider>
  <Tooltip content="説明テキスト" side="top">
    <button>ホバーしてね</button>
  </Tooltip>
</TooltipProvider>`}</pre>
      <TooltipProvider>
        <div className="buttons">
          <Tooltip content="上に表示" side="top">
            <button className="button">上</button>
          </Tooltip>
          <Tooltip content="右に表示" side="right">
            <button className="button">右</button>
          </Tooltip>
          <Tooltip content="下に表示" side="bottom">
            <button className="button">下</button>
          </Tooltip>
          <Tooltip content="左に表示" side="left">
            <button className="button">左</button>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  )
}

function DropdownMenuSample() {
  const { addToast } = useToast()

  return (
    <div className="box">
      <h3 className="title is-5">DropdownMenu</h3>
      <p className="is-size-7 has-text-grey mb-3">ドロップダウンメニュー</p>
      <pre className="is-size-7 mb-3">{`<DropdownMenu>
  <DropdownMenu.Trigger>メニュー</DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Label>ラベル</DropdownMenu.Label>
    <DropdownMenu.Item onSelect={() => {}}>項目1</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>項目2</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>`}</pre>
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
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  )
}

function PopoverSample() {
  return (
    <div className="box">
      <h3 className="title is-5">Popover</h3>
      <p className="is-size-7 has-text-grey mb-3">ポップオーバー</p>
      <pre className="is-size-7 mb-3">{`<Popover>
  <Popover.Trigger>開く</Popover.Trigger>
  <Popover.Content>
    <Popover.Close />
    <p>内容</p>
  </Popover.Content>
</Popover>`}</pre>
      <Popover>
        <Popover.Trigger>詳細を見る</Popover.Trigger>
        <Popover.Content>
          <Popover.Close />
          <p className="has-text-weight-bold mb-2">追加情報</p>
          <p>ここに詳細な説明を記載できます。</p>
        </Popover.Content>
      </Popover>
    </div>
  )
}

function AccordionSample() {
  return (
    <div className="box">
      <h3 className="title is-5">Accordion</h3>
      <p className="is-size-7 has-text-grey mb-3">折りたたみメニュー</p>
      <pre className="is-size-7 mb-3">{`<Accordion type="single" collapsible>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>タイトル</Accordion.Trigger>
    <Accordion.Content>内容</Accordion.Content>
  </Accordion.Item>
</Accordion>`}</pre>
      <Accordion type="single" collapsible defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>FAQ 1</Accordion.Trigger>
          <Accordion.Content>
            <p>回答内容がここに表示されます。</p>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>FAQ 2</Accordion.Trigger>
          <Accordion.Content>
            <p>別の回答内容です。</p>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

function CollapsibleSample() {
  return (
    <div className="box">
      <h3 className="title is-5">Collapsible</h3>
      <p className="is-size-7 has-text-grey mb-3">開閉コンテナ</p>
      <pre className="is-size-7 mb-3">{`<Collapsible>
  <Collapsible.Trigger>開く</Collapsible.Trigger>
  <Collapsible.Content>内容</Collapsible.Content>
</Collapsible>`}</pre>
      <Collapsible>
        <Collapsible.Trigger>詳細設定を表示</Collapsible.Trigger>
        <Collapsible.Content>
          <p>折りたたまれていた内容です。</p>
        </Collapsible.Content>
      </Collapsible>
    </div>
  )
}

function ContextMenuSample() {
  return (
    <div className="box">
      <h3 className="title is-5">ContextMenu</h3>
      <p className="is-size-7 has-text-grey mb-3">右クリックメニュー</p>
      <pre className="is-size-7 mb-3">{`<ContextMenu>
  <ContextMenu.Trigger>
    <div>右クリックエリア</div>
  </ContextMenu.Trigger>
  <ContextMenu.Content>
    <ContextMenu.Item onSelect={() => {}}>コピー</ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu>`}</pre>
      <ContextMenu>
        <ContextMenu.Trigger>
          <div className="context-menu-area">
            この領域を右クリック
          </div>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Label>編集</ContextMenu.Label>
          <ContextMenu.Item onSelect={() => alert('コピー')}>コピー</ContextMenu.Item>
          <ContextMenu.Item onSelect={() => alert('切り取り')}>切り取り</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item onSelect={() => alert('削除')}>削除</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu>
    </div>
  )
}

function HoverCardSample() {
  return (
    <div className="box">
      <h3 className="title is-5">HoverCard</h3>
      <p className="is-size-7 has-text-grey mb-3">ホバーで詳細表示</p>
      <pre className="is-size-7 mb-3">{`<HoverCard>
  <HoverCard.Trigger>
    <a>@username</a>
  </HoverCard.Trigger>
  <HoverCard.Content>
    <p>ユーザー情報</p>
  </HoverCard.Content>
</HoverCard>`}</pre>
      <p>
        <HoverCard>
          <HoverCard.Trigger>
            <a className="has-text-link">@user_name</a>
          </HoverCard.Trigger>
          <HoverCard.Content>
            <p className="has-text-weight-bold">User Name</p>
            <p className="is-size-7 has-text-grey">ソフトウェアエンジニア</p>
          </HoverCard.Content>
        </HoverCard>
        さんがコメントしました。
      </p>
    </div>
  )
}

function ProgressSample() {
  const [value, setValue] = useState(60)

  return (
    <div className="box">
      <h3 className="title is-5">Progress</h3>
      <p className="is-size-7 has-text-grey mb-3">進捗バー</p>
      <pre className="is-size-7 mb-3">{`<Progress value={60} max={100} color="is-primary" />`}</pre>
      <Progress value={value} color="is-primary" />
      <div className="buttons mt-3">
        <button className="button is-small" onClick={() => setValue(Math.max(0, value - 10))}>
          -10%
        </button>
        <button className="button is-small" onClick={() => setValue(Math.min(100, value + 10))}>
          +10%
        </button>
      </div>
    </div>
  )
}

function ScrollAreaSample() {
  return (
    <div className="box">
      <h3 className="title is-5">ScrollArea</h3>
      <p className="is-size-7 has-text-grey mb-3">カスタムスクロールバー</p>
      <pre className="is-size-7 mb-3">{`<ScrollArea style={{ height: 150 }}>
  <div>長いコンテンツ...</div>
</ScrollArea>`}</pre>
      <ScrollArea style={{ height: 150 }}>
        <div style={{ padding: '1rem' }}>
          {Array.from({ length: 15 }, (_, i) => (
            <p key={i} className="mb-2">アイテム {i + 1}</p>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

function ComboboxSample() {
  const [single, setSingle] = useState(null)
  const [multi, setMulti] = useState([])

  const options = [
    { value: 'tokyo', label: '東京' },
    { value: 'osaka', label: '大阪' },
    { value: 'nagoya', label: '名古屋' },
    { value: 'fukuoka', label: '福岡' },
    { value: 'sapporo', label: '札幌' },
    { value: 'sendai', label: '仙台' },
    { value: 'hiroshima', label: '広島' },
    { value: 'kyoto', label: '京都' },
  ]

  return (
    <div className="box">
      <h3 className="title is-5">Combobox</h3>
      <p className="is-size-7 has-text-grey mb-3">検索付き選択</p>
      <pre className="is-size-7 mb-3">{`<Combobox
  label="都市"
  options={options}
  value={selected}
  onChange={setSelected}
  clearable
/>

// 複数選択
<Combobox.Multi
  label="都市（複数）"
  options={options}
  value={selected}
  onChange={setSelected}
/>`}</pre>
      <div className="columns">
        <div className="column">
          <Combobox
            label="都市"
            options={options}
            value={single}
            onChange={setSingle}
            clearable
          />
          <p className="is-size-7 mt-2">選択: {single || '未選択'}</p>
        </div>
        <div className="column">
          <Combobox.Multi
            label="都市（複数選択）"
            options={options}
            value={multi}
            onChange={setMulti}
          />
          <p className="is-size-7 mt-2">選択: {multi.join(', ') || '未選択'}</p>
        </div>
      </div>
    </div>
  )
}

function DataTableSample() {
  const data = [
    { id: 1, name: '田中太郎', email: 'tanaka@example.com', role: '管理者', status: '有効' },
    { id: 2, name: '鈴木花子', email: 'suzuki@example.com', role: '編集者', status: '有効' },
    { id: 3, name: '佐藤一郎', email: 'sato@example.com', role: '閲覧者', status: '無効' },
    { id: 4, name: '高橋美咲', email: 'takahashi@example.com', role: '編集者', status: '有効' },
    { id: 5, name: '伊藤健太', email: 'ito@example.com', role: '閲覧者', status: '有効' },
  ]

  const columns = [
    { accessorKey: 'id', header: 'ID', size: 60 },
    { accessorKey: 'name', header: '名前' },
    { accessorKey: 'email', header: 'メール' },
    { accessorKey: 'role', header: '権限' },
    {
      accessorKey: 'status',
      header: 'ステータス',
      cell: ({ getValue }) => (
        <span className={`tag ${getValue() === '有効' ? 'is-success' : 'is-light'}`}>
          {getValue()}
        </span>
      ),
    },
  ]

  return (
    <div className="box">
      <h3 className="title is-5">DataTable</h3>
      <p className="is-size-7 has-text-grey mb-3">データテーブル（TanStack Table）</p>
      <pre className="is-size-7 mb-3">{`const columns = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: '名前' },
  {
    accessorKey: 'status',
    header: 'ステータス',
    cell: ({ getValue }) => <span>{getValue()}</span>
  },
]

<DataTable
  data={data}
  columns={columns}
  enableSorting
  enableFiltering
  enablePagination
  pageSize={10}
/>`}</pre>
      <DataTable
        data={data}
        columns={columns}
        enableSorting
        enableFiltering
        enablePagination
        pageSize={3}
      />
    </div>
  )
}

// =============================================
// フォーム部品のサンプル
// =============================================

const sampleSchema = z.object({
  name: z.string().min(1, '名前は必須です'),
  email: z.string().min(1, 'メールは必須です').email('有効なメールアドレスを入力'),
  message: z.string().min(10, '10文字以上入力してください'),
  category: z.string().min(1, 'カテゴリを選択してください'),
  priority: z.enum(['low', 'medium', 'high']),
  agree: z.literal(true, { errorMap: () => ({ message: '同意が必要です' }) }),
  notify: z.boolean(),
  volume: z.array(z.number()),
})

function FormSample() {
  const { addToast } = useToast()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(sampleSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      category: '',
      priority: 'medium',
      agree: false,
      notify: false,
      volume: [50],
    },
  })

  const onSubmit = (data) => {
    addToast({ title: '送信成功', description: JSON.stringify(data), type: 'success' })
  }

  return (
    <div className="box">
      <h3 className="title is-5">フォーム部品（React Hook Form + Zod連携）</h3>
      <p className="is-size-7 has-text-grey mb-3">
        forwardRef + error prop でバリデーション対応
      </p>

      <div className="columns">
        <div className="column is-6">
          <h4 className="title is-6">使用例</h4>
          <pre className="is-size-7">{`// Input
<Input
  label="名前"
  error={errors.name?.message}
  {...register('name')}
/>

// Textarea
<Textarea
  label="メッセージ"
  error={errors.message?.message}
  {...register('message')}
/>

// Select (Controller使用)
<Controller
  name="category"
  control={control}
  render={({ field }) => (
    <Select
      label="カテゴリ"
      value={field.value}
      onValueChange={field.onChange}
      error={errors.category?.message}
    >
      <SelectItem value="general">一般</SelectItem>
      <SelectItem value="support">サポート</SelectItem>
    </Select>
  )}
/>

// RadioGroup (Controller使用)
<Controller
  name="priority"
  control={control}
  render={({ field }) => (
    <RadioGroup
      label="優先度"
      value={field.value}
      onValueChange={field.onChange}
    >
      <RadioGroupItem value="low" label="低" />
      <RadioGroupItem value="medium" label="中" />
      <RadioGroupItem value="high" label="高" />
    </RadioGroup>
  )}
/>

// Checkbox (Controller使用)
<Controller
  name="agree"
  control={control}
  render={({ field }) => (
    <Checkbox
      label="利用規約に同意"
      checked={field.value}
      onCheckedChange={field.onChange}
      error={errors.agree?.message}
    />
  )}
/>

// Switch (Controller使用)
<Controller
  name="notify"
  control={control}
  render={({ field }) => (
    <Switch
      label="通知を受け取る"
      checked={field.value}
      onCheckedChange={field.onChange}
    />
  )}
/>

// Slider (Controller使用)
<Controller
  name="volume"
  control={control}
  render={({ field }) => (
    <Slider
      label="音量"
      value={field.value}
      onValueChange={field.onChange}
    />
  )}
/>`}</pre>
        </div>

        <div className="column is-6">
          <h4 className="title is-6">実際のフォーム</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="名前"
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

            <Textarea
              label="メッセージ"
              placeholder="10文字以上"
              rows={3}
              error={errors.message?.message}
              {...register('message')}
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
                  <SelectItem value="general">一般</SelectItem>
                  <SelectItem value="support">サポート</SelectItem>
                  <SelectItem value="sales">営業</SelectItem>
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

            <Controller
              name="agree"
              control={control}
              render={({ field }) => (
                <Checkbox
                  label="利用規約に同意する"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  error={errors.agree?.message}
                />
              )}
            />

            <Controller
              name="notify"
              control={control}
              render={({ field }) => (
                <Switch
                  label="通知を受け取る"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />

            <Controller
              name="volume"
              control={control}
              render={({ field }) => (
                <Slider
                  label={`音量: ${field.value[0]}%`}
                  value={field.value}
                  onValueChange={field.onChange}
                  max={100}
                  step={1}
                />
              )}
            />

            <div className="field mt-4">
              <button type="submit" className="button is-primary">
                送信
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// =============================================
// メインコンポーネント
// =============================================

export function RadixBulmaUISample() {
  return (
    <ToastProvider>
      <div className="sample-section">
        <h2 className="title is-3">radix-bulma-ui コンポーネント一覧</h2>
        <p className="subtitle is-6 has-text-grey">
          統合版パッケージ - 汎用UI + フォーム部品
        </p>

        <div className="notification is-info is-light">
          <p className="has-text-weight-bold mb-2">インポート方法</p>
          <pre className="is-size-7">
            {
              ` 
使用方法:
 import 'bulma/css/bulma.min.css'
 import './components/radix-bulma-ui/radix-bulma-ui.css'
              `
            }
          </pre>
          <pre className="is-size-7">{`import {
  Dialog, Tabs, Toast, useToast, Tooltip, TooltipProvider,
  DropdownMenu, Popover, Accordion, Collapsible,
  ContextMenu, HoverCard, Progress, ScrollArea,
  Input, Textarea, Select, SelectItem,
  Checkbox, RadioGroup, RadioGroupItem, Switch, Slider,
} from './components/radix-bulma-ui'`}</pre>
        </div>

        <hr />

        <h3 className="title is-4">汎用UIコンポーネント</h3>

        <div className="columns is-multiline">
          <div className="column is-6"><DialogSample /></div>
          <div className="column is-6"><TabsSample /></div>
          <div className="column is-6"><ToastSample /></div>
          <div className="column is-6"><TooltipSample /></div>
          <div className="column is-6"><DropdownMenuSample /></div>
          <div className="column is-6"><PopoverSample /></div>
          <div className="column is-6"><AccordionSample /></div>
          <div className="column is-6"><CollapsibleSample /></div>
          <div className="column is-6"><ContextMenuSample /></div>
          <div className="column is-6"><HoverCardSample /></div>
          <div className="column is-6"><ProgressSample /></div>
          <div className="column is-6"><ScrollAreaSample /></div>
        </div>

        <hr />

        <h3 className="title is-4">フォーム部品</h3>
        <FormSample />

        <hr />

        <h3 className="title is-4">拡張コンポーネント</h3>
        <div className="columns is-multiline">
          <div className="column is-12"><ComboboxSample /></div>
          <div className="column is-12"><DataTableSample /></div>
        </div>
      </div>
    </ToastProvider>
  )
}
