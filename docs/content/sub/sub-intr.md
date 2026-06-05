# さぶいんとろ

```js
import { loadMarkdown } from
"https://hacknock.github.io/lobsterjs/lobster.js"
;

loadMarkdown("./content.md", document.getElementById("content"));
```

```inject:./components/sampleSketchInstanceMode.js
```

:::details sketch code

~~~javascript:./components/sampleSketchInstanceMode.js
~~~

:::









```inject
<div style="padding: 1rem; background: #e0f2fe; border-radius: 8px;">
  <p>ここは直接書いたHTMLです!</p>
  <button id="btn-__UUID__">クリックしてね</button>
</div>

<script>
      import eruda from 'eruda';

      console.log(eruda)
  // DOMが展開された直後に実行されます
  document.getElementById('btn-__UUID__').addEventListener('click', () => {
    alert('Markdown内に書かれたJSが実行されました!');
  });
</script>
```

- ほげ
- ふが

## `./components` 呼び出し

### `.js` ファイル

```inject:./components/sampleButton.js

```

### `.html` ファイル

```inject:./components/sampleButton.html

```

## にゃー

_ほげー_

```inject
<div style="padding: 1rem; background: #e0f2fe; border-radius: 8px;">
  <p>2ここは直接書いたHTMLです!</p>
  <button id="btn-__UUID__">2クリックしてね</button>
</div>

<script>
      import eruda from 'eruda';

      console.log(eruda)
  // DOMが展開された直後に実行されます
  document.getElementById('btn-__UUID__').addEventListener('click', () => {
    alert('2Markdown内に書かれたJSが実行されました!');
  });
</script>
```
