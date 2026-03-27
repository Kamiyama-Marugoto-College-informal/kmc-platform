---
name: kmc-design-system
description: KMC Platform のフロント用デザインシステム（Tailwind v4 + shadcn/ui、トークン、コンポーネント規約）。UI 実装・レビュー・新規画面の雛形作成で使う。
---

# KMC デザインシステム（Agent 向け）

## 前提

- **Vite + React 19 + TypeScript**。UI は **shadcn/ui**（`src/components/ui/`）と **Tailwind** クラス。
- 色は **セマンティックトークン**（`bg-background`、`text-foreground`、`border-border`、`bg-primary`、`text-muted-foreground` など）。`src/index.css` の CSS 変数がソース。
- クラス結合は **`cn()`**（`@/lib/utils`）。

## やること

1. 新しいインタラクティブ部品が必要なら、まず **`bunx shadcn@latest add <component>`** で既存プリミティブを足す。
2. レイアウトは **`flex` / `grid`** + Tailwind の **`gap-*` / `p-*`**。画面全体は **`min-h-svh`**。
3. **Button** は `variant` / `size` を使う（`className` で全部上書きしない）。
4. ロール色などドメイン固有の色は **`--role-*`** やトークン経由に寄せる。

## やらないこと

- `src/components/ui/` 内の shadcn 生成ファイルを、見た目調整以外の理由で大幅に書き換えない（アップグレード時に差分が追えなくなる）。
- 画面全体に `style={{ color: '#...' }}` を大量に付けない。トークンか Tailwind クラスにする。

## 人間向けの詳細

- リポジトリ直下の `docs/design-system.md`
