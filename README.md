# Headless UI 比較プロジェクト

Radix UI + Bulma と Bulma のみ、React Hook Form + Zod とバニラ React を比較検証するデモアプリケーションです。

## 起動方法

```bash
npm install
npm run dev
```

---

## プロジェクト構造

```
src/
├── components/
│   ├── radix-bulma-ui/       # 【実開発用】統合版コンポーネント（推奨）
│   ├── radix-bulma/          # Radix UI + Bulma（検証用）
│   ├── radix-bulma-zod/      # Radix UI + Bulma + Zod（検証用）
│   ├── bulma-only/           # Bulma のみ（検証用）
│   ├── form-rhf-zod/         # React Hook Form + Zod フォーム実装
│   └── form-vanilla/         # バニラ React フォーム実装
├── samples/                  # 各コンポーネントのサンプル・比較デモ
├── styles/
│   └── custom.css            # カスタムスタイル（Bulmaを拡張）
└── App.jsx                   # メインアプリケーション
```

---

## 別プロジェクトで再利用する場合

### radix-bulma-ui（統合版・実開発推奨）

**汎用UIとフォーム部品を統合した実開発向けパッケージ。**

別プロジェクトにコピーして使う場合は、このディレクトリをそのままコピーしてください。

```
コピー対象:
  src/components/radix-bulma-ui/  → 別PJの src/components/radix-bulma-ui/

※ CSSファイル (radix-bulma-ui.css) もディレクトリ内に含まれています
```

#### 使用例

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

#### 含まれるコンポーネント

**汎用UI（14種）:**

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

**フォーム部品（8種・forwardRef + error prop対応）:**

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

#### 必要な依存関係

```json
{
  "@radix-ui/react-accordion": "^1.2.11",
  "@radix-ui/react-checkbox": "^1.3.3",
  "@radix-ui/react-collapsible": "^1.1.11",
  "@radix-ui/react-context-menu": "^2.2.14",
  "@radix-ui/react-dialog": "^1.1.13",
  "@radix-ui/react-dropdown-menu": "^2.1.14",
  "@radix-ui/react-hover-card": "^1.1.13",
  "@radix-ui/react-navigation-menu": "^1.2.12",
  "@radix-ui/react-popover": "^1.1.13",
  "@radix-ui/react-progress": "^1.1.7",
  "@radix-ui/react-radio-group": "^1.3.5",
  "@radix-ui/react-scroll-area": "^1.2.8",
  "@radix-ui/react-select": "^2.2.4",
  "@radix-ui/react-slider": "^1.3.5",
  "@radix-ui/react-switch": "^1.2.5",
  "@radix-ui/react-tabs": "^1.1.11",
  "@radix-ui/react-toast": "^1.2.13",
  "@radix-ui/react-toolbar": "^1.1.7",
  "@radix-ui/react-tooltip": "^1.2.6",
  "bulma": "^1.0.4",
  "react-hook-form": "^7.67.0",
  "zod": "^4.1.13"
}
```

---

### 検証用パッケージ（参考）

以下は比較検証用のパッケージです。実開発では `radix-bulma-ui` を使用してください。

#### radix-bulma（汎用UIのみ）

Radix UI + Bulma CSSで構築された汎用UIコンポーネント。

#### radix-bulma-zod（フォーム部品のみ）

React Hook Form + Zod と連携するフォーム専用コンポーネント。

---

## Samplesの比較内容

### 比較1: 基本UIコンポーネント

| 左側 | 右側 |
|------|------|
| RadixBulmaSample.jsx | BulmaOnlySample.jsx |
| **Radix UI + Bulma** | **Bulma のみ** |

