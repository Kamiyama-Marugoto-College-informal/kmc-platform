# DESIGN.md

This file encodes the design system of kmc-platform for AI coding agents.
Refer to this file when generating or modifying any UI.

---

## 1. Visual Theme & Atmosphere

Google AI Studio / Gemini に近いライトサーフェス + Google Blue アクセントのデザイン。
Material Design のセマンティックトークンに準拠し、情報密度は中程度。
ダークモードは `html.dark` クラスで切り替わる（next-themes 管理、`prefers-color-scheme` 非使用）。

- **密度**: 中程度（コンパクトではなく、スペースを適度に確保）
- **トーン**: プロフェッショナル・クリーン。過度な装飾なし
- **角丸**: 全体的に丸みを帯びたデザイン（基本 `0.75rem`）
- **サイドバー**: 常にダーク（`bg-zinc-900`）、ライト/ダークモード共通

---

## 2. Color Palette & Roles

すべての色は CSS カスタムプロパティ（`var(--token)`）で参照すること。Tailwind クラスに直接 hex を書かない。

### Light Mode (`:root`)

| Token                      | Hex       | 用途                                   |
| -------------------------- | --------- | -------------------------------------- |
| `--background`             | `#f8f9fa` | ページ背景                             |
| `--foreground`             | `#202124` | プライマリテキスト                     |
| `--card`                   | `#ffffff` | カード・パネル背景                     |
| `--card-foreground`        | `#202124` | カード内テキスト                       |
| `--popover`                | `#ffffff` | ポップオーバー・ドロップダウン背景     |
| `--primary`                | `#1a73e8` | Google Blue — CTA・フォーカスリング    |
| `--primary-foreground`     | `#ffffff` | primary 背景上のテキスト               |
| `--secondary`              | `#e8f0fe` | 薄い Blue — サブアクション・バッジ背景 |
| `--secondary-foreground`   | `#174ea6` | secondary 背景上のテキスト             |
| `--muted`                  | `#f1f3f4` | 非アクティブ背景・コードブロック       |
| `--muted-foreground`       | `#5f6368` | セカンダリテキスト・プレースホルダ     |
| `--accent`                 | `#e8f0fe` | ホバー・選択状態のハイライト           |
| `--accent-foreground`      | `#174ea6` | accent 背景上のテキスト                |
| `--destructive`            | `#d93025` | エラー・削除                           |
| `--destructive-foreground` | `#ffffff` | destructive 背景上のテキスト           |
| `--border`                 | `#dadce0` | 境界線・区切り線                       |
| `--input`                  | `#dadce0` | 入力フィールドの枠線                   |
| `--ring`                   | `#1a73e8` | フォーカスリング                       |

**チャートカラー（ライト）**:

| Token       | Hex       |
| ----------- | --------- |
| `--chart-1` | `#4285f4` |
| `--chart-2` | `#ea4335` |
| `--chart-3` | `#fbbc04` |
| `--chart-4` | `#34a853` |
| `--chart-5` | `#9334e6` |

**ロールカラー（ライト）**:

| Token            | Hex       | 役割     |
| ---------------- | --------- | -------- |
| `--role-student` | `#1a73e8` | 学生     |
| `--role-staff`   | `#188038` | スタッフ |
| `--role-admin`   | `#e37400` | 管理者   |

### Dark Mode (`html.dark`)

| Token                    | Hex       |
| ------------------------ | --------- |
| `--background`           | `#131314` |
| `--foreground`           | `#e8eaed` |
| `--card`                 | `#1e1f20` |
| `--primary`              | `#8ab4f8` |
| `--secondary`            | `#303134` |
| `--secondary-foreground` | `#e8eaed` |
| `--muted`                | `#303134` |
| `--muted-foreground`     | `#9aa0a6` |
| `--accent`               | `#303134` |
| `--destructive`          | `#f28b82` |
| `--border`               | `#3c4043` |
| `--ring`                 | `#8ab4f8` |

