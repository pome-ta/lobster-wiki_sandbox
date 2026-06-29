# memo

# 📝 2026/06/29


## `getScriptSnapshot` での空ファイルの取り扱い

ファイル生成しても、中身が空の文字列であると、エラーになる

- [Module(vfs): throws an error when the file content is empty string · Issue #2713 · microsoft/TypeScript-Website · GitHub](https://github.com/microsoft/TypeScript-Website/issues/2713)
- [Fix getScriptSnapshot for file with empty content by nanokind · Pull Request #3358 · microsoft/TypeScript-Website · GitHub](https://github.com/microsoft/TypeScript-Website/pull/3358)

```js
// 初期ファイルを空文字 ("") にすると `createVirtualTypeScriptEnvironment()` が
// TS6053 を投げる既知の問題があるため、"\n" を初期値として登録
fsMap.set('/main.ts', '\n');
```


## log とり

```js
// 作成するコード
const code = `
document.body;
`;

// 仮想ファイルを作成
env.createFile('/main.ts', code);

// "document" の位置を取得
const position = code.indexOf('document');

// QuickInfo を取得
const info = env.languageService.getQuickInfoAtPosition('/main.ts', position);

console.log(info);
console.log(ts.displayPartsToString(info.displayParts));
console.log(ts.displayPartsToString(info.documentation));

```


```js
const code = `
console.
`;

env.createFile('/main.ts', code);

const position = code.indexOf('.') + 1;

const completions = env.languageService.getCompletionsAtPosition(
  '/main.ts',
  position,
  {},
);

console.log(completions);
console.log(completions.entries.slice(0, 20));
```


