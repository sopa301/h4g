import { TaskGroup } from "./TaskGroup";
import { Person } from "./Person";
import { ProjectJSONable } from "./ProjectJSONable";


export class Project {
  // projectId is a number
  // projectName is a string
  // people is an array of Person objects
  // taskGroups is an array of TaskGroup objects
  constructor(projectId, projectName, people, taskGroups) {
    this.projectId = projectId;
    this.projectName = projectName;
    this.people = people;
    this.taskGroups = taskGroups;
  }
  toString() {
    return (
      "Project " +
      this.projectName +
      "\nPeople: " +
      this.people +
      "\n Tasks: " +
      this.taskGroups +
      "\n"
    );
  }

  toJSONable() {
    const peopleCopy = [];
    const taskCopy = [];
    for (let i = 0; i < this.people.length; i++) {
      peopleCopy[i] = this.people[i].toJSONable();
    }
    for (let i = 0; i < this.taskGroups.length; i++) {
      taskCopy[i] = this.taskGroups[i].toJSONable();
    }
    return new ProjectJSONable(
      this.projectId,
      this.projectName,
      peopleCopy,
      taskCopy
    );
  }
  static fromJSONable(proj) {
    const peopleCopy = [];
    const taskCopy = [];
    for (let i = 0; i < proj.people.length; i++) {
      peopleCopy[i] = Person.fromJSONable(proj.people[i]);
    }
    for (let i = 0; i < proj.taskGroups.length; i++) {
      taskCopy[i] = TaskGroup.fromJSONable(proj.taskGroups[i]);
    }
    return new Project(proj.projectId, proj.projectName, peopleCopy, taskCopy);
  }
}
