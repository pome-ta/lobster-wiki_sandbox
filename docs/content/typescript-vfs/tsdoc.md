# @typescript/vfs API リファレンス

このドキュメントは `packages/typescript-vfs/src/index.ts` の公開 API を簡潔にまとめたリファレンスである。

---

# VirtualTypeScriptEnvironment

## 概要

Virtual File System 上で動作する TypeScript 実行環境。

`createVirtualTypeScriptEnvironment()` の戻り値として取得する。

## プロパティ

| 名前              | 型                                                                        | 説明                |
| ----------------- | ------------------------------------------------------------------------- | ------------------- |
| `sys`             | `System`                                                                  | Virtual File System |
| `languageService` | `ts.LanguageService`                                                      | Language Service    |
| `getSourceFile()` | `(fileName: string) => SourceFile \| undefined`                           | `SourceFile` を取得 |
| `createFile()`    | `(fileName: string, content: string) => void`                             | ファイルを作成      |
| `updateFile()`    | `(fileName: string, content: string, replaceTextSpan?: TextSpan) => void` | ファイルを更新      |
| `deleteFile()`    | `(fileName: string) => void`                                              | ファイルを削除      |

---

# createVirtualTypeScriptEnvironment()

## シグネチャ

```ts
createVirtualTypeScriptEnvironment(
  sys: System,
  rootFiles: string[],
  ts: TS,
  compilerOptions?: CompilerOptions,
  customTransformers?: CustomTransformers
): VirtualTypeScriptEnvironment
```

## 概要

Virtual File System 上で動作する TypeScript 実行環境を構築する。

`@typescript/vfs` の中心となる API。

Virtual File System 上で動作する TypeScript の実行環境を構築する。

戻り値として取得できる Environment は、

- Language Service
- CompilerHost
- LanguageServiceHost
- Virtual File System

などをまとめて管理している。

## 引数

| 名前                 | 型                   | 説明                           |
| -------------------- | -------------------- | ------------------------------ |
| `sys`                | `System`             | 仮想ファイルシステム           |
| `rootFiles`          | `string[]`           | プロジェクトのルートファイル   |
| `ts`                 | `TS`                 | TypeScript モジュール          |
| `compilerOptions`    | `CompilerOptions`    | コンパイル設定（省略可）       |
| `customTransformers` | `CustomTransformers` | カスタム Transformer（省略可） |

## 戻り値

`VirtualTypeScriptEnvironment`

---

## なぜ必要なのか

TypeScript の Language Service は、単独では利用できない。

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

この関数は、ライブラリ全体の Composition Root に相当する。

つまり、各コンポーネントを生成し、依存関係を接続し、最終的な実行環境を完成させる役割を担っている。

また、利用者から見ると、複雑な内部構造を隠蔽する Facade の入口でもある。

---

# knownLibFilesForCompilerOptions()

## シグネチャ

```ts
knownLibFilesForCompilerOptions(
  compilerOptions: CompilerOptions,
  ts: TS
): string[]
```

## 概要

`target` や `lib` の設定から、読み込む標準ライブラリファイル一覧を返す。

## 戻り値

`string[]`

---

# createDefaultMapFromNodeModules()

## シグネチャ

```ts
createDefaultMapFromNodeModules(
  compilerOptions: CompilerOptions,
  ts?: TS,
  tsLibDirectory?: string
): Map<string, string>
```

## 概要

ローカルの TypeScript パッケージから `lib*.d.ts` を読み込み、Virtual File System 用の `Map` を生成する。

Virtual File System の初期状態を作成するための関数。

TypeScript はソースコードだけでは動作せず、`lib.d.ts` をはじめとする標準ライブラリ定義ファイルが必要になる。

この関数は、それらの定義ファイルを読み込み、Virtual File System 上で利用できる `Map<string, string>` を生成する。

生成された Map は、そのまま `createSystem()` や `createVirtualTypeScriptEnvironment()` に渡して利用する。

## 戻り値

`Map<string, string>`

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

キーはファイルパス、値はファイル内容となる。

この Map が Virtual File System の実体となる。

---

