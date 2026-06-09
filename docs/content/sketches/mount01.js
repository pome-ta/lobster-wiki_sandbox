import p5 from 'p5';

import { sketch } from './mySketch01.js';

let p5Instance;
let isLoop = false;
const pause = 'pause';
const loop = 'loop';

export default function mount(container) {
  const playBtn = document.createElement('button');
  playBtn.textContent = 'loop';
  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'reset';

  const cnvsDiv = document.createElement('div');

  container.appendChild(playBtn);
  container.appendChild(resetBtn);
  container.appendChild(cnvsDiv);

  const observer = new MutationObserver((mutations, obs) => {
    if (p5Instance && p5Instance.canvas) {
      p5Instance.canvas.style.maxWidth = '100%';
      p5Instance.canvas.style.height = 'auto';

      // 目的を果たしたら監視終了
      obs.disconnect();
    }
  });

  observer.observe(cnvsDiv, { childList: true });

  p5Instance = new p5(sketch, cnvsDiv);
  p5Instance.noLoop();

  playBtn.addEventListener('click', () => {
    playBtn.textContent = isLoop ? loop : pause;
    isLoop ? p5Instance.noLoop() : p5Instance.loop();
    isLoop = !isLoop;
  });

  resetBtn.addEventListener('click', () => {
    p5Instance.remove();
    p5Instance = new p5(sketch, cnvsDiv);
    isLoop = true;
    playBtn.textContent = pause;
  });
}