ロールカラー（ダーク）: student `#8ab4f8` / staff `#81c995` / admin `#fcbc51`

---

## 3. Typography Rules

### フォントファミリー

| 変数                             | スタック                                                          | 用途                             |
| -------------------------------- | ----------------------------------------------------------------- | -------------------------------- |
| `--font-sans` (`--font-heading`) | `'Zen Kaku Gothic Antique', ui-sans-serif, system-ui, sans-serif` | 全テキスト・見出し               |
| Geist Variable                   | `@fontsource-variable/geist`                                      | 英数字アクセント（必要に応じて） |
| monospace                        | ブラウザデフォルト                                                | `code` 要素                      |

### タイポグラフィスケール

| 要素             | サイズ                      | ウェイト      | その他                                  |
| ---------------- | --------------------------- | ------------- | --------------------------------------- |
| `h1`             | `text-2xl` (1.5rem / 24px)  | `font-medium` | `tracking-tight`, `leading-tight`       |
| `h2`             | `text-xl` (1.25rem / 20px)  | `font-medium` | `tracking-tight`, `leading-snug`        |
| `h3`             | （h2 と同スタイル）         | `font-medium` |                                         |
| body / default   | `text-sm` (0.875rem / 14px) | regular       | `leading-relaxed`                       |
| card description | `text-sm`                   | regular       | `text-muted-foreground`                 |
| code             | `text-[0.9375rem]`          | monospace     | `bg-muted`, `rounded-md`, `px-2 py-0.5` |

- ベースフォントサイズ: `1rem` (16px)
- ベース行高: `1.5`
- アンチエイリアス: `-webkit-font-smoothing: antialiased`

---

## 4. Component Stylings

### Button

バリアント:

| variant       | スタイル                                                     |
| ------------- | ------------------------------------------------------------ |
| `default`     | `bg-primary text-primary-foreground`                         |
| `outline`     | `border-border bg-background hover:bg-muted`                 |
| `secondary`   | `bg-secondary text-secondary-foreground`                     |
| `ghost`       | `hover:bg-muted hover:text-foreground`                       |
| `destructive` | `bg-destructive/10 text-destructive hover:bg-destructive/20` |
| `link`        | `text-primary underline-offset-4 hover:underline`            |

サイズ: `xs` (h-6) / `sm` (h-7) / `default` (h-8) / `lg` (h-9) / `icon` (size-8) / `icon-sm` / `icon-lg`

共通: `rounded-lg`, `text-sm`, `font-medium`, `transition-all`, フォーカスリング `ring-3 ring-ring/50`

### Card

```
rounded-xl bg-card py-4
shadow-[0_1px_2px_0_rgba(60,64,67,0.15),0_1px_3px_1px_rgba(60,64,67,0.08)]
ring-1 ring-border/70
```

- ダークモード: `shadow-[0_1px_2px_0_rgba(0,0,0,0.35)]`
- `CardFooter`: `bg-muted/50 border-t`
- サイズバリアント `sm`: padding・gap が一回り小さい

### Sidebar（固定 Dark サイドバー）

- 背景: `bg-zinc-900`（ライト/ダーク共通）
- 形状: `rounded-3xl`、`fixed left-4 top-4 bottom-4`
- 幅: モバイル `w-20`（80px）/ デスクトップ `lg:w-64`（256px）
- 選択中のナビアイテム: `bg-white text-zinc-900 shadow-lg`
- 非選択のホバー: `hover:bg-white/10`
- ロゴエリア: `bg-white/10 rounded-xl backdrop-blur-sm`

### Input / Form

- ボーダー: `border-input` (`#dadce0` / `#3c4043`)
- フォーカス: `ring-ring`
- エラー状態: `aria-invalid` 属性で `border-destructive ring-destructive/20`

### Avatar / UserAvatar

- ロールに対応したカラードット（`--role-*` トークン使用）

---

## 5. Layout Principles

### スペーシング

Tailwind のデフォルト 4px ベースユニットを使用。

