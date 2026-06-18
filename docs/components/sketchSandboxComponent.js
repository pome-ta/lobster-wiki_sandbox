const pause = 'pause';
const loop = 'loop';
const initDetailsOpen = false;

const summaryTextContent = (bool) => `sketch: (tap to ${bool ? 'hide' : 'show'})`;

const detailsControl = (isDetailsOpen, summaryElement, divElement) => {
  summaryElement.textContent = summaryTextContent(isDetailsOpen);
  divElement.style.display = isDetailsOpen ? '' : 'none';
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchSourceCode(path) {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${path}`);
  }
  return await res.text();
}

function createSandbox() {
  const sb = document.createElement('iframe');

  const attrs = {
    id: 'sandbox',
    sandbox: 'allow-same-origin allow-scripts',
    allow:
      'accelerometer; ambient-light-sensor; autoplay; bluetooth; camera; encrypted-media; geolocation; gyroscope; hid; microphone; magnetometer; midi; payment; usb; serial; vr; xr-spatial-tracking',
    loading: 'lazy',
    src: './components/sandbox.html',
  };
  Object.entries(attrs).forEach(([key, value]) => sb.setAttribute(key, value));

  Object.assign(sb.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    border: 'none',
  });

  return sb;
}

export default async function mount(container, { modulePath, playBtnDisabled = false, resetBtnDisabled = false }) {
  const sourceCode = await fetchSourceCode(modulePath);
  let isLoop = false;

  // --- UI Elements ---
  const playBtn = document.createElement('button');
  playBtn.textContent = loop;
  playBtn.disabled = playBtnDisabled;

  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'reset';
  resetBtn.disabled = resetBtnDisabled;

  const details = document.createElement('details');
  details.style.flexGrow = '1';
  details.open = !initDetailsOpen;

  const summary = document.createElement('summary');
  summary.textContent = summaryTextContent(initDetailsOpen);
  summary.classList.add('lbs-summary');
  details.appendChild(summary);

  const flexDiv = document.createElement('div');
  Object.assign(flexDiv.style, {
    display: 'flex',
    gap: '0.64rem',
    margin: '0.64rem 0',
  });

  container.classList.add('lbs-details');
  [details, playBtn, resetBtn].forEach((el) => flexDiv.appendChild(el));
  container.appendChild(flexDiv);

  // --- iframe State ---
  let sketchSandbox = null;
  let currentMessageHandler = null;

  const sandboxWrapper = document.createElement('div');
  Object.assign(sandboxWrapper.style, {
    position: 'relative',
    maxWidth: '100%',
    // backgroundColor: 'maroon',
    display: details.open ? '' : 'none',
  });
  container.appendChild(sandboxWrapper);

  async function initSketchSandbox() {
    if (sketchSandbox) {
      sketchSandbox.remove();
      sketchSandbox = null;
      if (currentMessageHandler) {
        window.removeEventListener('message', currentMessageHandler);
        currentMessageHandler = null;
      }
      sandboxWrapper.style.width = '';
      sandboxWrapper.style.aspectRatio = '';
      await sleep(1);
    }

    sketchSandbox = createSandbox();
    sandboxWrapper.appendChild(sketchSandbox);

    currentMessageHandler = (e) => {
      if (e.source !== sketchSandbox.contentWindow) {
        return;
      }
      const data = e.data;

      if (data?.type === 'resize') {
        sandboxWrapper.style.width = `${data.width}px`;
        sandboxWrapper.style.aspectRatio = `${data.width} / ${data.height}`;
      }
    };
    window.addEventListener('message', currentMessageHandler);

    const loadPromise = new Promise((resolve) => {
      sketchSandbox.addEventListener(
        'load',
        () => {
          sketchSandbox.contentWindow.postMessage({ type: 'loadSketch', code: sourceCode }, '*');
          resolve();
        },
        { once: true },
      );
    });

    playBtn.textContent = isLoop ? pause : loop;
    await loadPromise;
  }

  initSketchSandbox();

  // --- Event Listeners ---
  details.addEventListener('toggle', (e) => {
    detailsControl(e.target.open, summary, sandboxWrapper);
  });

  playBtn.addEventListener('click', () => {
    isLoop = !isLoop;
    sketchSandbox?.contentWindow?.postMessage({ type: 'setLoop', isLoop }, '*');
    playBtn.textContent = isLoop ? pause : loop;
  });

  resetBtn.addEventListener('click', async () => {
    const textContent = resetBtn.textContent;
    resetBtn.textContent = '... ...';
    resetBtn.disabled = true;

    await initSketchSandbox();

    resetBtn.disabled = false;
    resetBtn.textContent = textContent;
  });
}
