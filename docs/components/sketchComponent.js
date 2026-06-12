import p5 from 'p5';

const pause = 'pause';
const loop = 'loop';

const initDetailsOpen = false;
const summaryTextContent = (bool) => `sketch: ${bool ? 'hide' : 'show'}`;

export default async function mount(container, { modulePath }) {
  const { sketch } = await import(modulePath);
  let p5Instance;
  let isLoop = false;

  const playBtn = document.createElement('button');
  playBtn.textContent = loop;
  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'reset';

  const summary = document.createElement('summary');
  summary.textContent = summaryTextContent(initDetailsOpen);

  const details = document.createElement('details');
  details.open = !initDetailsOpen;
  details.appendChild(summary);

  const flexDiv = document.createElement('div');
  flexDiv.style.display = 'flex';
  flexDiv.style.justifyContent = 'space-between';
  flexDiv.style.margin = '1rem';

  [playBtn, details, resetBtn].forEach((el) => {
    flexDiv.appendChild(el);
  });
  container.appendChild(flexDiv);

  const cnvsDiv = document.createElement('div');
  cnvsDiv.style.display = initDetailsOpen ? '' : 'none';
  container.appendChild(cnvsDiv);

  function initSketch() {
    p5Instance?.remove();

    const observer = new MutationObserver((mutations, obs) => {
      if (p5Instance && p5Instance.canvas) {
        p5Instance.canvas.style.maxWidth = '100%';
        p5Instance.canvas.style.height = 'auto';
        obs.disconnect(); // スタイルを当てたら棄却
      }
    });
    observer.observe(cnvsDiv, { childList: true });

    p5Instance = new p5(sketch, cnvsDiv);
    isLoop ? null : p5Instance.noLoop();
    playBtn.textContent = isLoop ? pause : loop;
  }

  initSketch();

  const detailsControl = (isDetailsOpen, summaryElement, divElement) => {
    summaryElement.textContent = summaryTextContent(isDetailsOpen);
    divElement.style.display = isDetailsOpen ? '' : 'none';
  };

  details.addEventListener('toggle', (e) => {
    detailsControl(e.target.open, summary, cnvsDiv);
  });

  playBtn.addEventListener('click', () => {
    isLoop ? p5Instance.noLoop() : p5Instance.loop();
    playBtn.textContent = isLoop ? loop : pause;
    isLoop = !isLoop;
  });

  resetBtn.addEventListener('click', () => {
    initSketch();
  });
}
