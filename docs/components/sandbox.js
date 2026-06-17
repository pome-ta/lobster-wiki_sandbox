console.log('sandbox');

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

function runSketch(code) {
  P5_INSTANCES.forEach((instance) => instance.remove?.());
  P5_INSTANCES.clear();

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.textContent = `
    {
      ${code}
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
  if (!data || typeof data !== 'object' || !data.type) return;

  const handler = messageHandlers[data.type];
  if (handler) {
    handler(data);
  } else {
    console.warn('[sandbox.js] Unknown message type:', data.type);
  }
});

// ----------------------------------------------------
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
