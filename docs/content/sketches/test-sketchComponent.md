# p5 (test-sketchComponent)


## webGL

`WARNING: Too many active WebGL contexts. Oldest context will be lost.`

[Too many active WebGL contexts. Oldest context will be lost. · Issue #5767 · processing/p5](https://github.com/processing/p5.js/issues/5767)


### gemini 検索提案

#### 1. WebGL拡張機能を使って強制的にコンテキストを失効させる

p5.jsの `.remove()` だけではブラウザのメモリ上にWebGLが残り続けることがあります。キャンバスを消す前に、WebGLの内部拡張（`WEBGL_lose_context`）を直接呼び出してコンテキストを強制終了します。


```js
// removeする直前に実行する処理
if (mySketch) {
  // p5内部のcanvas要素を取得
  const canvas = mySketch.canvas; 
  if (canvas) {
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      // 強制失効の拡張機能を取得して実行
      const loseContextExt = gl.getExtension('WEBGL_lose_context');
      if (loseContextExt) loseContextExt.loseContext();
    }
  }
  mySketch.remove();
  mySketch = null;
}
```

#### 2. Canvas要素の幅と高さを「0」にしてメモリを解放する


2000×2000のキャンバスは大量のVRAM（ビデオメモリ）を消費します。`.remove()` を呼ぶ前にキャンバスの解像度を 0×0 に書き換えることで、ブラウザに「この大きなメモリはもう不要である」と即座に伝えてVRAMを開放させます。

```js
if (mySketch) {
  if (mySketch.canvas) {
    mySketch.canvas.width = 0;
    mySketch.canvas.height = 0;
  }
  mySketch.remove();
  mySketch = null;
}
```

#### `async / await` に組み込む実装例

```js
// どこでも使える「指定ミリ秒待つ」ための共通関数
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 外部イベントで呼ばれる async 関数
async function handleExternalEvent() {
  
  // 1. 古いインスタンスの WebGL コンテキストを強制解放して削除
  if (mySketch) {
    const canvas = mySketch.canvas;
    if (canvas) {
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        const loseContextExt = gl.getExtension('WEBGL_lose_context');
        if (loseContextExt) {
          loseContextExt.loseContext(); // 💡コンテキストを強制失効
        }
      }
      canvas.width = 0;  // 💡メモリをゼロにする
      canvas.height = 0;
    }
    
    mySketch.remove();
    mySketch = null;
  }

  // 2. ここでブラウザのガベージコレクション（メモリ解放）を待つ
  // 2000x2000は巨大なので、60〜100msほど待つと確実です
  await sleep(60);

  // 3. すっきりした状態で新しいインスタンスを生成
  mySketch = new p5(sketchFunction, 'container-id');
}
```



#### 5. `resizeCanvas` で一時的にサイズを小さくしてから削除する


p5.jsの標準機能である `resizeCanvas()` を使い、インスタンスを消去する直前にキャンバスサイズを極小（1×1など）に変更します。p5.jsの内部システムに対して安全にWebGLバッファの縮小・解放を要求してから `.remove()` を実行します。


```js
if (mySketch) {
  // 消す前に1x1ピクセルに縮小し、WebGLの負荷を下げる
  mySketch.resizeCanvas(1, 1); 
  
  mySketch.remove();
  mySketch = null;
}
```

### 引き継ぎテキスト


~~~.md
### 【相談内容】p5.js (WebGL) のコンテキスト上限エラーの解決について

#### 1. 開発環境と前提条件
* **言語/構成**: Vanilla JS (純粋なJavaScript) を使用。
* **描画モード**: p5.js の `Instance Mode` (`new p5(...)`) で実装。
* **キャンバスサイズ**: `p.createCanvas(2000, 2000, p.WEBGL)` と非常に大きいサイズ。
* **リセットの仕様**: 外部イベントを契機に、既存のインスタンスに対して `.remove()` を実行した直後、新たに `new p5()` を生成して描画を初期化（リセット）している。
* **制約事項**: 
  - インスタンスやキャンバスを「使い回す設計」への変更は不可（現在の「作って壊す」設計のまま解決したい）。
  - 一連のリセット処理は `async/await` を用いた非同期フローの中で制御している。

#### 2. 発生している問題
リセット時に以下の警告（Warning）が発生する。
`p5 p.WEBGL WARNING: Too many active WebGL contexts. Oldest context will be lost.`

#### 3. 原因
p5.js の `.remove()` だけでは、ブラウザ側のWebGLキャッシュやVRAM（ビデオメモリ）の解放（ガベージコレクション）が間に合わない。その状態のまま、2000×2000という巨大な次のWebGLコンテキストが同期的に生成されるため、ブラウザが保持できるWebGLの同時上限数を超えてしまっている。

#### 4. これから検証したい5つの解決提案（未検証）
現在の「作って壊す」設計および「async/awaitフロー」を維持したまま、エラーを回避するために出されたアイデア一覧です。これから実装・検証を行います。

* **提案A：WebGL拡張機能で強制失効（最有力候補）**
  `.remove()` を呼ぶ前に、キャンバスからWebGLの内部拡張（`WEBGL_lose_context`）を直接呼び出し、コンテキストを強制終了させる。
* **提案B：Canvas要素のサイズを「0」にする**
  `.remove()` の直前に `canvas.width = 0; canvas.height = 0;` を実行し、ブラウザにVRAM（ビデオメモリ）の解放を促す。
* **提案C：`async/await` 内でスリープ（時間差）を入れる（最有力候補）**
  古いインスタンスを削除した後、`await sleep(60);`（約60〜100msの待機）を挟むことで、ブラウザがメモリを掃除する時間を作ってから次の `new p5()` を実行する。
* **提案D：`resizeCanvas` で極小化してから削除する**
  `.remove()` を実行する直前に、p5の機能である `mySketch.resizeCanvas(1, 1);` を呼び出し、バッファを安全に縮小させてから破棄する。
* **提案E：【参考】インスタンスを破棄せず中身だけリセットする（※現在は採用見送り）**
  `new p5()` をやり直さず、自作のリセット関数で描画内容と変数だけを初期化する（※現在の設計を変更したくないため、上記A〜Dで解決しない場合の最終手段とする）。

#### 5. 仮の実装コード案（提案A, B, Cを組み合わせたもの・未検証）
現在、最も効果が高いと予想されている「強制失効 ＋ サイズ0化 ＋ 非同期スリープ」を盛り込んだコード案です。

```javascript
// 指定ミリ秒待機するスリープ関数
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 外部イベントで呼ばれる async 関数
async function handleExternalEvent() {
  
  // 1. 古いインスタンスが存在すれば、WebGLを明示的に強制解放して削除
  if (mySketch) {
    const canvas = mySketch.canvas;
    if (canvas) {
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        const loseContextExt = gl.getExtension('WEBGL_lose_context');
        if (loseContextExt) {
          loseContextExt.loseContext(); // ★提案A: WEBGLコンテキストを即座に強制失効
        }
      }
      canvas.width = 0;  // ★提案B: 2000x2000の巨大なVRAM消費をゼロにする
      canvas.height = 0;
    }
    
    mySketch.remove();
    mySketch = null;
  }

  // 2. 提案C: ブラウザが古いキャンバスのメモリを完全に破棄するのを待つ（60〜100msで調整）
  await sleep(60);

  // 3. メモリがすっきりした状態で、新しいインスタンスを安全に生成
  mySketch = new p5(sketchFunction, 'container-id');
}
```

---
上記の前提を踏まえて、これからA〜Dの検証を進めたいです。各コードの具体的な組み込み方や、試した結果エラーが変わった場合の対策について相談に乗ってください。

~~~


## note

p5 のsketch を並べて表示。
ソースコードも確認できるように。

`index.html` で、`importmap` して、`p5` を持たせておく。


## `./components/sketchComponent.js`

関数`mount` の引数（`container`, `{ modulePath }`）で、inject し生成した中の世界で調整できるように


- `container`
  - 差し込むelement
  - これを親に要素を追加
    - `.appendChild` 
    - `.innerHTML`
  - `id` や`class` で管理せずとも変数を触れる
- `{ modulePath }`
  - sketch コードのモジュール

前提として、`modulePath` のコードは、sample としてのピュアな状態に。
ここの描画上でのサイズ調整は、`sketchComponent.js` で行う。


全sketch が全稼働すると負担が大きいので、ボタンでループをさせたり止めたり、リセット時にはその前の状態を継続。



```javascript:./components/sketchComponent.js
```




## コンポーネント01

```inject:./components/sketchComponent.js
{
  "modulePath": "../content/sketches/mySketch01.js"
}
```

:::details sketch SourceCode

```javascript:./content/sketches/mySketch01.js

```

:::


## コンポーネント02

```inject:./components/sketchComponent.js
{
  "modulePath": "../content/sketches/mySketch02.js"
}
```

## mySketch01

```inject:./content/sketches/mount01.js

```

:::details sketch SourceCode

```javascript:./content/sketches/mySketch01.js

```

:::

## mySketch02

```inject:./content/sketches/mount02.js

```

:::details sketch code

```javascript:./content/sketches/mySketch02.js

```

:::
