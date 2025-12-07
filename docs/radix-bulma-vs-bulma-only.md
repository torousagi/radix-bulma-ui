# Radix UI + Bulma vs Bulma単体 コンポーネント比較レポート

## 概要

本ドキュメントは、`components/radix-bulma`と`components/bulma-only`の2つのコンポーネント群をコード面から比較し、中小企業案件での利用に向けた評価と推奨事項をまとめたものです。

---

## 1. 顧客向け説明（非技術者向け）

### 一言でいうと

| 方式 | 例えるなら |
|------|----------|
| **Bulma単体** | 見た目だけ整えた家（内装はDIY） |
| **Radix UI + Bulma** | バリアフリー設計済みの家（設備も標準装備） |

### 具体的な違い

#### キーボード操作

| 操作 | Bulma単体 | Radix UI + Bulma |
|------|-----------|------------------|
| ドロップダウンを矢印キーで移動 | ❌ できない | ✅ できる |
| Escキーでメニューを閉じる | △ 自分で実装が必要 | ✅ 自動で動く |
| Tabキーでの移動順序 | △ 不完全 | ✅ 正しく動く |

**なぜ重要か**: マウスが使えない状況（腱鞘炎、視覚障害、タッチパッド故障）でも操作できます。

#### 画面読み上げソフト対応（アクセシビリティ）

| 機能 | Bulma単体 | Radix UI + Bulma |
|------|-----------|------------------|
| 「メニューが開いています」と読み上げ | ❌ | ✅ |
| ボタンの役割を正しく伝える | △ | ✅ |
| フォーカス位置の管理 | ❌ | ✅ |

**なぜ重要か**:
- 法的要件（障害者差別解消法、将来的なWebアクセシビリティ義務化）
- 高齢者ユーザーへの配慮
- 大企業・官公庁との取引条件になることも

#### 見た目でわかる違い（Select/ドロップダウン）

**Bulma単体**
```
┌─────────────────┐
│ 選択してください  ▼│  ← ブラウザ標準の見た目
└─────────────────┘
    ↓ クリック
┌─────────────────┐
│ りんご           │  ← OS/ブラウザによって
│ みかん           │    見た目が違う
│ ぶどう           │
└─────────────────┘
```

**Radix UI + Bulma**
```
┌─────────────────┐
│ 選択してください  ▼│  ← カスタムデザイン
└─────────────────┘
    ↓ クリック
┌─────────────────┐
│ 🍎 りんご        │  ← どのブラウザでも
│ 🍊 みかん        │    同じ見た目
│ 🍇 ぶどう    ✓  │  ← アイコンも自由に追加可能
└─────────────────┘
```

#### モーダル（ポップアップ画面）の動作

| 動作 | Bulma単体 | Radix UI + Bulma |
|------|-----------|------------------|
| 背景クリックで閉じる | △ 自分で実装 | ✅ 標準動作 |
| 開いている間、後ろの画面を操作できない | ❌ できてしまう | ✅ ブロックされる |
| 閉じた後、元の位置に戻る | ❌ | ✅ 自動で戻る |

#### どちらを選ぶべきか

**Bulma単体で十分なケース**
- 社内システム（利用者が限定的）
- プロトタイプ・検証用
- 予算が非常に限られている

**Radix UI + Bulma を推奨するケース**
- 一般公開するWebサイト・サービス
- 将来的な拡張を見込むシステム
- 大企業・官公庁との取引がある/見込まれる

---

## 2. コード面からの詳細比較

### 2.1 コンポーネント別比較

#### Dialog（モーダル）

| 観点 | Radix + Bulma | Bulma単体 |
|------|---------------|-----------|
| **コード量** | 54行 | 59行 |
| **状態管理** | Radix内部で管理（不要） | `useState` + `useEffect`が必要 |
| **Escキー対応** | 自動 | 手動実装 |
| **フォーカストラップ** | 自動 | ❌ 未実装 |
| **背景クリック閉じ** | 自動 | 手動実装 |
| **Portal** | 自動（DOMの外に配置） | ❌ なし（z-index問題の可能性） |

**評価**: Radix版は機能が多いのにコードが少ない。Bulma版はフォーカストラップがないため、モーダル外にTabで移動できてしまう。

