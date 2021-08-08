import { Sequencer } from "./Sequencer";
import { PromiseQued, TaskQueue } from "./TaskQueue";

//export type TaskResolvingNumber = PromiseQued<number>;

export class Parallel<T> {
  private _threadsLimit: number;

  constructor(threadsLimit = 1) {
    this._threadsLimit = threadsLimit;
  }

  private async _queItemHandler(item: PromiseQued<T>) {
    return await item();
  }

  public jobs(...tasks: PromiseQued<T>[]): Promise<T[]> {
    return new Sequencer<T>(new TaskQueue(tasks), this._threadsLimit).run(
      this._queItemHandler
    );
  }
}
