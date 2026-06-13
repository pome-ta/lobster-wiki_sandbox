export const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(2000, 2000, p.WEBGL);
    p.background(150);
    p.stroke(0, 50);
    p.fill(255, 200);

    const xstart = p.random(10);
    let ynoise = p.random(10);

    for (let y = -(p.height / 8); y < p.height / 8; y += 3) {
      ynoise += 0.02;
      let xnoise = xstart;
      for (let x = -(p.width / 8); x < p.width / 8; x += 3) {
        xnoise += 0.02;
        drawPoint(x, y, p.noise(xnoise, ynoise));
      }
    }

    p.noLoop();
  };

  p.draw = () => {};

  function drawPoint(x, y, noiseFactor) {
    p.push();
    //p.translate(-w/2, -h/2, 0);
    p.translate(x * noiseFactor * 4, y * noiseFactor * 4, -y);
    //p.translate(w/2, h/2, 0);
    //p.translate(noiseFactor * 4, noiseFactor * 4, -y);
    const edgeSize = noiseFactor * 26;
    //p.ellipse(x, y, edgeSize, edgeSize);
    p.ellipse(0, 0, edgeSize, edgeSize);
    p.pop();
  }
};
