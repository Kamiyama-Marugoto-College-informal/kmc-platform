# CHANGELOG

## [Unreleased]

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
