import p5 from 'p5';

import { sketch } from './mySketch01.js';

let p5Instance;
let isLoop = false;
const pause = 'pause';
const loop = 'loop';

export default function mount(container) {
  const playBtn = document.createElement('button');
  playBtn.textContent = loop;
  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'reset';

  const flexDiv = document.createElement('div');
  flexDiv.style.display = 'flex';
  flexDiv.style.justifyContent = 'space-between';
  flexDiv.style.margin = '1rem';
  const cnvsDiv = document.createElement('div');

  flexDiv.appendChild(playBtn);
  flexDiv.appendChild(resetBtn);
  container.appendChild(flexDiv);

  container.appendChild(cnvsDiv);

  function initSketch() {
    // p5Instance ? p5Instance.remove() : null;
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

  playBtn.addEventListener('click', () => {
    isLoop ? p5Instance.noLoop() : p5Instance.loop();
    playBtn.textContent = isLoop ? loop : pause;
    isLoop = !isLoop;
  });

  resetBtn.addEventListener('click', () => {
    initSketch();
  });
}