# addAllFilesFromFolder()

## シグネチャ

```ts
addAllFilesFromFolder(
  map: Map<string, string>,
  workingDir: string
): void
```

## 概要

指定ディレクトリ以下の `.ts` / `.tsx` ファイルを再帰的に読み込み、Map に追加する。

---

# addFilesForTypesIntoFolder()

## シグネチャ

```ts
addFilesForTypesIntoFolder(
  map: Map<string, string>
): void
```

## 概要

`node_modules/@types` 以下の型定義ファイルを Map に追加する。

---

# LZString

## 概要

ライブラリファイルを圧縮・展開するためのインターフェース。

## メソッド

```ts
compressToUTF16(input: string): string

decompressFromUTF16(compressed: string): string
```

---

# createDefaultMapFromCDN()

## シグネチャ

```ts
createDefaultMapFromCDN(
  options: CompilerOptions,
  version: string,
  cache: boolean,
  ts: TS,
  lzstring?: LZString,
  fetcher?: FetchLike,
  storer?: LocalStorageLike
): Promise<Map<string, string>>
```

## 概要

CDN から TypeScript の標準ライブラリを取得し、Virtual File System 用の `Map` を生成する。

## 備考

`cache` が `true` の場合は `localStorage` を利用してキャッシュする。

---

# createSystem()

## シグネチャ

```ts
createSystem(
  files: Map<string, string>
): System
```

## 概要

`Map<string, string>` を `ts.System` に変換する。

TypeScript Compiler API が Virtual File System を利用できるようになる。

Virtual File System（Map）を、TypeScript が利用できる `ts.System` インターフェースへ変換する。

TypeScript Compiler は直接 Map を扱えないため、この変換処理が必要になる。

---

## 何をしているのか

例えば、

```ts
map.get("/index.ts");
```

という Map の操作を、Compiler が期待する

```ts
system.readFile("/index.ts");
```

のような API へ変換している。

つまり、Map と Compiler の橋渡しを行う Adapter の役割を持つ。

---

## 主な利用場面

- CompilerHost の生成
- Language Service の初期化
- Compiler API の利用

通常は利用者が直接 `System` を操作することは少なく、Environment 構築の途中で利用される。

---

# createFSBackedSystem()

## シグネチャ

```ts
createFSBackedSystem(
  files: Map<string, string>,
  projectRoot: string,
  ts: TS,
  tsLibDirectory?: string
): System
```

## 概要

Virtual File System と実際のファイルシステムを組み合わせた `System` を生成する。

仮想ファイルを優先し、それ以外は実ファイルシステムを参照する。

---

# createVirtualCompilerHost()

## シグネチャ

```ts
createVirtualCompilerHost(
  sys: System,
  compilerOptions: CompilerOptions,
  ts: TS
)
```

## 概要

Virtual File System 上で動作する `CompilerHost` を生成する。

通常の TypeScript は実際のファイルシステムを読み込むが、この Host を利用すると、メモリ上の Virtual File System をコンパイル対象として扱えるようになる。

## 戻り値

以下を持つオブジェクト。

- `compilerHost`
- `updateFile()`
- `deleteFile()`

---

## 役割

CompilerHost は、Compiler が必要とする

- ファイル読み込み
- SourceFile の生成
- 出力処理

などを提供するインターフェースである。

Virtual CompilerHost は、それらの処理を Virtual File System 上で動作するよう実装している。

---

## 利用場面

通常は `createVirtualTypeScriptEnvironment()` の内部で利用される。

一方、Compiler API を直接利用したい場合には、利用者自身がこの関数を呼び出し、Program や Compiler を組み立てることもできる。

---

# createVirtualLanguageServiceHost()

## シグネチャ

```ts
createVirtualLanguageServiceHost(
  sys: System,
  rootFiles: string[],
  compilerOptions: CompilerOptions,
  ts: TS,
  customTransformers?: CustomTransformers
)
```

## 概要

Virtual File System 上で利用する `LanguageServiceHost` を生成する。

## 戻り値

以下を持つオブジェクト。

- `languageServiceHost`
- `updateFile()`
- `deleteFile()`
