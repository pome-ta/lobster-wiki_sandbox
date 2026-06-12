# p5 (test-sketchComponent)


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
