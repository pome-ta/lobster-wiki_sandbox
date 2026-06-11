# 脚注 [(Footnotes)](https://hacknock.github.io/lobster-wiki/?page=example-footnotes)

lobster.js は2つのスタイルの脚注をサポートしています。個別に定義する**参照脚注**と、テキスト内に直接記述する**インライン脚注**です。

## 参照脚注

テキスト内に `[^id]` を追加し、ドキュメント内の任意の場所に `[^id]: ...` で注釈を定義します:

```markdown
ロブスター[^1] は甲殻類でもあり、Markdownパーサー[^parser] でもあります。

[^1]: 甲殻類は10本の脚を持ち、海に住んでいます。

[^parser]: パーサーは脚が0本で、あなたのブラウザに住んでいます。
```

**結果:**

ロブスター[^1] は甲殻類でもあり、Markdownパーサー[^parser] でもあります。

[^1]: 甲殻類は10本の脚を持ち、海に住んでいます。

[^parser]:
    パーサーは脚が0本で、あなたのブラウザに住んでいます。
    脚注の定義は収集され、ページの最後に番号付きリストとしてレンダリングされます。

## インライン脚注

テキスト内に直接注釈のコンテンツを記述するには `^[...]` を使用します。個別の定義は必要ありません:

```markdown
CDNのURL^[https://hacknock.github.io/lobsterjs/lobster.js] は常に最新です。

lobster.js^[甲殻類にちなんで名付けられました — どちらも古く、装甲があり、予想外に役立ちます。] は CSS-first です。
```

**結果:**

CDNのURL^[https://hacknock.github.io/lobsterjs/lobster.js] は常に最新です。

lobster.js^[甲殻類にちなんで名付けられました — どちらも古く、装甲があり、予想外に役立ちます。] は CSS-first です。

## 両方のスタイルの混在

同じページ内で参照脚注とインライン脚注を自由に混在させることができます:

```markdown
コンテンツをレンダリングするには `loadMarkdown`[^api] を使用します^[提供された任意の HTMLElement にレンダリングされます。]。

[^api]: 完全なAPIリファレンスについては、はじめにのページをご覧ください。
```

**結果:**

コンテンツをレンダリングするには `loadMarkdown`[^api] を使用します^[提供された任意の HTMLElement にレンダリングされます。]。

[^api]: 完全なAPIリファレンスについては、はじめにのページをご覧ください。

## 脚注のレンダリング

すべての脚注(参照およびインライン)は収集され、ページの下部にある`.lbs-footnotes` コンテナ内にレンダリングされます:

```html
<section class="lbs-footnotes">
  <ol>
    <li class="lbs-footnote-item" id="fn-1">…</li>
  </ol>
</section>
```

上付き文字の参照リンク(`[1]`)は `.lbs-footnote-ref` にラップされ、下部の脚注アイテムにリンクされます。
