const v = 640;

const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(v, v);
    p.colorMode(p.HSL, v, 1, 1);
  };

  p.draw = () => {
    p.background(p.frameCount % v, 1, 0.5);
  };
};

new p5(sketch);
