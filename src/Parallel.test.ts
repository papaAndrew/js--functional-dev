import { Parallel } from "./Parallel";

describe.skip("Parallel bus", () => {
  it("is a class", () => {
    expect(Parallel).toBeInstanceOf(Function);
    expect(new Parallel()).toBeInstanceOf(Parallel);
  });

  it("functionality", async () => {
    const runner = new Parallel(2);

    console.log(
      await runner.jobs(
        () => new Promise((resolve) => setTimeout(resolve, 2, 1)),
        () => new Promise((resolve) => setTimeout(resolve, 3, 2))
      )
    );
    /*     console.log(await runner
    .jobs(
    () => new Promise((resolve) => setTimeout(resolve, 10, 1)),
    () => new Promise((resolve) => setTimeout(resolve, 50, 2)),
    () => new Promise((resolve) => setTimeout(resolve, 20, 3)),
    () => new Promise((resolve) => setTimeout(resolve, 90, 4)),
    () => new Promise((resolve) => setTimeout(resolve, 30, 5)),
    )) // [1, 3, 2, 4, 5];    
 */
  });
});
