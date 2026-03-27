# Changelog

## [Unreleased]

### Added

- Prettier（`format` / `format-check`）と `typecheck`（`tsc -b`）の npm スクリプト。
- CI を単一ジョブに整理し、lint → typecheck → format-check → test → build の順で実行。依存関係は `bun install --frozen-lockfile` で固定。
