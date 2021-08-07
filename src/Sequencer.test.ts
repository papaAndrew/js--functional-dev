import { PromiseQued, TaskQueue } from "./TaskQueue";
import { Sequencer } from "./Sequencer";

const sleep = (x: number) => new Promise((res) => setTimeout(res, x));

describe("Sequencer", () => {
  it("Sequencer is a class", () => {
    expect(Sequencer).toBeInstanceOf(Function);
    expect(new Sequencer(new TaskQueue(), 0)).toBeInstanceOf(Sequencer);
  });

  describe("Sequencer functionality", () => {
    const fn = jest.fn();

    it("runs async tasks specified by list", async () => {
      const taskList: PromiseQued<void>[] = [
        () => Promise.resolve(fn()),
        () => Promise.resolve(fn()),
        () => Promise.resolve(fn()),
      ];

      const sequencer = new Sequencer(new TaskQueue(taskList), 2);

      await sequencer.run(async (job) => await job());

      expect(fn).toBeCalledTimes(taskList.length);
    });

    it("resolves task result", async () => {
      const resList: number[] = [Math.random(), Math.random(), Math.random()];

      const taskList: PromiseQued<number>[] = resList.map(
        (res: number) => () => Promise.resolve(res)
      );

      const sequencer = new Sequencer(new TaskQueue(taskList), 2);

      await sequencer
        .run(async (job) => await job())
        .then((res) => expect(res).toEqual(resList));
    });

    it("only specified number of parallel task executed", async () => {
      const taskList: PromiseQued<void>[] = [
        () => Promise.resolve(fn()),
        () => Promise.resolve(fn()),
        () => Promise.resolve(fn()),
      ];

      new Sequencer(new TaskQueue(taskList), 1).run(async (job) => await job());
      expect(fn).toBeCalledTimes(1);
      /*
      await new Sequencer(new TaskQueue(taskList), 2).run(async (job) => await job());
      expect(fn).toBeCalledTimes(2);

      await new Sequencer(new TaskQueue(taskList), 3).run(async (job) => await job());
      expect(fn).toBeCalledTimes(3);
      */
    });
  });
});
