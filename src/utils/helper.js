export function delayFunction(func, delayTime = 1000) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delayTime);
  };
}
