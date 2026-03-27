---
name: github-pr-creator
description: >-
  Drafts GitHub pull request titles and bodies for kmc-platform using
  `.github/PULL_REQUEST_TEMPLATE.md`, then creates the PR via `gh pr create`.
  Use when the user wants to open a PR, create a pull request, プルリクを作る,
  or prepare `gh pr` with the repo template filled in.
---

# GitHub Pull Request Creator (kmc-platform)

## 前提

- [GitHub CLI](https://cli.github.com/) (`gh`) がインストール済みで `gh auth login` 済みであること
- 作業ブランチに push 済みであること（未 push なら先に `git push -u origin <branch>`）

## 必ず最初にやること

1. **テンプレートを読む** — リポジトリルートの `.github/PULL_REQUEST_TEMPLATE.md` を Read で読み、**見出し階層・セクション順・チェックリストの文言はテンプレートに完全一致**させる。テンプレにない見出しを勝手に足さない。
2. **差分の事実を取る** — 次を実行して PR 本文の「変更内容」に使う（推測で書かない）:

```bash
git fetch origin main 2>/dev/null || true
git log origin/main..HEAD --oneline
git diff origin/main...HEAD --stat
git diff origin/main...HEAD
```

ベースが `main` でない場合はユーザーに確認するか、`gh repo view --json defaultBranchRef` で既定ブランチを確認する。

## 本文の埋め方（テンプレート各セクション）

| セクション | ルール |
|------------|--------|
| **概要** | 一言。ユーザー・会話・コミットから要約。 |
| **関連 Issue** | `Closes #123` 形式。該当なしならコメント行は残しつつ番号なしでよい。 |
| **変更の種類** | コミット／差分から**主に1つ**にチェック。複数なら最もユーザー影響が大きいものを優先。 |
| **変更内容** | 何を・なぜ・どう変えたか。ファイル名の羅列だけにしない。 |
| **スクリーンショット** | UI 変更がなければテンプレの指示どおり**セクションごと削除**してよい。 |
| **チェックリスト** | 実際に実行したものだけチェック。未実施ならチェックを付けない。 |
| **レビュアーへのメモ** | リスク・見てほしいファイル・不要なら削除。 |

## PR タイトル

Conventional Commits に近い形（テンプレの「変更の種類」と矛盾させない）:

- 例: `feat(api): チャレンジ一覧のページネーションを追加`
- 例: `fix(auth): セッション期限切れ時のリダイレクトを修正`

## 作成手順

1. 上記で本文 Markdown を完成させる（テンプレ準拠）。
2. 一時ファイルに保存してから作成する（シェルでクォート事故を避ける）:

```bash
# 例: 本文を pr-body.md に書いたあと
gh pr create --base main --title "<タイトル>" --body-file pr-body.md
```

3. **ドラフト**で出したい場合: `gh pr create ... --draft`
4. 標準出力の PR URL をユーザーに返す。

## よく使う `gh` コマンド

```bash
gh pr view --web          # 作成直後の PR をブラウザで開く
gh pr checks              # CI 状態
gh pr ready               # ドラフトをレビュー可能にする
```

## 注意

- `gh pr create --fill` はコミットからタイトル・本文を推測するため、**このリポジトリの PR テンプレートは使われない**。本文は必ず `--body-file` か `--body` でテンプレに沿って渡す。
- テンプレートが更新されたら、**本文の形は常に `.github/PULL_REQUEST_TEMPLATE.md` を正**とする（この SKILL の説明と食い違う場合はファイル側に従う）。
