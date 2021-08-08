import { Deferred } from "ts-deferred";
import { TaskQueue, PromiseQued } from "./TaskQueue";

export type QueItemHandler<T> = (queItem: PromiseQued<T>) => Promise<T>;

export class Sequencer<T> {
  private _threadsLimit: number;

  private _queue: TaskQueue<T>;

  private _waitingFor = 0;

  private _queItemHandler: QueItemHandler<T> | null = null;

  private _deferred: Deferred<T[]> | null = null;

  private _result: T[] = [];

  constructor(queue: TaskQueue<T>, threadsLimit: number) {
    this._queue = queue;
    this._threadsLimit = threadsLimit;
  }

  private _onQueItemFinish = (result: T) => {
    this._result.push(result);
    this._waitingFor -= 1;

    if (this._waitingFor <= 0 && this._deferred) {
      this._deferred.resolve(this._result);
    }
    //console.log("length", this._queue.getLength());

    const item = this._queue.next();
    if (this._queItemHandler && item) {
      this._queItemHandler(item).then(this._onQueItemFinish);
    }
  };

  public run(queItemHandler: QueItemHandler<T>): Promise<T[]> {
    const queue = this._queue;
    if (queue.isEnded()) {
      return Promise.resolve([]);
    }

    this._deferred = new Deferred();
    this._queItemHandler = queItemHandler;

    const threadsLimit = this._threadsLimit;
    let threadsLeft = threadsLimit;
    this._waitingFor = queue.getLength();

    while (threadsLeft > 0 && !queue.isEnded()) {
      const currentItem = queue.next();
      if (currentItem) {
        this._queItemHandler(currentItem).then(this._onQueItemFinish);
      }
      threadsLeft -= 1;
    }

    return this._deferred.promise;
  }
}
