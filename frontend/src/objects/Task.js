import { DateTime, Interval } from "luxon";
import { TaskJSONable } from "./TaskJSONable";

export class Task {
  // taskId is a number
  // interval is a Luxon Interval
  // personId is a number
  // isCompleted is a boolean
  // projectId is a number
  // taskPriority is a number
  // taskGroupId is a number
  // isAssigned is a boolean
  constructor(
    taskId,
    interval,
    personId,
    isCompleted,
    projectId,
    taskPriority,
    taskGroupId,
    isAssigned
  ) {
    this.taskId = taskId;
    this.interval = interval;
    this.personId = personId;
    this.isCompleted = isCompleted;
    this.projectId = projectId;
    this.taskPriority = taskPriority;
    this.taskGroupId = taskGroupId;
    this.isAssigned = isAssigned;
  }
  getInterval() {
    return this.interval.toLocaleString(DateTime.DATETIME_MED);
  }
  getTimeNeeded() {
    return Math.round(this.interval.toDuration("minutes").toObject().minutes);
  }
  toString() {
    var out = "Task: " + "\n";
    out += "Interval: " + this.getInterval() + "\n";
    out += "Time needed: " + this.getTimeNeeded() + "\n";
    return out;
  }
  toJSONable() {
    const outInterval = this.interval.toISO({ suppressSeconds: true });
    return new TaskJSONable(
      this.taskId,
      outInterval,
      this.personId,
      this.isCompleted,
      this.projectId,
      this.taskPriority,
      this.taskGroupId,
      this.isAssigned
    );
  }
  static fromJSONable(object) {
    const outInterval = Interval.fromISO(object.interval);
    return new Task(
      object.taskId,
      outInterval,
      object.personId,
      object.isCompleted,
      object.projectId,
      object.taskPriority,
      object.taskGroupId,
      object.isAssigned
    );
  }
}