#### Dropdown / DropdownMenu

| 観点 | Radix + Bulma | Bulma単体 |
|------|---------------|-----------|
| **コード量** | 67行 | 63行 |
| **外側クリックで閉じる** | 自動 | `useRef` + `useEffect`で手動実装 |
| **キーボードナビゲーション** | ✅ 矢印キー対応 | ❌ なし |
| **サブメニュー対応** | ✅ Radixが提供 | ❌ 自作が必要 |
| **render props** | 不要 | 必要 |

**評価**: Bulma版のrender propsパターンは使いにくい。呼び出し側のコードが複雑になる。

#### Select（セレクトボックス）

| 観点 | Radix + Bulma | Bulma単体 |
|------|---------------|-----------|
| **コード量** | 63行 | 27行 |
| **見た目** | カスタム（統一可能） | ブラウザネイティブ |
| **タイプアヘッド検索** | ✅ 自動 | ❌ ブラウザ依存 |
| **スクロールボタン** | ✅ あり | 不要（ネイティブ） |
| **グループ化** | ✅ `SelectGroup` | ✅ `<optgroup>` |

**評価**: Bulma版は圧倒的にシンプル。見た目の統一が不要ならBulma版で十分。

#### Accordion

| 観点 | Radix + Bulma | Bulma単体 |
|------|---------------|-----------|
| **コード量** | 52行 | 56行 |
| **状態管理** | Radix内部 | `useState`で手動管理 |
| **single/multiple切替** | props一つで完了 | 手動実装 |
| **アニメーション** | CSS変数で高さ自動計算 | ❌ なし（瞬間表示/非表示） |
| **render props** | 不要 | 必要 |
| **ARIA属性** | 自動付与 | ❌ なし |

**評価**: Bulma版はアニメーションがなく、render propsで使いにくい。

#### Tabs

| 観点 | Radix + Bulma | Bulma単体 |
|------|---------------|-----------|
| **コード量** | 46行 | 39行 |
| **状態管理** | Radix内部 | `useState`で手動管理 |
| **キーボード** | ✅ 矢印キーでタブ移動 | ❌ なし |
| **render props** | 不要 | 必要 |
| **ARIA** | 自動 | ❌ なし |

**評価**: 機能差はあるが、Tabsは両方とも実用レベル。

#### Toast / Notification

| 観点 | Radix + Bulma | Bulma単体 |
|------|---------------|-----------|
| **コード量** | 75行 | 65行 |
| **スワイプで閉じる** | ✅ 自動 | ❌ なし |
| **自動消去** | Radixが管理 | `setTimeout`で手動 |
| **アニメーション** | slide-in/out | ❌ なし（瞬間表示） |
| **スタッキング** | 自動管理 | 手動 |

**評価**: 実用上の差は少ないが、Radix版はスワイプ対応がモバイルで有利。

#### NavigationMenu / Navbar

| 観点 | Radix + Bulma | Bulma単体 |
|------|---------------|-----------|
| **コード量** | 63行 | Navbar.jsx参照 |
| **キーボードナビゲーション** | ✅ 矢印キー・Tab対応 | ❌ なし |
| **ARIA属性** | ✅ 自動付与 | △ 部分的 |
| **ドロップダウン** | ✅ 自動位置調整 | △ CSS依存 |

**評価**: 複雑なナビゲーションにはRadix版推奨。シンプルなヘッダーならBulma版で十分。

#### ContextMenu（右クリックメニュー）

| 観点 | Radix + Bulma | Bulma単体 |
|------|---------------|-----------|
| **コード量** | 84行 | ❌ 未実装 |
| **サブメニュー** | ✅ 対応 | - |
| **位置調整** | ✅ 自動（画面端対応） | - |
| **キーボード** | ✅ 矢印キー対応 | - |

**評価**: Bulma単体では実装が難しい。必要ならRadix版一択。

#### HoverCard

| 観点 | Radix + Bulma | Bulma単体 |
|------|---------------|-----------|
| **コード量** | 32行 | ❌ 未実装 |
| **遅延表示** | ✅ openDelay/closeDelay設定可 | - |
| **位置調整** | ✅ 自動 | - |

**評価**: ユーザープロフィール表示などに便利。Bulma単体では自作が必要。

