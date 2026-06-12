# 詳細 / 折りたたみ [(Details / Collapsible)](https://hacknock.github.io/lobster-wiki/?dummy=1&page=example-details)

`:::details` ブロックは、ネイティブな HTML の `<details>` / `<summary>` 要素としてレンダリングされます。切り替えの動作に JavaScript は必要ありません。

## 基本的な使い方

```markdown
:::details クリックして展開
ユーザーがサマリーをクリックすると、非表示のコンテンツが表示されます。

ここには、段落、リスト、コードブロック、テーブルなど、**任意の** Markdown を記述できます。
:::
```

**結果:**

:::details クリックして展開
ユーザーがサマリーをクリックすると、非表示のコンテンツが表示されます。

ここには、段落、リスト、コードブロック、テーブルなど、**任意の** Markdown を記述できます。
:::

## details 内のリッチコンテンツ

`:::details` ブロック内では、すべての lobster.js Markdown が有効です:

```markdown
:::details API リファレンス
| 関数 | 戻り値 | 説明 |
| :--------------- | :------- | :---------------------------- |
| `loadMarkdown` | Promise | フェッチして DOM にレンダリング |
| `toHTML` | string | 解析して HTML にレンダリング |
| `parseDocument` | Document | AST に解析 |
| `renderDocument` | string | AST を HTML にレンダリング |
:::
```

**結果:**

:::details API リファレンス

| 関数             | 戻り値   | 説明                            |
| :--------------- | :------- | :------------------------------ |
| `loadMarkdown`   | Promise  | フェッチして DOM にレンダリング |
| `toHTML`         | string   | 解析して HTML にレンダリング    |
| `parseDocument`  | Document | AST に解析                      |
| `renderDocument` | string   | AST を HTML にレンダリング      |

:::

## details 内のコード

:::details 完全な例を表示

```js
import { loadMarkdown } from "https://hacknock.github.io/lobsterjs/lobster.js";
const content = document.getElementById("content");
// 単一ファイル
await loadMarkdown("./content.md", content);
// 複数ファイル — 解析前にマージされる
await loadMarkdown(["./shared.md", "./content.md"], content);
```

:::

## 複数の折りたたみセクション

:::details ワープ(warp)ブロックとは何ですか?
ワープブロック (`:::warp id`) を使用すると、コンテンツを一度定義し、`[~id]` 参照を介してどこにでも配置できます。これはマルチカラムレイアウトの基礎です。
:::

:::details lobster.js は npm を必要としますか?
いいえ。`<script type="module">` の CDN 経由で直接使用できます。npm、バンドラー、ビルド手順は不要です。
:::

:::details lobster.js はどの CSS クラスを使用していますか？
すべての要素には`lbs-*`クラスが付与されます。クラスの完全なリファレンスについては、[Introduction](?page=intro) を参照してください。
:::

## HTML 出力

```html
<details class="lbs-details">
  <summary class="lbs-summary">Click to expand</summary>
  <!-- content rendered here -->
</details>
```

`open` 属性は期待どおりに機能します。ブラウザは状態を記憶し、スクリーンリーダーはそれを正しく読み上げます。
