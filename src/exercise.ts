export type CalcFunction = (...args: number[]) => number;
export type CurriedFunction = (...args: number[]) => CurriedFunction | number;

export function withSumma(func: CalcFunction): CurriedFunction {
  return function curried(this: CurriedFunction | number, ...args: number[]) {
    if (args.length < func.length) {
      return (...args2: number[]) => curried.apply(this, args.concat(args2));
    } else {
      return func.apply(this, args);
    }
  };
}

export function infiniteCurry(fn: CalcFunction): CurriedFunction {
  const next = (...args: number[]) => {
    return (x?: number) => {
      if (!x) {
        return args.reduce(
          (acc: number, a: number) => fn.call(fn, acc, a) as number,
          0
        );
      }
      return next(...args, x);
    };
  };
  return next();
}

export function sumMatter(a = 0) {
  let sum = a;
  const func = (b = 0) => {
    sum += b;
    return func;
  };

  func.toString = () => sum; // Переопределяем метод toString
  func.valueOf = () => sum; // Перезаписываем valueOf

  return func;
}