#### Slider（スライダー）

| 観点 | Radix + Bulma | Bulma単体 |
|------|---------------|-----------|
| **コード量** | 30行 | 24行 |
| **見た目** | カスタム（統一可能） | ブラウザネイティブ |
| **複数サム（範囲選択）** | ✅ 対応 | ❌ 不可 |
| **キーボード** | ✅ 矢印キー対応 | △ ブラウザ依存 |
| **ARIA** | ✅ 自動 | △ ブラウザ依存 |

**評価**: 範囲選択が必要ならRadix版。単一値ならBulma版で十分。

#### Switch（トグルスイッチ）

| 観点 | Radix + Bulma | Bulma単体 |
|------|---------------|-----------|
| **コード量** | 20行 | 26行 |
| **見た目** | カスタム | Bulma拡張依存 |
| **ARIA** | ✅ role="switch"自動 | △ checkbox扱い |
| **キーボード** | ✅ Space/Enter対応 | ✅ チェックボックス同等 |

**評価**: 実用上の差は小さい。どちらでも可。

#### Checkbox

| 観点 | Radix + Bulma | Bulma単体 |
|------|---------------|-----------|
| **コード量** | 22行 | 27行 |
| **見た目** | カスタム（✓アイコン） | ブラウザネイティブ |
| **indeterminate状態** | ✅ 対応 | △ JSで設定必要 |

**評価**: 見た目の統一が必要ならRadix版。そうでなければBulma版で十分。

#### RadioGroup

| 観点 | Radix + Bulma | Bulma単体 |
|------|---------------|-----------|
| **コード量** | 28行 | 26行 |
| **キーボード** | ✅ 矢印キーで選択移動 | ❌ Tab移動のみ |
| **ARIA** | ✅ 自動 | △ 部分的 |
| **render props** | 不要 | 必要 |

**評価**: Radix版の方がキーボード操作が優れている。

#### Progress（進捗バー）

| 観点 | Radix + Bulma | Bulma単体 |
|------|---------------|-----------|
| **コード量** | 26行 | 17行 |
| **見た目** | カスタム（transform） | ネイティブprogress |
| **ARIA** | ✅ 自動 | ✅ ネイティブ対応 |
| **アニメーション** | CSSで自由 | ブラウザ依存 |

**評価**: 実用上の差は小さい。Bulma版の方がシンプル。

#### ScrollArea（カスタムスクロール）

| 観点 | Radix + Bulma | Bulma単体 |
|------|---------------|-----------|
| **コード量** | 18行 | ❌ 未実装 |
| **スクロールバー** | カスタムデザイン可能 | - |
| **水平/垂直** | ✅ 両対応 | - |

**評価**: デザイン統一されたスクロールバーが必要ならRadix版。

#### Toolbar

| 観点 | Radix + Bulma | Bulma単体 |
|------|---------------|-----------|
| **コード量** | 54行 | ❌ 未実装 |
| **キーボード** | ✅ 矢印キーナビゲーション | - |
| **トグルグループ** | ✅ 対応 | - |
| **ARIA** | ✅ toolbar role | - |

**評価**: エディタUIなどに便利。Bulma単体では自作が必要。

### 2.2 総合評価

| 評価軸 | Radix + Bulma | Bulma単体 |
|--------|---------------|-----------|
| **コンポーネント数** | 19種類 | 12種類 |
| **総コード量** | 約760行 | 約430行 |
| **品質（保守性）** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **安定性** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **柔軟性** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

#### 品質（保守性）
- **Radix版**: ロジックがRadixに委譲されているため、自前コードが少なく、バグの入る余地が少ない
- **Bulma版**: render propsパターンが多用されており、呼び出し側が複雑になる。また`useEffect`のクリーンアップ漏れなどのリスクがある

#### 安定性
- **Radix版**: Radix UIは大規模に使われており、エッジケースも対応済み
- **Bulma版**: 自前実装のため、想定外の操作でバグが出やすい（例：高速連打、タブ移動中のクリック等）

#### 柔軟性
- **Radix版**: Radixの仕様に縛られる（例：Selectは必ずPortalを使う、状態管理の方法が決まっている）
- **Bulma版**: 完全に自前なので、どんな仕様変更にも対応可能

