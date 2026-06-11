# コードブロック [(Code Blocks)](https://hacknock.github.io/lobster-wiki/?page=example-code)

lobster.js は、**インラインコード**と**フェンス付きコードブロック**の両方をレンダリングし、オプションでファイル名のアノテーションとシンタックスハイライトの統合を提供します。

## インラインコード

インラインコードはバッククォートでテキストを囲みます:

```markdown
Markdown を DOM にレンダリングするには `loadMarkdown(src, container)` を呼び出します。
```

**結果:**

Markdown を DOM にレンダリングするには `loadMarkdown(src, container)` を呼び出します。

## フェンス付きコードブロック

3 つのバッククォートを使用します。シンタックスハイライトのために言語識別子を追加します:

````markdown
```js
import { loadMarkdown } from "https://hacknock.github.io/lobsterjs/lobster.js";
loadMarkdown("./content.md", document.getElementById("content"));
```
````

**結果:**

```js
import { loadMarkdown } from "https://hacknock.github.io/lobsterjs/lobster.js";
loadMarkdown("./content.md", document.getElementById("content"));
```

## ファイル名付きコードブロック

開始フェンスの直前の行にファイル名を追加します:

````markdown
```html style.css
body { font-family: system-ui, sans-serif; }
```
````

**結果:**

```html style.css
body { font-family: system-ui, sans-serif; }
```

ファイル名はコードの上部に `.lbs-code-filename` 要素としてレンダリングされます。

## サポートされている言語

lobster.js は、人気のあるハイライターで使用される標準的な規則である、`<code>` 要素に`language-\*` クラスを出力します。ハイライターはバンドルされていないため、ご自身で追加してください:

### Prism.js

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/prismjs/themes/prism.min.css"
/>
<script src="https://cdn.jsdelivr.net/npm/prismjs/prism.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/prismjs/plugins/autoloader/prism-autoloader.min.js"></script>
```

```js
loadMarkdown("./content.md", content).then(() => Prism.highlightAll());
```

### highlight.js

```js
import hljs from "highlight.js";
loadMarkdown("./content.md", content).then(() => hljs.highlightAll());
```

## HTML 出力

言語とファイル名を含むフェンス付きコードブロックは次のようにレンダリングされます:

```html
<div class="lbs-code-block">
  <p class="lbs-code-filename">style.css</p>
  <pre data-language="html"><code class="language-html">…</code></pre>
</div>
```

`.lbs-code-block`、`.lbs-code-filename`、標準の `pre` / `code` セレクターを使用してスタイルを設定します。
