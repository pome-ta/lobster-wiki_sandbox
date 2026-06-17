/*
const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(2000, 2000, p.WEBGL);

    p.background(150);
    p.stroke(0, 50);
    p.fill(255, 200);

    const xstart = p.random(10);
    let ynoise = p.random(10);

    p.translate(0, 0, 0);

    for (let y = -(p.height / 8); y <= p.height / 8; y += 3) {
      ynoise += 0.02;
      let xnoise = xstart;

      for (let x = -(p.width / 8); x <= p.width / 8; x += 3) {
        xnoise += 0.02;
        drawPoint(x, y, p.noise(xnoise, ynoise));
      }
    }
  };

  p.draw = () => {};

  const drawPoint = (x, y, noiseFactor) => {
    p.push();

    p.translate(x * noiseFactor * 4, y * noiseFactor * 4, -y);

    const edgeSize = noiseFactor * 26;
    p.ellipse(0, 0, edgeSize, edgeSize);

    p.pop();
  };
};

new p5(sketch);
*/
const title = '24 行のコードによるジェネラティブ・システム';

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight, setupRatio;

  
  p.setup = () => {
    // put setup code here
    console.log(p.windowWidth);
    const cnvs = p.createCanvas(2000, 2000, p.WEBGL);
    windowFlexSize();
    
    p.background(150);
    p.stroke(0, 50);
    p.fill(255, 200);
    
    const xstart = p.random(10);
    let ynoise = p.random(10);
    
    //p.translate(w/2, h/2, 0);
    for (let y = -(h / 8); y < h/8; y+=3) {
      ynoise += 0.02;
      let xnoise = xstart;
      for (let x = -(w / 8); x < w/8; x+=3) {
        xnoise += 0.02;
        drawPoint(x, y, p.noise(xnoise, ynoise));
      }
      
    }
    
    p.noLoop();
    p.debugMode();
    
  };

  p.draw = () => {
    // put drawing code here
    
  };
  
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

  function windowFlexSize(isFullSize = false) {
    const isInitialize =
      typeof setupWidth === 'undefined' || typeof setupHeight === 'undefined';
    [setupWidth, setupHeight] = isInitialize
      ? [p.width, p.height]
      : [setupWidth, setupHeight];

    const sizeRatio = 0.92;
    const _windowWidth = p.windowWidth * sizeRatio;
    const _windowHeight = p.windowHeight * sizeRatio;
    if (isFullSize) {
      w = _windowWidth;
      h = _windowHeight;
    } else {
      const widthRatio =
        _windowWidth < setupWidth ? _windowWidth / setupWidth : 1;
      const heightRatio =
        _windowHeight < setupHeight ? _windowHeight / setupHeight : 1;

      setupRatio = Math.min(widthRatio, heightRatio);
      w = setupWidth * setupRatio;
      h = setupHeight * setupRatio;
    }
    p.resizeCanvas(w, h);
  }
};



  // --- start
  new p5(sketch);


