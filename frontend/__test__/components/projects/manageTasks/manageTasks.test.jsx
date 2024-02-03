import React from "react";
import { render } from "../../../test_utils";
import { DateTime, Interval } from "luxon";
import { Project } from "../../../../src/objects/Project";
import ManageTasks from "../../../../src/components/projects/manageTasks/manageTasks";
import { Person } from "../../../../src/objects/Person";
import { TaskGroup } from "../../../../src/objects/TaskGroup";
import { Task } from "../../../../src/objects/Task";

test("If it renders properly", () => {
  const compo = render(
    <ManageTasks
      proj={
        new Project(
          1,
          "Project",
          [new Person(1, "Spiderman Lotus", [], "viewer")],
          [
            new TaskGroup(
              1,
              "Ohio",
              [
                new Task(
                  1,
                  Interval.fromDateTimes(DateTime.now(), DateTime.now()),
                  1,
                  false,
                  1,
                  1,
                  1,
                  false
                ),
              ],
              1
            ),
          ]
        )
      }
    />
  );
  expect(compo.queryAllByText("Add Task")).toBeTruthy();
  expect(compo.queryAllByText("Auto-Assign")).toBeTruthy();
  expect(compo.queryByText("Ohio")).toBeTruthy();
});
