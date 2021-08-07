import { Sequenser, Queue, QueItem } from "./Sequencer";

export type TaskResolvingNumber = QueItem<number>;

export class Parallel {
  private _threadsLimit = 0;

  constructor(threadsLimit: number) {
    this._threadsLimit = threadsLimit;
  }

  public jobs(...tasks: QueItem<number>[]) {
    if (!this._threadsLimit) {
      return;
    }

    return Promise.allSettled(
      new Sequenser(new Queue<number>(tasks), this._threadsLimit).run(
        async (task) => await task()
      )
    );
  }
}
