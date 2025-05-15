export const noop = (): any => {};

export const deferred = <T>() => {
  let resolve: (value: T | PromiseLike<T>) => void = noop;
  let reject: (reason?: any) => void = noop;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return {
    promise,
    resolve,
    reject,
  };
};

export const randomStr = () => Math.random().toString(36).split(".")[1];

export const compose =
  <T>(...funcs: ((args: T) => T)[]) =>
  (arg: T) =>
    funcs.reduceRight((acc, fn) => fn(acc), arg);
