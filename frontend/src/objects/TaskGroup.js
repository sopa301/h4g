import { TaskGroupJSONable } from "./TaskGroupJSONable";
import { Task } from "./Task";

export class TaskGroup {
  // taskGroupId is number
  // taskGroupName is string
  // tasks is a Task array
  // pax is a number
  constructor(taskGroupId, taskGroupName, tasks, pax) {
    this.taskGroupId = taskGroupId;
    this.taskGroupName = taskGroupName;
    this.tasks = tasks;
    this.pax = pax;
  }
  toString() {
    let out = "Task Group " + this.name + ":\n";
    for (const task of this.tasks) {
      out += task.toString();
    }
    return out;
  }
  toJSONable() {
    const outTasks = [];
    for (let i = 0; i < this.tasks.length; i++) {
      outTasks[i] = this.tasks[i].toJSONable();
    }
    return new TaskGroupJSONable(
      this.taskGroupId,
      this.taskGroupName,
      outTasks,
      this.pax,
    );
  }
  static fromJSONable(object) {
    const outTasks = [];
    for (let i = 0; i < object.tasks.length; i++) {
      outTasks[i] = Task.fromJSONable(object.tasks[i]);
    }
    return new TaskGroup(object.taskGroupId, object.taskGroupName, outTasks, object.pax);
  }
  static getArrayWorkload(array) {
    let out = 0;
    for (const tg of array) {
      out += tg.getTotalWorkload();
    }
    return out;
  }
  getTotalWorkload() {
    let out = 0;
    for (const task of this.tasks) {
      out += task.getTimeNeeded();
    }
    return out;
  }
}
