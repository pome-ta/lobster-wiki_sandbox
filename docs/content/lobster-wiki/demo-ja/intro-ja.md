# はじめに [(Introduction)](https://hacknock.github.io/lobster-wiki/)

**lobster.js** は、ブラウザ上で直接、リッチで構造化されたウェブページをレンダリングする拡張 Markdown パーサーです。ビルドステップやフレームワークは必要ありません。

Markdown ファイルを書き、それを lobster.js に指定するだけで、完全に構造化された HTML ドキュメントが得られます。外観は、予測可能な `lbs-*` クラス名を使用した CSS に完全に委ねられています。

## クイックスタート

HTML に`<script type="module">` を 1 つ追加してください:

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="your-style.css" />
  </head>
  <body>
    <div id="content"></div>
    <script type="module">
      import { loadMarkdown } from "https://hacknock.github.io/lobsterjs/lobster.js";
      loadMarkdown("./content.md", document.getElementById("content"));
    </script>
  </body>
</html>
```

これだけです。npm install は不要です。バンドラーも不要です。設定も不要です。

## 機能

| カテゴリー    | 取得できるもの                                                                                         |
| :------------ | :----------------------------------------------------------------------------------------------------- |
| 標準 Markdown | 見出し、段落、太字、斜体、取り消し線、コード、引用、リスト、テーブル、リンク、画像                     |
| 拡張構文      | `:::header` / `:::footer`、`:::details`、`:::warp`、サイレントテーブル、セル結合、画像サイズ調整、脚注 |
| CSS-first     | すべての要素に `lbs-*` クラスが付与されます — 独自のスタイルシートを使用してください                   |
| 複数ファイル  | `loadMarkdown` に配列を渡してファイルをマージします。ワープ/リンク/脚注の参照は共有されます            |
| TypeScript    | 完全な型定義が含まれています                                                                           |

## API の概要

### `loadMarkdown(src, container)`

Markdown をフェッチして DOM 要素にレンダリングします。

```js
import { loadMarkdown } from "./lobster.js";
// 単一ファイル
loadMarkdown("./content.md", document.getElementById("content"));

// 複数ファイル — 解析前にマージされる
loadMarkdown(["./shared.md", "./page.md"], document.getElementById("content"));
```

### `toHTML(markdown)`

サーバーサイドまたはオフラインでの使用向けの一行コード:

```js
import { toHTML } from "lobsterjs";
const html = toHTML("# Hello **world**");
```

## 拡張構文の概要

lobster.js は、標準の Markdown に加えて以下の機能を追加します:

- **`:::header` / `:::footer`** — セマンティックなページ領域
- **`:::details`** — ネイティブな `/` 折りたたみブロック
- **`:::warp`** — コンテンツを一度定義し、どこにでも配置 (マルチカラムレイアウト)
- **サイレントテーブル** (`~ | ... |`) — 境界線のないレイアウトグリッド
- **セル結合** — 水平方向 (`\|`) と垂直方向 (`\---`) の結合
- **画像のサイズ調整** — `![alt](url =800x)`
- **脚注** — 参照 (`[^id]`) とインライン (`^[text]`)

各機能については、サイドバーの例をご覧ください。

## CSS クラス

レンダリングされたすべての要素には `lbs-*` クラスが付きます。デフォルトのスタイルシートはバンドルされていません。

```
lbs-heading-1 … lbs-heading-6 見出し (Headings)
lbs-paragraph 段落 (Paragraph)
lbs-emphasis / lbs-strong インライン (Inline)
lbs-code-span / lbs-code-block コード (Code)
lbs-table / lbs-table-silent テーブル (Tables)
lbs-details / lbs-summary 折りたたみ (Collapsible)
lbs-footnote-ref / lbs-footnotes 脚注 (Footnotes)
```

---

> **このサイト**は、lobster.js 用の Markdown ベースの wiki 拡張機能である [lobster-wiki](https://github.com/Hacknock/lobster-wiki) を使用して構築されています。
