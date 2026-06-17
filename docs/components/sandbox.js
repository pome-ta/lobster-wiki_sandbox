console.log('sandbox');

const P5_ORIGINAL = window.p5;
const P5_INSTANCES = new Set();

function WrappedP5(...args) {
  const instance = new P5_ORIGINAL(...args);
  P5_INSTANCES.add(instance);
  return instance;
}

WrappedP5.prototype = P5_ORIGINAL.prototype;
WrappedP5.prototype.constructor = WrappedP5;
Object.setPrototypeOf(WrappedP5, P5_ORIGINAL);

window.p5 = WrappedP5;
