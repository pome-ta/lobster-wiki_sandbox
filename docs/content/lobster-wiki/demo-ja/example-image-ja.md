# 画像 [(Images)](https://hacknock.github.io/lobster-wiki/?page=example-image)

lobster.js は、標準のMarkdownの画像構文に加え、`width` / `height` 属性に直接マッピングされる**オプションのサイズ指定子** `=WxH` をサポートしています。CSSは必要ありません。

## 基本的な画像

```markdown
![サンプルの横長画像](https://hacknock.github.io/lobster-wiki/images/sample-wide.png)
```

**結果:**

![サンプルの横長画像](https://hacknock.github.io/lobster-wiki/images/sample-wide.png)

---

## 画像のサイズ調整

括弧内のURLに `=WxH` (ピクセル単位) を追加します。どちらの寸法も省略可能です。

### 幅のみ — `=400x`

画像を幅400ピクセルに拡大縮小します。高さは比例します。

```markdown
![サンプル =400x](https://hacknock.github.io/lobster-wiki/images/sample-wide.png =400x)
```

![サンプル =400x](https://hacknock.github.io/lobster-wiki/images/sample-wide.png =400x)

### 幅のみ — `=200x`

```markdown
![サンプル =200x](https://hacknock.github.io/lobster-wiki/images/sample-wide.png =200x)
```

![サンプル =200x](https://hacknock.github.io/lobster-wiki/images/sample-wide.png =200x)

### 明示的な 幅 × 高さ — `=300x150`

```markdown
![サンプル =300x150](https://hacknock.github.io/lobster-wiki/images/sample-wide.png =300x150)
```

![サンプル =300x150](https://hacknock.github.io/lobster-wiki/images/sample-wide.png =300x150)

### サムネイル — `=80x80`

```markdown
![サムネイル](https://hacknock.github.io/lobster-wiki/images/sample-square.png =80x80)
![サムネイル](https://hacknock.github.io/lobster-wiki/images/sample-square.png =80x80)
![サムネイル](https://hacknock.github.io/lobster-wiki/images/sample-square.png =80x80)
```

![サムネイル](https://hacknock.github.io/lobster-wiki/images/sample-square.png =80x80)
![サムネイル](https://hacknock.github.io/lobster-wiki/images/sample-square.png =80x80)
![サムネイル](https://hacknock.github.io/lobster-wiki/images/sample-square.png =80x80)

---

## 画像 + テキストのレイアウト

**サイレントテーブル (silent table)** と **ワープブロック (warp blocks)** を組み合わせて、テキストの横に画像を配置します。

```markdown
~ | | |
~ | :--- | :--- |
~ | [~img-col] | [~text-col] |
:::warp img-col
![写真](https://hacknock.github.io/lobster-wiki/images/sample-square.png =240x)
:::
:::warp text-col

### キャプションがここに入ります

**サイレントテーブル** (`~ | ... |`) を境界線のないグリッドとして使用し、**ワープブロック** を使用して、レイアウト宣言とは独立して列の内容を定義します。

このパターンは、画像が左、画像が右、あるいは複合コンテンツの複数列など、あらゆる組み合わせで機能します。
:::
```

**結果:**

~ | | |
~ | :--- | :--- |
~ | [~img-col] | [~text-col] |

:::warp img-col
![写真](https://hacknock.github.io/lobster-wiki/images/sample-square.png =240x)
:::

:::warp text-col

### キャプションがここに入ります

**サイレントテーブル** (`~ | ... |`) を境界線のないグリッドとして使用し、**ワープブロック** を使用して、レイアウト宣言とは独立して列の内容を定義します。

このパターンは、画像が左、画像が右、あるいは複合コンテンツの複数列など、あらゆる組み合わせで機能します。
:::

---

## 画像グリッド

3列のサイレントテーブルに3つの画像を配置します:

```markdown
~ | | | |
~ | :--- | :--- | :--- |
~ | [~g1] | [~g2] | [~g3] |

:::warp g1
![グリッド 1](https://hacknock.github.io/lobster-wiki/images/sample-square.png =180x)
:::

:::warp g2
![グリッド 2](https://hacknock.github.io/lobster-wiki/images/sample-square.png =180x)
:::

:::warp g3
![グリッド 3](https://hacknock.github.io/lobster-wiki/images/sample-square.png =180x)
:::
```

**結果:**

~ | | | |
~ | :--- | :--- | :--- |
~ | [~g1] | [~g2] | [~g3] |

:::warp g1
![グリッド 1](https://hacknock.github.io/lobster-wiki/images/sample-square.png =180x)
:::

:::warp g2
![グリッド 2](https://hacknock.github.io/lobster-wiki/images/sample-square.png =180x)
:::

:::warp g3
![グリッド 3](https://hacknock.github.io/lobster-wiki/images/sample-square.png =180x)
:::

---

## HTML出力

サイズ指定子は標準のHTML属性にマッピングされます:

```html
<!-- ![alt](url =400x) -->
<img class="lbs-image" src="url" alt="alt" width="400" />

<!-- ![alt](url =300x150) -->
<img class="lbs-image" src="url" alt="alt" width="300" height="150" />
```

`.lbs-image` クラスを使用して画像をスタイルします — 例えば、レスポンシブにするために `max-width: 100%` を適用します。
