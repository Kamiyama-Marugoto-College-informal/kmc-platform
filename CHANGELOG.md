# CHANGELOG

## [Unreleased]

### Changed

- [`src/index.css`](src/index.css): Google 系ウェブ UI（公開の Material / Google カラー）に寄せたセマンティックトークン（ライトは `#f8f9fa` 背景・Google Blue 系 `#1a73e8` プライマリ、`prefers-color-scheme: dark` でダークサーフェス）。`--role-*` を定義して [`UserAvatar`](src/components/UserAvatar.tsx) のリングと整合。ベースタイポを 1rem / line-height 1.5 に調整
- [`src/components/ui/card.tsx`](src/components/ui/card.tsx): Material 風の薄いエレベーション（シャドウ + `ring-border`）
- [`src/components/Header.tsx`](src/components/Header.tsx): ヘッダーを `bg-card` + 軽いシャドウに
- [`index.html`](index.html): `lang="ja"`（アプリの主言語に合わせる）
- [`src/pages/(auth)/login/index.tsx`](src/pages/(auth)/login/index.tsx): ログインカードの `shadow-lg` をやめ、カード共通のエレベーションに統一

### Added

- shadcn `badge`（[`src/components/ui/badge.tsx`](src/components/ui/badge.tsx)）、`empty`（[`src/components/ui/empty.tsx`](src/components/ui/empty.tsx)）
- [`SiteFooter`](src/components/layout/SiteFooter.tsx): メイン列下部のコピーライト・プレースホルダリンク（利用規約 / プライバシー）
- [`src/data/mockDashboard.ts`](src/data/mockDashboard.ts): 当日スケジュール・課題締切の型とモックビルダー（`buildTodayScheduleItems` / `buildAssignmentItems`）
- [`mainLanguage.ts`](src/lib/mainLanguage.ts): ダッシュボード各セクション・締切バッジ・フッター文言（ja/en）と `formatFooterCopyright`
- shadcn `sidebar` ブロック（[`src/components/ui/sidebar.tsx`](src/components/ui/sidebar.tsx)、依存として `sheet` / `tooltip` / `skeleton` / `input`、`use-mobile` フック）
- [`AppSidebar`](src/components/Sidebar.tsx): 左サイドバーにダッシュボード・通知・設定への `NavLink`（折りたたみ `icon` モード対応）
- [`AppSidebar`](src/components/Sidebar.tsx): フッターにユーザー行（アバター・名前・メール・`ChevronsUpDown`）と上方向の `DropdownMenu`（設定・通知・ログアウト）

### Changed

- [`DashboardPage`](src/pages/dashboard/index.tsx): 今日の日付・2 カラム（スケジュール / 課題）、shadcn `Empty` / `Separator` / `Badge` による空状態・区切り・締切区分（期限超過・今日・今週・この先）
- [`SiteFooter`](src/components/layout/SiteFooter.tsx): リンクを `Button` の `variant="link"` で表示
- [`AppShell`](src/components/layout/AppShell.tsx): メイン列コンテンツ下に [`SiteFooter`](src/components/layout/SiteFooter.tsx) を配置
- [`AppShell`](src/components/layout/AppShell.tsx): `SidebarProvider` + `AppSidebar` + `SidebarInset` のサイドバーレイアウトに変更（`AppSidebar` に `email` を含む `user` を渡す）
- [`Header`](src/components/Header.tsx): `SidebarTrigger` のみ（アカウントはサイドバーフッターへ集約）
- [`HeaderAccountMenu`](src/components/HeaderAccountMenu.tsx): `AccountMenuContent` を切り出し（サイドバーと共有）。表示ラベルにメールを任意表示
- [`UserAvatar`](src/components/UserAvatar.tsx): 任意の `className`（サイドバー行で `size-8` など）
- [`App.tsx`](src/App.tsx): `shellUser` に `email` を渡すよう変更
- [`App.tsx`](src/App.tsx): ログイン後ルートを `TooltipProvider` でラップ（サイドバー折りたたみ時のツールチップ用）
- [`App.tsx`](src/App.tsx): ログイン後を `BrowserRouter` + [`AppShell`](src/components/layout/AppShell.tsx) + 各ページルートに接続（`/dashboard` → `/` リダイレクト、ローディングは Tailwind に統一）
- メイン言語の保持・`document.documentElement.lang` を [`MainLanguageProvider`](src/context/MainLanguageContext.tsx) に集約し、UI は [`プロフィール設定`](src/pages/profile/settings/index.tsx) に配置（[`mainLanguage.ts`](src/lib/mainLanguage.ts) で文言を共有）
- [`index.css`](src/index.css): デザインシステム優先に再構成。レガシー（`--text` / `--text-h` / `--bg` / 未使用のソーシャル・アクセント補助変数）をやめ、shadcn トークンのみを `:root` に定義。見出し・`code`・`html`/`body` のベースを `@layer base` でトークン＋`@apply` に統一
- [`eslint.config.js`](eslint.config.js): `src/context/**` で `react-refresh/only-export-components` を無効化（`MainLanguageProvider` と `useMainLanguage` の同時エクスポート用）

