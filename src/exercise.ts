export type CalcFunction = (...args: number[]) => number;
export type CurriedFunction = (...args: number[]) => CurriedFunction;
export type CombinedFunction = (...args: number[]) => CombinedFunction | number;

export function withSumma(func: CalcFunction): CombinedFunction {
  return function curried(this: CurriedFunction, ...args: number[]) {
    if (args.length < func.length) {
      return (...args2: number[]) => curried.apply(this, args.concat(args2));
    } else {
      return func.apply(this, args);
    }
  };
}

export function infiniteCurry(fn: CalcFunction): CombinedFunction {
  const next = (...args: number[]) => {
    return (x?: number) => {
      if (x) {
        return next(...args, x);
      }
      return args.reduce(
        (acc: number, a: number) => fn.call(fn, acc, a) as number,
        0
      );
    };
  };
  return next();
}

function infiniteCurrySum(fn: CalcFunction): CombinedFunction {
  const next = function (args: number[] = []): CombinedFunction {
    const func = function (...args2: number[]): CombinedFunction {
      if (args2.length === 0) {
        return () => 0;
      }
      return next(args.concat(args2));
    };

    func.valueOf = () => args.reduce((acc, a) => fn.call(fn, acc, a), 0);
    func.toString = () => `${func.valueOf()}`;

    return func;
  };
  return next();
}

export function sumMatter(a = 0): CurriedFunction {
  const calcFunction: CalcFunction = (a: number, b: number) => a + b;

  const currySum = infiniteCurrySum(calcFunction) as CurriedFunction;
  return currySum(a);
}
