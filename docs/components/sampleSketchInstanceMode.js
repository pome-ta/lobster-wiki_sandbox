import p5 from 'p5';
//console.log(p5);

const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(800, 400);
  };

  p.draw = () => {
    p.background(220);
    p.ellipse(50, 50, 80, 80);
  };
};

export default function mount(container) {
  new p5(sketch, container);
}
