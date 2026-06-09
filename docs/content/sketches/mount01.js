import p5 from 'p5';

import { sketch } from './mySketch01.js';
//console.log(p5);

let p5Instance;

export default function mount(container) {
  const playBtn = document.createElement('button');
  playBtn.textContent = 'loop';
  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'reset';

  const cnvsDiv = document.createElement('div');

  //console.log(container.getBoundingClientRect())

  container.appendChild(playBtn);
  container.appendChild(resetBtn);

  container.appendChild(cnvsDiv);
  //console.log(container.getBoundingClientRect());
  //console.log(cnvsDiv.getBoundingClientRect());

  p5Instance = new p5(sketch, cnvsDiv);
  /*
  p5Instance.canvas.width = '100%';
  p5Instance.canvas.height = 'auto';
  canvas
  */

  //console.log(p5Instance.canvas);
  console.log(cnvsDiv);

  setTimeout(() => {
    console.log('time out');
    console.log(p5Instance.canvas);
    
    p5Instance.canvas.style.maxWidth = '100%';
    p5Instance.canvas.style.height = 'auto';
    

  console.log(p5Instance.width);
  console.log(p5Instance);
  //console.log(p5Instance.getBoundingClientRect());
  console.log(container.getBoundingClientRect());
  console.log(cnvsDiv.getBoundingClientRect());
  }, 0);
/*
  console.log('init');
  console.log(p5Instance.width);
  console.log(p5Instance);
  //console.log(p5Instance.getBoundingClientRect());
  console.log(container.getBoundingClientRect());
  console.log(cnvsDiv.getBoundingClientRect());
*/
  playBtn.addEventListener('click', () => {
    console.log('btn');
    console.log(p5Instance.width);
    console.log(p5Instance);
    //console.log(p5Instance.getBoundingClientRect());
    console.log(container.getBoundingClientRect());
    console.log(cnvsDiv.getBoundingClientRect());
  });

  cnvsDiv.addEventListener('resize', () => {
    console.log('resize');
    console.log(p5Instance.width);
    console.log(p5Instance);
    //console.log(p5Instance.getBoundingClientRect());
    console.log(container.getBoundingClientRect());
    console.log(cnvsDiv.getBoundingClientRect());
  });
}
