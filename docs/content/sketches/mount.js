import p5 from 'p5';

import { sketch } from './mySketch.js';
//console.log(p5);



export default function mount(container) {

  new p5(sketch, container);
}

