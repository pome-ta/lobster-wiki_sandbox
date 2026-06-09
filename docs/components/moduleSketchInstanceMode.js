


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
  document.addEventListener('DOMContentLoaded', () => {
    console.log('sketch DOMContentLoaded');
  });
  new p5(sketch, container);
}
