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

export function callAll(...fns) {
  return function callAllFns(...args) {
    fns.forEach((fn) => typeof fn === 'function' && fn(...args));
  };
}

export function noop() {}