| 用途                                     | クラス              |
| ---------------------------------------- | ------------------- |
| カード内パディング                       | `px-4 py-4`         |
| セクション間マージン                     | `mb-4`, `space-y-4` |
| サイドバーオフセット（メインコンテンツ） | `pl-28 lg:pl-72`    |
| ページパディング                         | `pr-4 py-4`         |

### グリッド・コンテナ

- メインレイアウト: サイドバー固定 + コンテンツエリア（左余白で調整）
- レスポンシブは主に `lg:` ブレークポイントで分岐（768px 未満 = モバイル扱い）
- `min-h-svh` で最小高さを確保

---

## 6. Depth & Elevation

| レベル | 適用箇所                       | Shadow                                                             |
| ------ | ------------------------------ | ------------------------------------------------------------------ |
| 0      | フラットな背景要素             | なし                                                               |
| 1      | Card                           | `0_1px_2px rgba(60,64,67,0.15), 0_1px_3px_1px rgba(60,64,67,0.08)` |
| 2      | Sidebar                        | `shadow-2xl shadow-zinc-900/20`                                    |
| 3      | ドロップダウン・ポップオーバー | shadcn デフォルト shadow                                           |

- ダーク時はシャドウを強めに: `shadow-[0_1px_2px_0_rgba(0,0,0,0.35)]`
- `ring-1 ring-border/70` でカードの境界を補強（シャドウだけに頼らない）

---

## 7. Do's and Don'ts

### Do

- カラーは必ず CSS トークン（`var(--primary)` or Tailwind `text-primary`）で参照する
- ダークモード対応は `dark:` プレフィックスで行う（メディアクエリ不使用）
- フォームの無効状態は `disabled:opacity-50 disabled:pointer-events-none`
- アクセシビリティ: `aria-label` を icon-only ボタンに付与する
- ロール表示には `--role-student` / `--role-staff` / `--role-admin` トークンを使う

### Don't

- 直接 hex カラー（`#1a73e8` など）をクラスやインラインスタイルに書かない
- `prefers-color-scheme` メディアクエリを使わない（next-themes の `html.dark` と競合）
- shadcn UI コンポーネントの内部実装を直接変更せず、`className` で上書きする
- サイドバーの背景色をテーマに追従させない（常に dark のまま維持）

---

## 8. Responsive Behavior

| ブレークポイント        | Tailwind   | 主な変化                            |
| ----------------------- | ---------- | ----------------------------------- |
| モバイル (< 1024px)     | デフォルト | サイドバー幅 80px、アイコンのみ表示 |
| デスクトップ (≥ 1024px) | `lg:`      | サイドバー幅 256px、ラベル表示      |

- タッチターゲット: サイドバーのナビアイテムは最小 `w-12 h-12` (48×48px)
- モバイルでのラベル非表示: `hidden lg:block`
- コンテンツのサイドバーオフセット: `pl-28` (モバイル) → `lg:pl-72` (デスクトップ)

---

## 9. Agent Prompt Guide

### カラーリファレンス（クイック参照）

```
primary action    → bg-primary text-primary-foreground
subtle blue       → bg-secondary text-secondary-foreground
page background   → bg-background
card surface      → bg-card
disabled/muted    → text-muted-foreground
danger            → text-destructive / bg-destructive/10
border            → border-border
```

### コンポーネント生成時のプロンプト例

```
このプロジェクトの DESIGN.md に従い、Google Material Design スタイルの
[コンポーネント名] を実装してください。
- カラーは CSS トークン（bg-primary, text-muted-foreground 等）を使用
- 角丸は rounded-xl または rounded-lg
- shadcn/ui の既存コンポーネント（Button, Card 等）を優先して使用
- ダークモードは dark: プレフィックスで対応
```

### テーマ変更時の注意

テーマトークンの追加・変更は `src/index.css` の `:root` と `html.dark` の両方に行うこと。
Tailwind `@theme inline` ブロックへの登録も忘れずに。