### 2.3 使用例の比較

#### Bulma版Accordionの呼び出し（複雑）

```javascript
<Accordion type="single" defaultValue="item-1">
  {({ openItems, toggleItem }) => (
    <AccordionItem value="item-1" isOpen={openItems.includes('item-1')} onToggle={toggleItem}>
      {({ isOpen, onToggle }) => (
        <>
          <AccordionTrigger isOpen={isOpen} onClick={onToggle}>タイトル</AccordionTrigger>
          <AccordionContent isOpen={isOpen}>内容</AccordionContent>
        </>
      )}
    </AccordionItem>
  )}
</Accordion>
```

#### Radix版Accordionの呼び出し（シンプル）

```javascript
<Accordion type="single" defaultValue="item-1">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>タイトル</Accordion.Trigger>
    <Accordion.Content>内容</Accordion.Content>
  </Accordion.Item>
</Accordion>
```

---

## 3. デザイン統一化について

### 実装済み：デフォルトクラスの組み込み

各コンポーネントにBulmaのデフォルトクラスを組み込み済み。これにより：

- 呼び出し側でclassName指定が不要になった
- 案件内でデザインが統一される
- 上書きが必要な場合のみclassNameを指定

### variant props 対応コンポーネント

以下のコンポーネントは `variant` と `size` props でスタイルを制御できます。

| コンポーネント | デフォルト variant | デフォルト size | 追加 props |
|---------------|-------------------|----------------|-----------|
| Dialog.Trigger | `primary` | なし | - |
| Dialog.Close | `light` | なし | - |
| DropdownMenu.Trigger | `light` | なし | - |
| Popover.Trigger | `info` | なし | `light` (default: true) |

#### variant に指定可能な値（Bulma準拠）

- `primary`, `link`, `info`, `success`, `warning`, `danger`, `light`, `dark`
- `null` または空文字でクラスなし

#### size に指定可能な値

- `small`, `normal`, `medium`, `large`

### 使用例

```javascript
// デフォルトのまま使用
<Dialog.Trigger>開く</Dialog.Trigger>              // variant="primary"
<Dialog.Close>キャンセル</Dialog.Close>            // variant="light"

// variant を変更
<Dialog.Close variant="success">保存</Dialog.Close>
<Dialog.Close variant="danger">削除</Dialog.Close>

// size も指定
<Dialog.Trigger variant="primary" size="large">大きいボタン</Dialog.Trigger>

// variant なし（buttonクラスのみ）
<Dialog.Trigger variant={null}>カスタム</Dialog.Trigger>

// Popover: light を外す
<Popover.Trigger variant="warning" light={false}>警告</Popover.Trigger>
```

### その他のコンポーネント（variant 未対応）

| コンポーネント | 固定クラス | 備考 |
|---------------|-----------|------|
| Accordion | `card`, `card-header`, `card-content` | カード形式固定 |
| Collapsible | `card`, `card-header`, `card-content` | カード形式固定 |
| Tabs | `tabs` | centered, boxed は別 props |
| Toast | `notification is-{type}` | type props で色指定 |
| Tooltip | `tag is-dark` | 固定 |

これらはデザインの一貫性を保つため、className での上書きのみ可能です。

---

## 4. コンポーネント別推奨

| コンポーネント | 推奨 | 理由 |
|---------------|------|------|
| Dialog | **Radix版** | フォーカストラップが重要 |
| Select | **Bulma版** | シンプルで十分 |
| Dropdown | **Radix版** | キーボード対応が自動 |
| Accordion | **Radix版** | render propsが不要で使いやすい |
| Tabs | どちらでも可 | 機能差が小さい |
| Toast | どちらでも可（スマホ対応ならRadix版） | スワイプ対応の有無 |
| NavigationMenu | 複雑なら**Radix版** | キーボードナビゲーション対応 |
| ContextMenu | **Radix版のみ** | Bulma単体では未実装 |
| HoverCard | **Radix版のみ** | Bulma単体では未実装 |
| Slider | 範囲選択なら**Radix版** | 複数サム対応の有無 |
| Switch | どちらでも可 | 実用上の差が小さい |
| Checkbox | どちらでも可 | 見た目統一が必要ならRadix版 |
| RadioGroup | **Radix版** | キーボード操作が優れている |
| Progress | **Bulma版** | シンプルで十分 |
| ScrollArea | **Radix版のみ** | Bulma単体では未実装 |
| Toolbar | **Radix版のみ** | Bulma単体では未実装 |

