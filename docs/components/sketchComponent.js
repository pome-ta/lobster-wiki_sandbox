import p5 from 'p5';

const pause = 'pause';
const loop = 'loop';

const initDetailsOpen = false;
const summaryTextContent = (bool) => `sketch: (tap to ${bool ? 'hide' : 'show'})`;

const detailsControl = (isDetailsOpen, summaryElement, divElement) => {
  summaryElement.textContent = summaryTextContent(isDetailsOpen);
  divElement.style.display = isDetailsOpen ? '' : 'none';
};

export default async function mount(container, { modulePath }) {
  const { sketch } = await import(modulePath);

  let p5Instance = null;
  let isLoop = false;

  // --- buttons
  const playBtn = document.createElement('button');
  playBtn.textContent = loop;
  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'reset';

  // --- details
  const details = document.createElement('details');
  details.style.flexGrow = '1';
  details.open = !initDetailsOpen;
  const summary = document.createElement('summary');
  summary.textContent = summaryTextContent(initDetailsOpen);
  summary.classList.add('lbs-summary');
  details.appendChild(summary);

  // --- div (details and 'buttons)
  const flexDiv = document.createElement('div');
  flexDiv.style.display = 'flex';
  flexDiv.style.gap = '0.64rem';
  //flexDiv.style.justifyContent = 'space-between';
  flexDiv.style.margin = '0.64rem 0';

  // --- div (p5 canvas target)
  const cnvsDiv = document.createElement('div');
  cnvsDiv.style.display = initDetailsOpen ? '' : 'none';

  //container.style.margin = '4rem';
  container.classList.add('lbs-details');

  // --- DOM layout (appendChild)
  [details, playBtn, resetBtn].forEach((el) => flexDiv.appendChild(el));
  container.appendChild(flexDiv);
  container.appendChild(cnvsDiv);

  function initSketch() {

    
    if (p5Instance) {
      const p5Canvas = p5Instance.canvas;
      console.log(p5Canvas)
    }
    
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