| コンポーネント | Radix + Bulma | Bulma のみ |
|---|---|---|
| Dialog | Esc/外クリック/フォーカス管理を**自動処理** | 基本的なEsc/外クリック対応 |
| Dropdown | **キーボードナビゲーション対応** | 基本的なドロップダウン |
| Select | **IME/タイプアヘッド対応** | ネイティブselect要素 |
| Tooltip | フォーカス時も表示・**スクリーンリーダー対応** | Bulmaにはなし（title属性で代替）|
| Toast | **スタック管理・自動クローズ** | カスタム実装の通知 |
| Tabs | **ロービングtabindex・ARIA連携** | クリックでの切り替えのみ |
| Accordion | **Enterキー開閉・矢印キー移動・Home/End対応** | クリックでの開閉のみ |

### 比較2: 追加UIコンポーネント

| 左側 | 右側 |
|------|------|
| RadixBulmaSample2.jsx | BulmaOnlySample2.jsx |
| **Radix UI + Bulma** | **Bulma のみ** |

| コンポーネント | Radix + Bulma | Bulma のみ |
|---|---|---|
| NavigationMenu | **キーボードナビゲーション対応** | Navbar（ホバードロップダウン）|
| ContextMenu | 右クリックメニュー（サブメニュー対応） | Bulmaにはなし |
| HoverCard | ホバーで詳細情報表示 | Bulmaにはなし（title属性で代替）|
| Slider | **キーボード操作・ARIA対応** | ネイティブrange input（スタイルはブラウザ依存）|
| Switch | **アクセシブルなトグル** | Bulma拡張またはカスタムCSSが必要 |
| Checkbox | **アクセシブル** | Bulma標準 |
| RadioGroup | **矢印キー対応** | Bulma標準 |
| Progress | **アクセシブル** | Bulma標準 |
| ScrollArea | **カスタムスクロールバー** | ブラウザ標準スクロール |
| Toolbar | **キーボードナビゲーション対応** | ボタングループ（手動実装必要）|

### 比較3: フォーム実装（RHF比較）

| 左側 | 右側 |
|------|------|
| FormRhfZodSample.jsx | FormVanillaSample.jsx |
| **React Hook Form + Zod** | **バニラ React（useState）** |

検証フォーム: ログイン、登録、お問い合わせ

| 観点 | RHF + Zod | バニラ React |
|---|---|---|
| バリデーション | **Zodスキーマで宣言的** | 手動で条件分岐 |
| 型安全 | **TypeScript完全統合** | 手動管理 |
| 再レンダリング | **最適化済み** | 各入力で全体が再レンダリング |
| API | `register()`でシンプル | onChange毎にsetState |
| 動的フィールド | `useFieldArray`で簡単 | 配列stateを手動管理 |
| 条件付きバリデーション | `refine`で宣言的 | 複雑な条件分岐 |

### 比較4: フォーム実装（Radix比較）

| 左側 | 右側 |
|------|------|
| FormRadixBulmaZodSample.jsx | FormVanillaSample.jsx |
| **Radix UI + Bulma + Zod** | **バニラ React** |

radix-bulma-zodコンポーネント使用:
- Input, Textarea, Select, Checkbox, RadioGroup
- `Controller`でRadixコンポーネントとRHFを連携
- `error` propで統一されたエラー表示

| 観点 | Radix + Bulma + Zod | バニラ React |
|---|---|---|
| アクセシビリティ | **Radix UIが自動対応** | 手動でARIA追加必要 |
| キーボード操作 | **Select/RadioGroupで矢印キー対応** | 標準input依存 |
| エラー表示 | **error propで統一** | 個別にis-dangerクラス付与 |
| RHF連携 | `Controller`で簡単 | - |

---

## このプロジェクトの目的

```
┌──────────────────────────────────────────────────────────────┐
│ 1. Radix UI vs 素のBulma                                     │
│    → アクセシビリティ・キーボード操作の差                       │
│                                                              │
│ 2. React Hook Form + Zod vs useState手動管理                 │
│    → コード量・保守性・パフォーマンスの差                       │
│                                                              │
│ 3. Radix UI + Zod連携 vs 素のReact                           │
│    → フォームUIの完成度・開発体験の差                          │
└──────────────────────────────────────────────────────────────┘
```
