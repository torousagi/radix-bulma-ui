# radix-bulma-zod

Radix UI + Bulma コンポーネントに Zod エラー表示機能を追加した薄ラッパー。

## 概要

このディレクトリには**フォーム入力に関連するコンポーネントのみ**含まれています。
各コンポーネントは `error` prop を受け取り、Zod バリデーションエラーを表示できます。

## 含まれるコンポーネント

| コンポーネント | 説明 |
|---------------|------|
| `FormField` | 共通ラッパー（label + error 表示） |
| `Input` | テキスト入力（forwardRef 対応） |
| `Textarea` | テキストエリア |
| `Select` | Radix Select + error |
| `Checkbox` | Radix Checkbox + error |
| `Switch` | Radix Switch + error |
| `RadioGroup` | Radix RadioGroup + error |
| `Slider` | Radix Slider + error |

## 含まれないコンポーネント

以下のコンポーネントはフォームバリデーションのエラー表示とは無関係なため、このディレクトリには含まれていません。
これらは `radix-bulma` からそのままインポートして使用してください。

- Dialog, Popover, DropdownMenu, Tooltip, Toast
- Tabs, Accordion, Collapsible
- NavigationMenu, ContextMenu, HoverCard
- Progress, ScrollArea, Toolbar

## 使用例

### Input（register で直接連携）

```jsx
import { Input } from '../components/radix-bulma-zod'

<Input
  label="メールアドレス"
  type="email"
  placeholder="example@email.com"
  error={errors.email?.message}
  {...register('email')}
/>
```

### Select（Controller でラップ）

```jsx
import { Controller } from 'react-hook-form'
import { Select, SelectItem } from '../components/radix-bulma-zod'

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
    </Select>
  )}
/>
```

### Checkbox（Controller でラップ）

```jsx
<Controller
  name="agreeTerms"
  control={control}
  render={({ field }) => (
    <Checkbox
      label="利用規約に同意する"
      checked={field.value}
      onCheckedChange={field.onChange}
      error={errors.agreeTerms?.message}
    />
  )}
/>
```

### RadioGroup（Controller でラップ）

```jsx
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
      <RadioGroup.Item value="low" label="低" />
      <RadioGroup.Item value="medium" label="中" />
      <RadioGroup.Item value="high" label="高" />
    </RadioGroup>
  )}
/>
```

## 注意事項

- `Input`, `Textarea` は `forwardRef` 対応のため、RHF の `register()` と直接連携可能
- `Select`, `Checkbox`, `Switch`, `RadioGroup`, `Slider` は非標準 input のため、`Controller` でラップして使用
- エラー時は Bulma の `is-danger` クラスと `help is-danger` でスタイリング
