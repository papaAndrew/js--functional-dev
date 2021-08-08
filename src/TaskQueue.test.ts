import { PromiseQued, TaskQueue } from "./TaskQueue";

it("TaskQueue is a class", () => {
  expect(TaskQueue).toBeInstanceOf(Function);
  expect(new TaskQueue()).toBeInstanceOf(TaskQueue);
});

it("TaskQueue functionality", async () => {
  const taskList: PromiseQued<number>[] = [
    () => Promise.resolve(2),
    () => Promise.resolve(3),
    () => Promise.resolve(0),
  ];
  const queue = new TaskQueue<number>(taskList);
  expect(queue.isEnded()).toBeFalsy();

  const taskRes = await await Promise.all(taskList).then((tasks) =>
    tasks.map((task) => task())
  );
  const queRes = await await Promise.all([
    queue.next(),
    queue.next(),
    queue.next(),
  ]).then((tasks) => tasks.map((task) => task && task()));

  expect(queRes).toEqual(taskRes);

  expect(queue.isEnded()).toBeTruthy();

  const item = queue.next();
  expect(item).toBeUndefined();
});