---

## 5. 中小企業案件での結論

### 推奨構成

**Radix + Bulma版をベースに、必要ならBulma版のSelectを併用**

### 理由

1. **Bulma版のrender propsパターンは開発者体験が悪い** - 案件メンバーが混乱しやすい
2. **Radix版は「使い方がシンプル」** - 保守コストが低い
3. **デザイン統一化のための追加ラッパーは不要** - 案件ごとにCSS変数かclassNameで対応

### 現状のままで利用可能な理由

| 項目 | 状態 |
|------|------|
| アクセシビリティ（キーボード操作、ARIA） | ✅ Radix UIが提供 |
| 一貫したAPI設計 | ✅ 全コンポーネント統一パターン |
| 必要十分なコンポーネント | ✅ 一般的なUI要素を網羅 |
| Bulmaとの統合 | ✅ 動作確認済み |

### 「高品質が求められない」なら不要なもの

- TypeScript（JSDocコメントすら不要）
- 自動テスト（手動確認で十分）
- Storybook/ドキュメント（コードが短いので直接読める）

---

## 6. 最小コストで追加すべき改良（任意）

もし少しだけ手を入れるなら：

### ハードコードされた日本語の修正（5分）

`Select.jsx`の`placeholder="選択してください"`をprops化（またはデフォルト値として残す）

### Toast IDの衝突防止（5分）

`Toast.jsx`の`Date.now()`を改善：

```javascript
// 現状でも実用上問題になる可能性は低い
// 気になるなら: id: `${Date.now()}-${Math.random()}`
```

---

## 7. ファイル構成

```
src/components/
├── radix-bulma/           # 推奨（19コンポーネント）
│   ├── index.js
│   ├── Accordion.jsx      (52行)
│   ├── Checkbox.jsx       (22行)
│   ├── Collapsible.jsx    (37行)
│   ├── ContextMenu.jsx    (84行) ← Bulma単体では未実装
│   ├── Dialog.jsx         (54行)
│   ├── DropdownMenu.jsx   (67行)
│   ├── HoverCard.jsx      (32行) ← Bulma単体では未実装
│   ├── NavigationMenu.jsx (63行)
│   ├── Popover.jsx        (41行)
│   ├── Progress.jsx       (26行)
│   ├── RadioGroup.jsx     (28行)
│   ├── ScrollArea.jsx     (18行) ← Bulma単体では未実装
│   ├── Select.jsx         (63行)
│   ├── Slider.jsx         (30行)
│   ├── Switch.jsx         (20行)
│   ├── Tabs.jsx           (46行)
│   ├── Toast.jsx          (75行)
│   ├── Toolbar.jsx        (54行) ← Bulma単体では未実装
│   └── Tooltip.jsx        (30行)
│
└── bulma-only/            # 必要に応じて併用（12コンポーネント）
    ├── index.js
    ├── Accordion.jsx      (56行)
    ├── Checkbox.jsx       (27行)
    ├── Dialog.jsx         (59行)
    ├── Dropdown.jsx       (63行)
    ├── Navbar.jsx
    ├── Notification.jsx   (65行)
    ├── Progress.jsx       (17行) ← シンプルなので併用推奨
    ├── Radio.jsx          (26行)
    ├── Select.jsx         (27行) ← シンプルなので併用推奨
    ├── Slider.jsx         (24行)
    ├── Switch.jsx         (26行)
    └── Tabs.jsx           (39行)
```

---

## 8. まとめ

> **Radix UI は「見えない品質」を提供するもの**

見た目は同じでも、キーボードで操作できる、音声で読み上げられる、どんな人でも使える。これが「アクセシビリティ」であり、Radix UIが自動的に担保してくれる部分です。

Bulma単体でも同じことは実現できますが、**自分で全部作る必要があり、バグなく作るのは非常に難しい**です。

中小企業案件で「動けばいい」レベルなら、**Radix + Bulma版を現状のまま使用して問題ありません**。