### Removed

- [`src/App.css`](src/App.css): 未 import のまま残っていたレガシースタイルを削除（Tailwind + トークンに統一）

### Added

- shadcn `dropdown-menu`（[`src/components/ui/dropdown-menu.tsx`](src/components/ui/dropdown-menu.tsx)）
- [`HeaderAccountMenu`](src/components/HeaderAccountMenu.tsx): アイコンボタンから設定・通知・ログアウト（Supabase `signOut`）のドロップダウン
- `react-router-dom` を導入し、ログイン後のみ `BrowserRouter` でルーティング
- `AppShell`（[`src/components/layout/AppShell.tsx`](src/components/layout/AppShell.tsx)）: レイアウトラッパ（現行は上記 Changed のサイドバー構成）
- ルート: `/` ダッシュボード、`/notifications`、`/profile/settings`、`/dashboard` → `/` へリダイレクト
- [`src/pages/dashboard`](src/pages/dashboard/index.tsx) / [`notifications`](src/pages/notifications/index.tsx) / [`profile/settings`](src/pages/profile/settings/index.tsx): タイトル + `Card` のプレースホルダー
- [`Header`](src/components/Header.tsx): （当初）ロゴ・トップナビと [`HeaderAccountMenu`](src/components/HeaderAccountMenu.tsx)（現行は上記 Changed を参照）

### Fixed

- CI: `bun.lock` をリポジトリに含め、`.gitignore` のロック除外をやめて `bun install --frozen-lockfile` がクリーンクローンで通るようにした
- Drizzle: 旧 better-auth 向けの `0000_milky_toxin` をやめ、`profiles` と `profile_role` enum のみの初期マイグレーション `0000_init` に差し替え（`useAuth` の `profiles` upsert と整合）
- `Header`: `UserAvatar` に委譲して重複を解消、`AppUser` を渡す形に統一
- `App`: `useAuth` の import 欠落を修正し、ログインユーザーを `Header` に渡すよう修正

### Added (feat: #3 デザインシステム)

- Tailwind CSS v4（`@tailwindcss/vite`）と shadcn/ui（`components.json`、radix-nova スタイル）を導入
- `src/components/ui/` に Button / Card / Avatar / Separator、`src/lib/utils.ts` に `cn()` を追加
- `src/index.css` にセマンティックトークン（`--primary` 等）とロール用 `--role-*` を整理し、`prefers-color-scheme: dark` で shadcn 変数を切替
- `tsconfig.json` / `tsconfig.app.json` と `vite.config.ts` に import エイリアス `@/*` → `src/*` を追加
- `docs/design-system.md`（コンポーネント規約）と `.cursor/skills/kmc-design-system/SKILL.md`（AI 向けガイド）を追加
- `eslint.config.js`: `src/components/ui/**` で `react-refresh/only-export-components` を無効化（shadcn の variant エクスポート用）

### Changed (feat: #3 デザインシステム)

- `src/App.tsx` / `src/(auth)/login/index.tsx` を shadcn + Tailwind に移行（ヘッダー・ログインカード・ログアウトボタン）
- `src/components/UserAvatar.tsx` を shadcn Avatar + ロール色リングに変更
- `src/App.css` を削除（スタイルはトークン + Tailwind に集約）
- `#root` の強制 `text-align: center` をやめ、各画面で整列を指定

### Changed (refactor: better-auth → Supabase Auth)

