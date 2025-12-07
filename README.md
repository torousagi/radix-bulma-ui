# radix-bulma-ui

Radix UI + Bulma CSS で構築されたアクセシブルなUIコンポーネントライブラリ。

フォーム部品は `forwardRef` + `error` prop 対応で、React Hook Form と簡単に連携できます。

## デモ

```bash
npm install
npm run dev
```

## 使い方

### 1. ディレクトリをコピー

```
src/components/radix-bulma-ui/  →  あなたのプロジェクトの src/components/radix-bulma-ui/
```

### 2. 依存関係をインストール

```bash
npm install bulma @radix-ui/react-accordion @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toolbar @radix-ui/react-tooltip
```

### 3. インポート

```jsx
// CSS読み込み
import 'bulma/css/bulma.min.css'
import './components/radix-bulma-ui/radix-bulma-ui.css'

// コンポーネント読み込み
import {
  // 汎用UI
  Dialog,
  Tabs,
  Toast,
  useToast,
  Tooltip,
  TooltipProvider,
  DropdownMenu,
  Accordion,

  // フォーム部品（forwardRef + error prop対応）
  Input,
  Textarea,
  Select,
  SelectItem,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Switch,
  Slider,
} from './components/radix-bulma-ui'
```

---

## 含まれるコンポーネント

### 汎用UI（14種）

| コンポーネント | 用途 |
|---|---|
| Dialog | モーダルダイアログ |
| Tabs | タブ切り替え |
| Toast / useToast | 通知トースト |
| Tooltip | ツールチップ |
| DropdownMenu | ドロップダウンメニュー |
| Popover | ポップアップ |
| Accordion | 折りたたみ |
| Collapsible | 開閉コンテナ |
| NavigationMenu | サイトナビゲーション |
| ContextMenu | 右クリックメニュー |
| HoverCard | ホバーカード |
| Progress | 進捗バー |
| ScrollArea | スクロールエリア |
| Toolbar | ツールバー |

### フォーム部品（8種・forwardRef + error prop対応）

| コンポーネント | 用途 |
|---|---|
| FormField | フィールドラッパー |
| Input | テキスト入力 |
| Textarea | 複数行テキスト |
| Select | ドロップダウン選択 |
| Checkbox | チェックボックス |
| RadioGroup | ラジオボタン |
| Switch | トグルスイッチ |
| Slider | スライダー |

---

## React Hook Form との連携例

```jsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input, Select, SelectItem, Checkbox } from './components/radix-bulma-ui'

const schema = z.object({
  name: z.string().min(1, '必須です'),
  category: z.string().min(1, '選択してください'),
  agree: z.boolean().refine(v => v, '同意が必要です'),
})

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <Input
        label="名前"
        {...register('name')}
        error={errors.name?.message}
      />

      <Select label="カテゴリ" error={errors.category?.message}>
        <SelectItem value="a">オプションA</SelectItem>
        <SelectItem value="b">オプションB</SelectItem>
      </Select>

      <Checkbox
        label="利用規約に同意する"
        {...register('agree')}
        error={errors.agree?.message}
      />

      <button type="submit" className="button is-primary">送信</button>
    </form>
  )
}
```

---

## 比較検証ブランチ

Radix UI + Bulma と Bulma のみ、RHF + Zod とバニラ React の比較検証は `comparison` ブランチを参照してください。

```bash
git checkout comparison
```

---

## ライセンス

MIT
