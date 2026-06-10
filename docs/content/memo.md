# めも書き

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



### lobster-wiki

[GitHub - Hacknock/lobster-wiki: lobster-wiki turns a folder of Markdown files into a wiki-style site — sidebar navigation, page routing, auto-generated table of contents — with almost no code beyond the Markdown itself. · GitHub](https://github.com/Hacknock/lobster-wiki)




## カスタム

- アクションさせる
- コードを参照させる