- 認証基盤を `better-auth` から Supabase Auth (`@supabase/supabase-js`) に全面移行
  - `server/auth.ts` 削除: better-auth 設定を撤去
  - `server/db/schema/auth.ts` 削除: better-auth 用 Drizzle スキーマ（user, session, account, verification）を撤去
  - `server/db/schema/profiles.ts` 追加: ユーザーのロール管理用 `profiles` テーブル（`auth.users.id` と対応）
  - `server/index.ts`: `/api/auth/**` ルートを削除（Supabase Auth はフロントエンドから直接呼び出すため）
  - `src/lib/auth-client.ts` 削除・`src/lib/supabase.ts` 追加: `createClient` による Supabase クライアント
  - `src/App.tsx`: `authClient.useSession()` → `supabase.auth.getSession()` + `onAuthStateChange` に変更
    - ドメイン制限 (`@kamiyama.ac.jp`) を `onAuthStateChange` 内でチェック、違反時は `signOut()`
    - Google OAuth: `authClient.signIn.social()` → `supabase.auth.signInWithOAuth({ provider: 'google' })` に変更
  - `.env.example`: `BETTER_AUTH_*` を削除、`VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` を追加
- Dependencies: `better-auth` を削除、`@supabase/supabase-js` を追加

### Added (feat: #1 認証機能)

- `better-auth` v1 を導入し、Google OAuth 認証を実装
  - `server/auth.ts`: better-auth 設定（Google provider, `@kamiyama.ac.jp` ドメイン制限, ロール additionalField）
  - `databaseHooks.user.create.before` で `@kamiyama.ac.jp` 以外のアドレスを `FORBIDDEN` エラーで拒否
  - `server/db/schema/auth.ts`: better-auth 用の Drizzle スキーマ（user, session, account, verification テーブル）
    - `user` テーブルに `role` カラム追加（デフォルト: `"student"`）
  - `server/index.ts`: `/api/auth/**` に auth handler をマウント、CORS 設定追加
- `src/lib/auth-client.ts`: `better-auth/react` の `createAuthClient` によるクライアント設定
- `src/components/UserAvatar.tsx`: ロール別ボーダー色のユーザーアバターコンポーネント
  - student: 青, staff: 緑, admin: オレンジ
- `src/App.tsx`: ログイン画面（Google サインインボタン）とダッシュボード画面に刷新
- `src/App.css`: 認証 UI とダッシュボードのスタイル
- `drizzle/0000_milky_toxin.sql`: 初期マイグレーションファイル（drizzle-kit generate で生成）

### Changed

- `server/db/schema/index.ts`: 自己参照エクスポートを修正し `./auth` を正しくエクスポート
- `vite.config.ts`: `/api` を `http://localhost:3000` にプロキシする設定を追加
- `.env.example`: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `FRONTEND_URL` を追加

### Added

- `.cursor/skills/github-pr-creator/SKILL.md`: GitHub CLI で PR を作成する際に `.github/PULL_REQUEST_TEMPLATE.md` に沿って本文を組み立てる Cursor 用スキル
- `server/` ディレクトリを追加し、Honoベースのサーバーを構築
  - `server/index.ts`: Hono + `@hono/node-server` によるHTTPサーバーエントリポイント
  - `server/db/index.ts`: `@neondatabase/serverless` + `drizzle-orm/neon-http` によるDBクライアント
  - `server/db/schema/`: Drizzleスキーマをドメイン別に分割
    - `enums.ts`: 全enum定義（ChallengeFundCategory, ChallengeFundStatus, NotificationType, UserRole）
    - `auth.ts`: 認証関連テーブル（User, Account, Session, Verification, RateLimit）
    - `challenge.ts`: チャレンジファンド関連テーブル（ChallengeFund, BudgetItem, CalendarEvent, PitchScore, BudgetConfig）
    - `notification.ts`: 通知テーブル（Notification）
    - `index.ts`: 全テーブルのre-export
- `drizzle.config.ts`: drizzle-kitの設定（schema: `server/db/schema/index.ts`, dialect: postgresql）
- `.env.example`: `DATABASE_URL`, `PORT` のテンプレート追加

### Changed

- `package.json` にサーバー・DB関連スクリプト追加
  - `dev:server`: Bunのwatchモードでサーバー起動
  - `db:generate`: マイグレーションファイル生成
  - `db:migrate`: マイグレーション実行
  - `db:push`: スキーマをDBに直接プッシュ（開発用）
  - `db:studio`: Drizzle Studio起動

### Dependencies

- Added: `hono`, `@hono/node-server`, `@neondatabase/serverless`, `drizzle-orm`
- Added (dev): `drizzle-kit`
