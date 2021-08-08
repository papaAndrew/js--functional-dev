export type PromiseQued<T> = () => Promise<T>;

export class TaskQueue<T> {
  private _queue: PromiseQued<T>[] = [];

  constructor(taskList: PromiseQued<T>[] = []) {
    this.push(taskList);
  }

  public push(list: PromiseQued<T>[]): void {
    this._queue = this._queue.concat(list);
  }

  public next(): PromiseQued<T> | undefined {
    return this._queue.shift();
  }

  public isEnded(): boolean {
    return this._queue.length === 0;
  }

  public getLength(): number {
    return this._queue.length;
  }
}
