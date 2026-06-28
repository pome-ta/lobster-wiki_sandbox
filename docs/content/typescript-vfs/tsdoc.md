# index.ts TSDoc 日本語版（前編）

## このファイルについて

`index.ts` は、`@typescript/vfs` のエントリーポイントである。

利用者は通常、このファイルだけを import すればよく、Virtual File System の構築から TypeScript の実行環境作成までに必要な API がまとめて公開されている。

内部実装は複数のファイルへ分割されているが、このファイルはそれらを外部へ公開する「窓口」の役割を持つ。

---

# createDefaultMapFromNodeModules()

## 概要

Virtual File System の初期状態を作成するための関数。

TypeScript はソースコードだけでは動作せず、`lib.d.ts` をはじめとする標準ライブラリ定義ファイルが必要になる。

この関数は、それらの定義ファイルを読み込み、Virtual File System 上で利用できる `Map<string, string>` を生成する。

生成された Map は、そのまま `createSystem()` や `createVirtualTypeScriptEnvironment()` に渡して利用する。

---

## 何のために存在するのか

Virtual File System を一から構築する場合、

- lib.es5.d.ts
- lib.dom.d.ts
- lib.es2015.d.ts
- ...

など多数のライブラリ定義を自分で読み込まなければならない。

この関数は、その準備作業を自動化するために用意されている。

---

## 主な利用場面

- TypeScript Playground の初期化
- Monaco Editor の TypeScript 環境構築
- ブラウザ上で Compiler API を利用するアプリケーション

---

## 戻り値

戻り値は

```ts
Map<string, string>;
```

である。

キーはファイルパス、

値はファイル内容となる。

この Map が Virtual File System の実体となる。

---

# createSystem()

## 概要

Virtual File System（Map）を、TypeScript が利用できる `ts.System` インターフェースへ変換する。

TypeScript Compiler は直接 Map を扱えないため、この変換処理が必要になる。

---

## 何をしているのか

例えば、

```ts
map.get("/index.ts");
```

という Map の操作を、

Compiler が期待する

```ts
system.readFile("/index.ts");
```

のような API へ変換している。

つまり、

Map と Compiler の橋渡しを行う Adapter の役割を持つ。

---

## 主な利用場面

- CompilerHost の生成
- Language Service の初期化
- Compiler API の利用

通常は利用者が直接 `System` を操作することは少なく、Environment 構築の途中で利用される。

---

# createVirtualCompilerHost()

## 概要

Virtual File System を利用するための `CompilerHost` を生成する。

通常の TypeScript は実際のファイルシステムを読み込むが、この Host を利用すると、メモリ上の Virtual File System をコンパイル対象として扱えるようになる。

---

## 役割

CompilerHost は、

Compiler が必要とする

- ファイル読み込み
- SourceFile の生成
- 出力処理

などを提供するインターフェースである。

Virtual CompilerHost は、それらの処理を Virtual File System 上で動作するよう実装している。

---

## 利用場面

通常は `createVirtualTypeScriptEnvironment()` の内部で利用される。

一方、

Compiler API を直接利用したい場合には、

利用者自身がこの関数を呼び出し、

Program や Compiler を組み立てることもできる。

---

# createVirtualTypeScriptEnvironment()

## 概要

`@typescript/vfs` の中心となる API。

Virtual File System 上で動作する TypeScript の実行環境を構築する。

戻り値として取得できる Environment は、

- Language Service
- CompilerHost
- LanguageServiceHost
- Virtual File System

などをまとめて管理している。

---

## なぜ必要なのか

TypeScript の Language Service は、

単独では利用できない。

利用するためには、

- ファイルシステム
- CompilerHost
- LanguageServiceHost
- CompilerOptions
- プロジェクト情報

など、多数のオブジェクトを準備する必要がある。

この関数は、それらを正しい順序で構築し、一つの Environment としてまとめて返してくれる。

そのため、利用者は複雑な初期化処理を意識する必要がない。

---

## 主な利用場面

ブラウザ上で TypeScript を利用するほぼすべてのケース。

例えば、

- Playground
- Web IDE
- オンラインエディタ
- 学習ツール
- AST ビューア

などで利用される。

---

## 設計上の位置付け

この関数は、

ライブラリ全体の Composition Root に相当する。

つまり、

各コンポーネントを生成し、

依存関係を接続し、

最終的な実行環境を完成させる役割を担っている。

また、

利用者から見ると、

複雑な内部構造を隠蔽する Facade の入口でもある。

---

## このファイルの役割まとめ

`index.ts` は、

個々の実装を持つファイルではなく、

`@typescript/vfs` の公開 API を整理して外部へ公開するエントリーポイントである。

利用者は通常、このファイルだけを import すれば Virtual File System の構築から Language Service の利用まで、一連の機能を利用できる。

ライブラリ内部では責務ごとに実装が分離されているが、利用者にはシンプルな API として提供されるよう設計されている。

# createVirtualTypeScriptEnvironment()

## シグネチャ

```ts
createVirtualTypeScriptEnvironment(
  system: ts.System,
  rootFiles: string[],
  ts: typeof import("typescript"),
  compilerOptions: ts.CompilerOptions,
  customTransformers?: CustomTransformers
): VirtualTypeScriptEnvironment
```

---

## 概要

Virtual File System 上で動作する TypeScript の実行環境を構築する。

Language Service や CompilerHost など、必要なオブジェクトを生成し、一つの `VirtualTypeScriptEnvironment` として返す。

---

## 引数

### `system`

```ts
ts.System;
```

TypeScript が利用するファイルシステム抽象化オブジェクト。

通常は `createSystem()` の戻り値を渡す。

---

### `rootFiles`

```ts
string[]
```

プロジェクトのルートとなるファイル一覧。

例

```ts
["/index.ts"];
```

ここから Program が構築される。

---

### `ts`

```ts
typeof import("typescript");
```

TypeScript Compiler API 本体。

通常は

```ts
import ts from "typescript";
```

で取得したものを渡す。

---

### `compilerOptions`

```ts
ts.CompilerOptions;
```

コンパイル設定。

例

```ts
{
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext
}
```

---

### `customTransformers`

```ts
CustomTransformers | undefined;
```

Emit 時に利用する Transformer。

省略可能。

---

## 戻り値

```ts
VirtualTypeScriptEnvironment;
```

以下のようなオブジェクトを返す。

- Language Service
- updateFile()
- createFile()
- deleteFile()
- languageService
- ...

---

## 利用例

```ts
const env = createVirtualTypeScriptEnvironment(
  system,
  ["/index.ts"],
  ts,
  compilerOptions,
);
```

---

## 注意点

- `system` は `createSystem()` で生成したものを利用する。
- `rootFiles` は Virtual File System 内に存在している必要がある。
- CompilerOptions は TypeScript の挙動に直接影響する。

---

## 関連 API

- createDefaultMapFromNodeModules()
- createSystem()
- createVirtualCompilerHost()
