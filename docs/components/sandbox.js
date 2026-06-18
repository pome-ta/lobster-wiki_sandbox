import * as Babel from '@babel/standalone';

const MAX_LOOP_DURATION_MS = 200;
// 無限ループ保護用 Babel プラグイン (AST解析と書き換え)
// ----------------------------------------------------
const loopProtectPlugin = function ({ types: t }) {
  return {
    visitor: {
      Loop(path) {
        if (path.node._loopProtectProcessed) {
          return;
        }
        path.node._loopProtectProcessed = true;
        const dateNowExpr = t.callExpression(t.memberExpression(t.identifier('Date'), t.identifier('now')), []);

        // ループ開始時間を記録
        const startVar = path.scope.generateUidIdentifier('loopStart');
        path.insertBefore(t.variableDeclaration('const', [t.variableDeclarator(startVar, dateNowExpr)]));

        // 指定時間を超えたらエラーを投げる
        const checkStatement = t.ifStatement(
          t.binaryExpression(
            '>',
            t.binaryExpression('-', dateNowExpr, startVar),
            t.numericLiteral(MAX_LOOP_DURATION_MS),
          ),
          t.throwStatement(t.newExpression(t.identifier('Error'), [t.stringLiteral('Error: Infinite loop detected!')])),
        );

        if (!t.isBlockStatement(path.node.body)) {
          path.node.body = t.blockStatement([path.node.body]);
        }

        path.node.body.body.unshift(checkStatement);
      },
    },
  };
};

// p5 Wrapper
// ----------------------------------------------------
const P5_ORIGINAL = window.p5;
const P5_INSTANCES = new Set();

function WrappedP5(...args) {
  const instance = new P5_ORIGINAL(...args);
  P5_INSTANCES.add(instance);
  return instance;
}

WrappedP5.prototype = P5_ORIGINAL.prototype;
WrappedP5.prototype.constructor = WrappedP5;
Object.setPrototypeOf(WrappedP5, P5_ORIGINAL);
window.p5 = WrappedP5;

// Run Sketch
// ----------------------------------------------------
function runSketch(code) {
  P5_INSTANCES.forEach((instance) => instance.remove?.());
  P5_INSTANCES.clear();

  let safeCode = code;
  try {
    // Babelを使ってコードにループ保護を差し込む
    const output = Babel.transform(code, {
      plugins: [loopProtectPlugin],
    });
    safeCode = output.code;
  } catch (err) {
    // 構文エラー時はそのまま流す
    console.warn('[sandbox.js] Babel transform failed, running original code.', err);
  }

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.textContent = `
    {
      ${safeCode}
    }
  `;
  document.body.appendChild(script);

  if (P5_INSTANCES.size === 0) {
    try {
      new window.p5();
    } catch (err) {
      console.warn('[sandbox.js] p5 init error (Global Mode):', err);
    }
  }
  document.body.removeChild(script);
}

const messageHandlers = {
  loadSketch: (data) => {
    if (typeof data.code === 'string') runSketch(data.code);
  },
  setLoop: (data) => {
    if (typeof data.isLoop === 'boolean') {
      P5_INSTANCES.forEach((instance) => {
        data.isLoop ? instance.loop?.() : instance.noLoop?.();
      });
    }
  },
};

window.addEventListener('message', (e) => {
  const data = e.data;
  if (!data || typeof data !== 'object' || !data.type) {
    return;
  }

  return;

  const handler = messageHandlers[data.type];
  if (handler) {
    handler(data);
  } else {
    console.warn('[sandbox.js] Unknown message type:', data.type);
  }
});

// Canvas Size Observer
// ----------------------------------------------------
const reportSize = (canvas) => {
  window.parent.postMessage(
    {
      type: 'resize',
      width: canvas.width,
      height: canvas.height,
    },
    '*',
  );
};

const domObserver = new MutationObserver((mutations, obs) => {
  const addedElements = mutations
    .flatMap((m) => Array.from(m.addedNodes))
    .filter((node) => node.nodeType === Node.ELEMENT_NODE);

  for (const node of addedElements) {
    const canvas = node.nodeName === 'CANVAS' ? node : node.querySelector('canvas');
    if (!canvas) continue;

    canvas.style.maxWidth = '100%';
    canvas.style.height = 'auto';

    reportSize(canvas);

    const sizeObserver = new MutationObserver(() => reportSize(canvas));
    sizeObserver.observe(canvas, {
      attributes: true,
      attributeFilter: ['width', 'height'],
    });

    obs.disconnect();
    return;
  }
});

domObserver.observe(document.body, { childList: true, subtree: true });
