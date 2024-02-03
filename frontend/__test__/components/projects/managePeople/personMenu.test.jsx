import React from "react";
import { render } from "../../../test_utils";
import PersonMenu from "../../../../src/components/projects/managePeople/personMenu";
import userEvent from "@testing-library/user-event";

test("If it renders properly", () => {
  const settings = {
    title: "MENUU",
    initialValues: { username: "kappa", role: "viewer" },
    onSubmit: () => {},
  };
  const compo = render(<PersonMenu isOpen={true} {...settings} />);
  expect(compo.queryAllByText("MENUU")).toHaveLength(2);
  expect(compo.queryByText("Username")).toBeTruthy();
  expect(compo.queryByText("Role")).toBeTruthy();
  expect(compo.queryByText("Editor")).toBeTruthy();
  expect(compo.queryByText("Viewer")).toBeTruthy();

  expect(compo.queryByDisplayValue("kappa")).toBeTruthy();
});
test("Loading icon appears on submit", async () => {
  const user = userEvent.setup();
  const settings = {
    title: "MENUU",
    initialValues: { username: "kappa", role: "viewer" },
    onSubmit: (values, actions) => {
      expect(compo.queryByText("Loading...")).toBeTruthy();
    },
  };
  const compo = render(<PersonMenu isOpen={true} {...settings} />);
  await user.click(compo.queryAllByText("MENUU")[1]);
});
test("If it submits state values correctly", async () => {
  const user = userEvent.setup();
  const settings = {
    title: "MENUU",
    initialValues: { username: "kappa", role: "viewer" },
    onSubmit: (values, actions) => {
      expect(values.username).toEqual("kappa");
      expect(values.role).toEqual("viewer");
    },
  };
  const compo = render(<PersonMenu isOpen={true} {...settings} />);
  await user.click(compo.queryAllByText("MENUU")[1]);
});
test("If it submits typed values correctly", async () => {
  const user = userEvent.setup();
  const settings = {
    title: "MENUU",
    initialValues: { username: "", role: "editor" },
    onSubmit: (values, actions) => {
      expect(values.username).toEqual("kappa");
      expect(values.role).toEqual("viewer");
    },
  };
  const compo = render(<PersonMenu isOpen={true} {...settings} />);
  await userEvent.type(compo.queryAllByDisplayValue("")[0], "kappa");
  await user.click(compo.queryAllByLabelText("Viewer")[0]);
  await user.click(compo.queryAllByText("MENUU")[1]);
});
