const v = 256;


export const  sketch = (p) => {
  p.setup = () => {
    p.createCanvas(v, v);
    p.colorMode(p.HSL, v, 1, 1);
  };

  p.draw = () => {
    p.background((p.frameCount / 2) % v, 1, 0.5);
  };
};


