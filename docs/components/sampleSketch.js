import p5 from "p5";
console.log(p5)



const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(400, 400);
  };

  p.draw = () => {
    p.background(220);
    p.ellipse(50, 50, 80, 80);
  };
};


const p5sketch=new p5(sketch);

export default p5sketch;

