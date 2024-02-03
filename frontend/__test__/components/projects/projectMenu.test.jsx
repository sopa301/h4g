import React from "react";
import { render, fireEvent, cleanup } from "../../test_utils";
import { BrowserRouter } from "react-router-dom";
import ProjectMenu from "../../../src/components/projects/projectMenu";
import { expect } from "vitest";
import userEvent from "@testing-library/user-event";

test("If it renders properly with given settings", () => {
  const settings = {
    title: "titletext",
    initialValues: { name: "TestName" },
    onSubmit: () => {},
    submitButton: "submittext",
  };
  const compo = render(
    <BrowserRouter>
      <ProjectMenu isOpen={true} {...settings} />
    </BrowserRouter>
  );
  expect(compo.queryByText("titletext")).toBeTruthy();
  expect(compo.queryByDisplayValue("TestName")).toBeTruthy();
  expect(compo.queryByText("Project Name")).toBeTruthy();
  expect(compo.queryByText("submittext")).toBeTruthy();
});
test("If it submits the stated values", async () => {
  const user = userEvent.setup();
  const settings = {
    title: "titletext",
    initialValues: { name: "TestName" },
    onSubmit: (values, actions) => {
      expect(values.name).toEqual("TestName");
    },
    submitButton: "submittext",
  };
  const compo = render(
    <BrowserRouter>
      <ProjectMenu isOpen={true} {...settings} />
    </BrowserRouter>
  );
  await user.click(compo.queryByText("submittext"));
});
test("If it submits the typed values", async () => {
  const user = userEvent.setup();
  const settings = {
    title: "titletext",
    initialValues: { name: "Test" },
    onSubmit: (values, actions) => {
      expect(values.name).toEqual("TestName");
    },
    submitButton: "submittext",
  };
  const compo = render(
    <BrowserRouter>
      <ProjectMenu isOpen={true} {...settings} />
    </BrowserRouter>
  );
  await userEvent.type(compo.queryByDisplayValue("Test"), "Name");
  await user.click(compo.queryByText("submittext"));
});
