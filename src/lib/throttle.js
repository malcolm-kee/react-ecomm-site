export function throttle(func, wait = 100) {
  let timer = null;
  return function throttledFunction(...args) {
    if (timer === null) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, wait);
    }
  };
}
