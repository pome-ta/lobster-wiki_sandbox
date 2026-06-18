# めも書き


ダラダラ書いていきつつ、`.md` に分割してく予定。


## 基本的な

- 説明があるものの検証
- 自分の使い勝手で良さげなところ
- ドキュメントの記載と、それを越えた状態での使い方

### `./content` ディレクトリ

- デフォルト指定は`./content`
- `.md` の読み込み場所
- サブディレクトリ設定可能

### リンク

- [sub-intr](?page=sub/sub-intr) これ飛べる
  - `[sub-intr](?page=sub/sub-intr)` こんな感じで
- top は、`[top](?page=./)`
  - [top](?page=./)

### 画像

- `![lobster.js](https://github.com/Hacknock/lobsterjs/raw/main/docs/lobsterjs-light.png =48x48)`
- こんな感じでどうにかなった

## スタイル

### テキスト折り返し

```css:style.css
body {
  line-break: strict;
  font-feature-settings: 'palt';
  overflow-wrap: anywhere;
}
```

この程度に抑えた。以下解決。

バッククオートでの長い文字列は、折り返しできないかも？

kiso.css は、リセットであり、`lobster-wiki/style.css` と競合すると面倒なので、導入を控えた。

- [kiso](https://github.com/tak-dcxi/kiso.css)

### `index.html` でまとめる

`<style>` に押し込んで、`index.html` のワンソースで全体を把握できるようにした。

```html:index.html
<style>
  body {
    line-break: strict;
    font-feature-settings: 'palt';
    overflow-wrap: anywhere;
  }
</style>
<style media="screen and (width <= 768px)">
  .lbw-main pre[class*='language-'],
  .lbw-main code[class*='language-'] {
    font-size: 0.8rem;
    line-height: 1.4;
  }
</style>

<link rel="stylesheet" href="https://hacknock.github.io/lobster-wiki/style.css" />

<!-- Prism.js -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs/themes/prism.min.css" />
<script src="https://cdn.jsdelivr.net/npm/prismjs/prism.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/prismjs/plugins/autoloader/prism-autoloader.min.js"></script>

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/prismjs/plugins/line-numbers/prism-line-numbers.min.css"
/>
<script src="https://cdn.jsdelivr.net/npm/prismjs/plugins/line-numbers/prism-line-numbers.min.js"></script>
```

## 公式の機械翻訳とか

`README.md` も機械翻訳するか？

### lobsterjs

[GitHub - Hacknock/lobsterjs: A tool to convert Markdown into simple and rich web pages. · GitHub](https://github.com/Hacknock/lobsterjs)

#### todo?

- [ ] formal のスタイル一部テキストが背景と同色か？
  - [lobsterjs/docs/themes/formal.css at main · Hacknock/lobsterjs · GitHub](https://github.com/Hacknock/lobsterjs/blob/main/docs/themes/formal.css)

- 2　カラムレイアウト
  - lobster.js と、lobster-wiki だと書き方違う？

```lobster.md
~ | [~compare-no] | [~compare-yes] |
~ | :--- | :--- |

```

```lobster-wiki.md
~ |          Left           |          Right          |
~ | :---                    | :---                    |
~ | [~col-left]             | [~col-right]            |

```

- チェックボックスのスタイルがうまくあたってない？
  - ブラウザの差異か？



- [ ] `example-footnotes-ja.md` のコードブロック、複数行が認識してないかも
  - 脚注が入ったコードブロック

- [ ] クエリのルーティング
  - `?page=` とあれば、内部を探しに行っちゃう
  - （小手先）`dummy=1&` 追加

```js
// src/lobster-wiki.ts の setupRouter 関数内イメージ

// todo: hostname 比較とかで行けそうかも？
const linkSelector = mode === "hash" ? 'a[href*="#page="]' : 'a[href*="?page="]';

document.addEventListener("click", (e) => {
  const a = (e.target as Element).closest?.(linkSelector) as HTMLAnchorElement | null;
  if (!a) return;
  e.preventDefault();
 
  page = new URL(a.href, location.href).searchParams.get("page");
 
  onNavigate(page);
});

```


## ディレクトリ構成

各ファイルが点在しちゃってる印象があるので
いい具合に整理していきたい

```
.
├── docs/
│   ├── components/
│   │   ├── moduleSketchInstanceMode.js
│   │   ├── sampleButton.html
│   │   ├── sampleButton.js
│   │   ├── sampleSketchGlobalMode.js
│   │   ├── sampleSketchInstanceMode.js
│   │   ├── sandbox.html
│   │   ├── sandbox.js
│   │   └── sketchSandboxComponent.js
│   ├── content/
│   │   ├── customize/
│   │   │   ├── fileSourceCode.md
│   │   │   ├── injection.md
│   │   │   └── top.md
│   │   ├── lobster-wiki/
│   │   │   ├── demo-ja/
│   │   │   │   ├── example-code-ja.md
│   │   │   │   ├── example-details-ja.md
│   │   │   │   ├── example-footnotes-ja.md
│   │   │   │   ├── example-image-ja.md
│   │   │   │   ├── example-table-ja.md
│   │   │   │   ├── example-warp-ja.md
│   │   │   │   └── intro-ja.md
│   │   │   └── README-ja.md
│   │   ├── lobsterjs/
│   │   │   ├── content-ja.md
│   │   │   └── README-ja.md
│   │   ├── memo.md
│   │   ├── readme.md
│   │   ├── sketches/
│   │   │   ├── canvases.md
│   │   │   ├── mount01.js
│   │   │   ├── mount02.js
│   │   │   ├── mySketch01.js
│   │   │   ├── mySketch02.js
│   │   │   └── sketchComponent.js
│   │   ├── study/
│   │   │   ├── guide.md
│   │   │   └── intro.md
│   │   └── sub/
│   │       └── sub-intr.md
│   ├── index.html
│   ├── staticContents/
│   │   ├── footer.md
│   │   ├── header.md
│   │   └── navigation.md
│   └── wiki.config.json
├── LICENSE
├── playground/
│   ├── localServer.py
│   ├── sfSafariBrowser.py
│   └── wkWebBrowser.py
├── pystaRubiconModules/
└── README.md

```
（前どうやって記載したか忘れて、更新するの面倒やん。。。）


### lobster-wiki

[GitHub - Hacknock/lobster-wiki: lobster-wiki turns a folder of Markdown files into a wiki-style site — sidebar navigation, page routing, auto-generated table of contents — with almost no code beyond the Markdown itself. · GitHub](https://github.com/Hacknock/lobster-wiki)

## カスタム

- アクションさせる
- コードを参照させる




## `p5.js` の実行と描画

- sketch の表示・非表示
- ループ（`draw` 処理）のon/off（`.noLoo()` , `.loop()`）
- 再描画（リセットし再読み込み）
- sketch 結果描画

で構成。


`inject:` で、js を実行させる。
実行指示時に3つを引数として渡せる

1. `sketchPath` : sketch code のファイルパス
  - root からのディレクトリで、パスを指定
  - instance mode 、global mode どちらでも実行可能
2. `loopBtnDisabled` : loop ボタンが使用できるかどうか
  - 省略可能
  - デフォルトは`false`
3. `resetBtnDisabled` : reset ボタンが使用できるかどうか
  - 省略可能
  - デフォルトは`false`

**JSON** 形式で記述すること。`"` やケツカンマなど気を付ける。

例：

````
```inject:./components/sketchSandboxComponent.js
{
  "sketchPath": "./content/sketches/s0_00_00_b.js",
  "loopBtnDisabled": true,
  "resetBtnDisabled": false
}
```
````



### sandbox 化

`iframe` に sketch の描画を隔離、各自の実行インスタンスで処理。描画生成時は`noLoop` で、`draw` ループを止めている。
`iframe` へ逃すことで、instance mode でもglobal mode でも実行できるようになった。

