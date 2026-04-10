# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## コマンド

パッケージマネージャは **bun** を使用。

```sh
bun install              # 依存パッケージのインストール
bun run dev              # フロントエンド開発サーバー起動 (port 5173)
bun run dev:server       # バックエンド開発サーバー起動 (port 3000, --watch)
bun run build            # tsc -b + vite build
bun run lint             # ESLint
bun run typecheck        # 型チェックのみ
bun run format           # Prettier フォーマット
bun run test             # Jest テスト
bun run db:generate      # Drizzle スキーマからマイグレーションファイル生成
bun run db:migrate       # マイグレーション実行
bun run db:push          # DB に直接 push（開発時）
bun run db:studio        # Drizzle Studio 起動
```

開発時はフロントエンド (`bun run dev`) とバックエンド (`bun run dev:server`) を同時に起動する。Vite が `/api/*` を `localhost:3000` にプロキシするため、両方起動している必要がある。

## アーキテクチャ概要

### フロントエンド (`src/`)

- **React 19 + Vite + TypeScript**
- エントリポイント: `main.tsx` → `Root.tsx` → `App.tsx`
- **`Root.tsx`**: `BrowserRouter` と認証状態に応じた `Sidebar` の表示制御
- **`App.tsx`**: ルーティング定義。未認証時は `/login` にリダイレクト。認証済みは `AppMainLayout`（Sidebar 分の左余白 `pl-28 lg:pl-72`）でラップされた各ページを表示

ルーティング構造:
```
/login               → LoginPage（未認証時のみ）
/dashboard           → DashboardPage
/notifications       → NotificationsPage
/profile/settings    → ProfileSettingsPage
```

### 認証 (`src/hooks/useAuth.ts`, `src/lib/supabase.ts`)

- **Supabase Auth** を使用
- `useAuth` フックで認証状態を管理。`supabase.auth.onAuthStateChange` でセッション監視
- サインイン後に `profiles` テーブルを upsert してロール (`student` / `staff` / `admin`) を取得
- `VITE_ALLOWED_DOMAIN` 環境変数でメールドメインを制限（admin は除外）
- `AppUser` 型: `{ id, name, email, image?, role }`

### 国際化 (`src/lib/i18n/`, `src/context/MainLanguageContext.tsx`)

- `ja` / `en` の 2 言語対応
- `MainLanguageContext` で言語状態を管理。`localStorage` に保存し、`document.documentElement.lang` を更新
- `t(key, locale)` 関数でドット区切りキーを使って翻訳文字列を取得

### UI コンポーネント

- **shadcn/ui** (`src/components/ui/`) + **Tailwind CSS v4**
- **lucide-react** をアイコンライブラリとして使用
- **next-themes** でライト/ダーク/システムのテーマ切り替え (`ThemeProvider`, `ThemeToggle`)
- `@` エイリアスは `src/` を指す

デザインシステムの詳細（カラートークン・タイポグラフィ・コンポーネント仕様）は **`DESIGN.md`** を参照。UI を生成・変更する際は必ず参照すること。概要:

- **テーマ**: Google AI Studio / Gemini 風。Material Design セマンティックトークン準拠
- **カラー**: `src/index.css` で CSS カスタムプロパティ定義。Tailwind クラスに直接 hex を書かない
- **主要色**: primary `#1a73e8`（light）/ `#8ab4f8`（dark）、background `#f8f9fa` / `#131314`
- **サイドバー**: ライト/ダーク共通で常に `bg-zinc-900`（dark 固定）
- **角丸ベース**: `--radius: 0.75rem`（Card は `rounded-xl`、Button は `rounded-lg`）
- **フォント**: `Zen Kaku Gothic Antique`（本文・見出し）、`Geist Variable`（英数字）

### バックエンド (`server/`)

- **Hono** (Node.js) の API サーバー
- `server/index.ts`: CORS 設定済み、`/api/*` エンドポイントを提供
- `server/db/`: **Drizzle ORM** + PostgreSQL (Supabase)
- スキーマは `server/db/schema/` に定義（命名規則: データベース名は大文字から始めること）

### 環境変数

`.env.example` を参照。必須:
- `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
- `VITE_ALLOWED_DOMAIN`（許可するメールドメイン）
- `DATABASE_URL`（Drizzle ORM 用）
- `FRONTEND_URL`（CORS 設定用）

## コーディング規約

- `any` 禁止 → `unknown` を使用
- `interface` より `type` を優先
- コンポーネントは関数コンポーネントのみ
- Props の型定義はコンポーネントの直上に配置
- カスタムフックは `src/hooks/` に配置
- PR は `develop` ブランチへ向けて作成し、Squash Merge する
- コミットメッセージは Conventional Commits 形式 (`feat`, `fix`, `refactor` など)

## CHANGELOG.md

コード変更を行った際は `CHANGELOG.md` に変更内容と意図を記録・更新すること。
