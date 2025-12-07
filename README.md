# radix-bulma-ui (comparison branch)

このブランチは **比較検証用** です。

コンポーネントを使用したい場合は `main` ブランチを参照してください。

```bash
git checkout main
```

---

## このブランチの目的

Radix UI + Bulma と Bulma のみ、React Hook Form + Zod とバニラ React を比較検証するデモアプリケーションです。

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

## 比較内容

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

## ライセンス

MIT
