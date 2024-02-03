import React from "react";
import { render } from "../../../test_utils";
import { BrowserRouter } from "react-router-dom";
import { DateTime } from "luxon";
import { Project } from "../../../../src/objects/Project";
import TaskMenu from "../../../../src/components/projects/manageTasks/taskMenu";

test("If it renders properly", () => {
  const startTime = new DateTime(1000, 1, 1);
  const endTime = new DateTime(2020, 2, 2);
  const compo = render(
    <BrowserRouter>
      <TaskMenu
        isOpen={true}
        title="title"
        proj={new Project(1, "Project", [], [])}
        initialValues={{
          name: "name1",
          pax: 3,
          priority: 2,
          start: startTime,
          end: endTime,
          assignees: [null, null, null],
          completed: false,
        }}
        onSubmit={() => {}}
      />
    </BrowserRouter>
  );
  expect(compo.queryAllByText("title")).toHaveLength(2);
  expect(compo.queryByText("Task Name")).toBeTruthy();
  expect(compo.queryByText("Pax")).toBeTruthy();
  expect(compo.queryByText("Priority")).toBeTruthy();
  expect(compo.queryByText("Low")).toBeTruthy();
  expect(compo.queryByText("Medium")).toBeTruthy();
  expect(compo.queryByText("High")).toBeTruthy();
  expect(compo.queryByText("Interval")).toBeTruthy();
  expect(compo.queryByText("Completed")).toBeTruthy();

  expect(compo.queryByDisplayValue("name1")).toBeTruthy();
  expect(compo.queryByDisplayValue(3)).toBeTruthy();
  expect(
    compo.queryAllByDisplayValue(
      startTime.setLocale("en-gb").toLocaleString() +
        " " +
        startTime.toLocaleString(DateTime.TIME_SIMPLE)
    )
  ).toBeTruthy();
  expect(
    compo.queryAllByDisplayValue(
      endTime.setLocale("en-gb").toLocaleString() +
        " " +
        endTime.toLocaleString(DateTime.TIME_SIMPLE)
    )
  ).toBeTruthy();
});
