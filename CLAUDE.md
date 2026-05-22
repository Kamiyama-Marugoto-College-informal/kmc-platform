# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## コマンド

パッケージマネージャは **bun** を使用。

```sh
bun install        # 依存パッケージのインストール
bun run dev        # 開発サーバー起動 (port 3000)
bun run build      # vinxi build
bun run preview    # ビルド済みアプリをプレビュー
bun run check      # 型チェックのみ (tsc --noEmit)
bun run lint       # Prettier + ESLint チェック
bun run format     # Prettier フォーマット
```

## アーキテクチャ概要

### スタック

- **SolidStart 1.x + SolidJS + TypeScript**（SPA モード: `ssr: false`）
- **Tailwind CSS v4** + **Vite** (vinxi 経由)
- **Supabase Auth**（クライアントサイドのみ）
- パッケージマネージャ: **bun**

### エントリポイント

`src/app.tsx` → `<Router>` + `<FileRoutes />` を mount。`onMount` で `initAuth()` / クリーンアップで `destroyAuth()` を呼び出す。

### ルーティング構造（ファイルベース）

```
src/routes/
├── index.tsx            → / （/dashboard にリダイレクト）
├── login.tsx            → /login（未認証ユーザー向け）
├── (app).tsx            → 認証ガード付き共通レイアウト（Sidebar + ThemeToggle）
└── (app)/
    ├── dashboard.tsx    → /dashboard
    ├── notifications.tsx → /notifications
    ├── schedule.tsx     → /schedule（週カレンダー）
    └── profile/
        └── settings.tsx → /profile/settings
```

### 認証 (`src/lib/stores/auth.ts`)

- **Supabase Auth** を使用。`supabase.auth.onAuthStateChange` でセッション監視
- サインイン後に `profiles` テーブルをクエリしてロール (`student` / `staff` / `admin`) を取得
- `VITE_ALLOWED_DOMAIN` 環境変数でメールドメインを制限（admin は除外）
- `AppUser` 型: `{ id, name, email, image?, role }`
- エクスポート: `user()`, `isLoading()`, `authError()` signals + `initAuth()` / `destroyAuth()` / `signOut()`

### 状態管理

SolidJS の signals / memo を使用（React state / Svelte store は不使用）:

- `src/lib/stores/auth.ts`: `createSignal` で `user`, `isLoading`, `authError` を管理
- `src/lib/stores/theme.ts`: `theme` signal + `resolvedTheme()` memo。モジュールロード時に DOM に適用、`matchMedia` で system テーマ変化を監視
- `src/lib/i18n/index.ts`: `language` signal + `tStore` createMemo。`setLanguage()` で localStorage と `document.documentElement.lang` を更新

### 国際化 (`src/lib/i18n/`)

- `ja` / `en` の 2 言語対応
- `tStore()(key)` 形式でドット区切りキーを使って翻訳文字列を取得
- 翻訳定義: `src/lib/i18n/ja.ts`, `src/lib/i18n/en.ts`

### UI コンポーネント (`src/lib/components/`)

- 純粋な **Tailwind CSS** クラスで実装（shadcn/ui は不使用）
- **lucide-solid** をアイコンライブラリとして使用
- テーマ切り替えは `theme` store で自前管理（next-themes は不使用）
- `~` エイリアスは `src/` を指す

デザインシステムの詳細（カラートークン・タイポグラフィ・コンポーネント仕様）は **`DESIGN.md`** を参照。UI を生成・変更する際は必ず参照すること。概要:

- **テーマ**: Google AI Studio / Gemini 風。Material Design セマンティックトークン準拠
- **カラー**: `src/app.css` で CSS カスタムプロパティ定義。Tailwind クラスに直接 hex を書かない
- **主要色**: primary `#1a73e8`（light）/ `#8ab4f8`（dark）、background `#f8f9fa` / `#131314`
- **サイドバー**: ライト/ダーク共通で常に `bg-zinc-900`（dark 固定）
- **角丸ベース**: `--radius: 0.75rem`（Card は `rounded-xl`、Button は `rounded-lg`）
- **フォント**: `Zen Kaku Gothic Antique`（本文・見出し）、`Geist Variable`（英数字）

### 環境変数

`.env` に設定（`.env.example` 参照）。必須:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
- `VITE_ALLOWED_DOMAIN`（許可するメールドメイン）

## コーディング規約

- `any` 禁止 → `unknown` を使用
- `interface` より `type` を優先
- コンポーネントは関数コンポーネントのみ（SolidJS）
- Props の型定義はコンポーネントの直上に配置
- カスタムロジックは `src/lib/` に配置
- PR は `develop` ブランチへ向けて作成し、Squash Merge する
- コミットメッセージは Conventional Commits 形式 (`feat`, `fix`, `refactor` など)

## CHANGELOG.md

コード変更を行った際は `CHANGELOG.md` に変更内容と意図を記録・更新すること。
