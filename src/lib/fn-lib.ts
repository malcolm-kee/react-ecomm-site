type Callback<Args extends any[]> = (...args: Args) => void;

export function noop() {}

export function throttle<Args extends any[]>(
  func: Callback<Args>,
  wait = 100,
  context: any = null
) {
  let timer: null | number = null;
  return function throttledFunction(...args: Args) {
    if (timer === null) {
      timer = window.setTimeout(() => {
        func.apply(context, args);
        timer = null;
      }, wait);
    }
  };
}

export function callAll<Args extends any[]>(
  ...fns: Array<Callback<Args> | undefined>
) {
  return function callAllFns(...args: Args) {
    fns.forEach((fn) => typeof fn === 'function' && fn(...args));
  };
}
