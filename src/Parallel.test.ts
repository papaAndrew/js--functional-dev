import { Parallel } from "./Parallel";

describe("Parallel bus", () => {
  it("is a class", () => {
    expect(Parallel).toBeInstanceOf(Function);
    expect(new Parallel()).toBeInstanceOf(Parallel);
  });

  it("functionality", async () => {
    const runner = new Parallel(2);

    await expect(
      await runner.jobs(
        () => new Promise((resolve) => setTimeout(resolve, 10, 1)),
        () => new Promise((resolve) => setTimeout(resolve, 50, 2)),
        () => new Promise((resolve) => setTimeout(resolve, 20, 3)),
        () => new Promise((resolve) => setTimeout(resolve, 90, 4)),
        () => new Promise((resolve) => setTimeout(resolve, 30, 5))
      )
    ).toEqual([1, 3, 2, 5, 4]);
  });
});
