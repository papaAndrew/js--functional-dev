import {
  withSumma,
  sumMatter,
  infiniteCurry,
  CalcFunction,
  CurriedFunction,
} from "./exercise";

describe("Functional development", () => {
  it("curry Summa function", () => {
    const curriedSumma = withSumma(
      (a: number, b: number, c: number, d: number, e: number) =>
        a + b + c + d + e
    ) as any;

    expect(curriedSumma(1, 2, 3, 4, 5)).toBe(15);
    expect(curriedSumma(2, 3, 4)(5, 6)).toBe(20);
    expect(curriedSumma(3, 4)(5, 6)(7)).toBe(25);
    expect(curriedSumma(4, 5)(6)(7, 8)).toBe(30);
    expect(curriedSumma(5)(6)(7)(8)(9)).toBe(35);
  });

  it("function infiniteCurry()", () => {
    const infSumma = infiniteCurry((a, b) => a + b) as any;

    expect(infSumma()).toBe(0);
    expect(infSumma(1)()).toBe(1);
    expect(infSumma(1)(2)()).toBe(3);
    expect(infSumma(3)(4)(5)()).toBe(12);

    const infSumma3 = infSumma(3);

    expect(infSumma3(5)()).toBe(8);
    expect(infSumma3(6)()).toBe(9);
  });

  it("function sumMatter()", () => {
    expect(sumMatter().toString()).toBe(0);
    expect(sumMatter(1).toString()).toBe(1);
    expect(sumMatter(1)(2).toString()).toBe(3);
    expect(sumMatter(3)(4)(5).toString()).toBe(12);

    const s3 = sumMatter(3);

    expect(s3(5).toString()).toBe(8);
    expect(s3(6).toString()).toBe(9);
  });
});
