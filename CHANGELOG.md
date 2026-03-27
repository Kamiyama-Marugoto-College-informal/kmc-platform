# CHANGELOG

## [Unreleased]

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
