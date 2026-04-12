# KMC Platform デザインシステム

## スタック

- React 19 + Vite 8 + TypeScript
- スタイル: Tailwind CSS v4（`@tailwindcss/vite`）
- UI: [shadcn/ui](https://ui.shadcn.com/)（Radix UI プリミティブ、`components.json` の radix-nova プリセット）
- クラス結合: `cn()`（[`src/lib/utils.ts`](../src/lib/utils.ts)）

## トークン

セマンティックな色・半径は [`src/index.css`](../src/index.css) の CSS 変数が単一ソース。Tailwind では `bg-background`、`text-foreground`、`border-border`、`text-primary`、`bg-primary` などを使う。

ブランドの紫系は `--primary` / `--accent`（ライト・`prefers-color-scheme: dark` で切替）。ロール表示用に `--role-student` / `--role-staff` / `--role-admin` を定義している。

生の `#rrggbb` をコンポーネントに直書きしない（SVG のブランド色など例外は可）。

## コンポーネントの置き場所

| 種類                              | パス                               |
| --------------------------------- | ---------------------------------- |
| shadcn が生成する UI プリミティブ | `src/components/ui/`               |
| アプリ固有の複合コンポーネント    | `src/components/`                  |
| ルート別の画面                    | `src/(auth)/` などのルートグループ |

新規のボタン・カード・ダイアログはまず `bunx shadcn@latest add <name>` で追加し、足りない部分だけラッパーを書く。

## レイアウト・スペーシング

- 余白・ギャップは Tailwind のスケール（`p-4`、`gap-3`、`space-y-2`）を優先する。
- ページの縦方向の最低高は `min-h-svh` を使う。

## 参考

- Issue: [feat: デザインシステムの追加 #3](https://github.com/Kamiyama-Marugoto-College-informal/kmc-platform/issues/3)
