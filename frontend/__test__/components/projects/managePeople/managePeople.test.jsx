import React from "react";
import { render } from "../../../test_utils";
import ManagePeople from "../../../../src/components/projects/managePeople/managePeople";
import { Project } from "../../../../src/objects/Project";
import { Person } from "../../../../src/objects/Person";

test("If it renders properly", () => {
  const proj = new Project(
    1,
    "Alz",
    [
      new Person(1, "Geronimo", [], "viewer"),
      new Person(2, "Stilton", [], "editor"),
    ],
    []
  );
  const compo = render(<ManagePeople proj={proj} />);

  expect(compo.queryByText("Add Person")).toBeTruthy();
  expect(compo.queryByText("Geronimo")).toBeTruthy();
  expect(compo.queryByText("Stilton")).toBeTruthy();
});
