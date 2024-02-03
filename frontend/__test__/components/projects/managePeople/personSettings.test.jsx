import React from "react";
import { render } from "../../../test_utils";
import { Accordion } from "@chakra-ui/react";
import { Person } from "../../../../src/objects/Person";
import PersonSettings from "../../../../src/components/projects/managePeople/personSettings";
import { Project } from "../../../../src/objects/Project";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

test("If it renders properly for owner", () => {
  const person = new Person(1, "Klingon", [], "owner");
  const compo = render(
    <Accordion>
      <PersonSettings
        person={person}
        proj={new Project(1, "Yoyo", [person], [])}
      />
    </Accordion>
  );
  expect(compo.queryByText("Klingon")).toBeTruthy();
  expect(compo.queryByText("Remove from project")).toBeFalsy();
  expect(compo.queryByText("Editor")).toBeFalsy();
  expect(compo.queryByText("Viewer")).toBeFalsy();
});

test("If it renders properly for non-owner", () => {
  const person = new Person(1, "Klingon", [], "viewer");
  const compo = render(
    <Accordion>
      <PersonSettings
        person={person}
        proj={new Project(1, "Yoyo", [person], [])}
      />
    </Accordion>
  );
  expect(compo.queryByText("Klingon")).toBeTruthy();
  expect(compo.queryByText("Remove from project")).toBeTruthy();
  expect(compo.queryByText("Editor")).toBeTruthy();
  expect(compo.queryByText("Viewer")).toBeTruthy();
});
test("If it edits a person when successful", async () => {
  const user = userEvent.setup();
  const person1 = new Person(1, "Klingon", [], "viewer");
  let people = [person1];
  const compo = render(
    <Accordion>
      <PersonSettings
        person={person1}
        proj={new Project(1, "Yoyo", [person1], [])}
        update={(xd) => {
          people = xd;
        }}
        index={0}
      />
    </Accordion>
  );
  expect(compo.queryAllByText("Viewer")[0]).toHaveAttribute("data-checked");
  expect(compo.queryAllByText("Editor")[0]).not.toHaveAttribute("data-checked");
  vi.mock("axios", async () => {
    const actual = await vi.importActual("axios");
    return {
      ...actual,
    };
  });
  const axiosMock = new MockAdapter(axios);
  let requestBody;
  axiosMock
    .onPatch(import.meta.env.VITE_API_URL + "/person")
    .reply(function (config) {
      requestBody = JSON.parse(config.data);
      return [201]; // Return a mock response
    });
  await user.click(compo.queryAllByLabelText("Editor")[0]);
  expect(requestBody).toEqual({
    projectId: 1,
    personId: 1,
    role: "editor",
  });
  expect(compo.queryAllByText("Viewer")[0]).not.toHaveAttribute("data-checked");
  expect(compo.queryAllByText("Editor")[0]).toHaveAttribute("data-checked");
});
test("If it doesn't edit a person when unsuccessful", async () => {
  const user = userEvent.setup();
  const person1 = new Person(1, "Klingon", [], "viewer");
  let people = [person1];
  const compo = render(
    <Accordion>
      <PersonSettings
        person={person1}
        proj={new Project(1, "Yoyo", [person1], [])}
        update={(xd) => {
          people = xd;
        }}
        index={0}
      />
    </Accordion>
  );
  expect(compo.queryAllByText("Viewer")[0]).toHaveAttribute("data-checked");
  expect(compo.queryAllByText("Editor")[0]).not.toHaveAttribute("data-checked");
  vi.mock("axios", async () => {
    const actual = await vi.importActual("axios");
    return {
      ...actual,
    };
  });
  const axiosMock = new MockAdapter(axios);
  let requestBody;
  axiosMock
    .onPatch(import.meta.env.VITE_API_URL + "/person")
    .reply(function (config) {
      requestBody = JSON.parse(config.data);
      return [403]; // Return a mock response
    });
  await user.click(compo.queryAllByLabelText("Editor")[0]);
  expect(requestBody).toEqual({
    projectId: 1,
    personId: 1,
    role: "editor",
  });
  expect(compo.queryAllByText("Viewer")[0]).toHaveAttribute("data-checked");
  expect(compo.queryAllByText("Editor")[0]).not.toHaveAttribute("data-checked");
});
test("If it deletes a person when successful", async () => {
  const user = userEvent.setup();
  const person1 = new Person(1, "Klingon", [], "viewer");
  let people = [person1];
  const compo = render(
    <Accordion>
      <PersonSettings
        person={person1}
        proj={new Project(1, "Yoyo", [person1], [])}
        update={(xd) => {
          people = xd;
        }}
        index={0}
      />
    </Accordion>
  );
  expect(compo.queryByText("Klingon")).toBeTruthy();
  vi.mock("axios", async () => {
    const actual = await vi.importActual("axios");
    return {
      ...actual,
    };
  });
  const axiosMock = new MockAdapter(axios);
  let requestBody;
  axiosMock
    .onDelete(import.meta.env.VITE_API_URL + "/person")
    .reply(function (config) {
      requestBody = JSON.parse(config.data);
      return [201]; // Return a mock response
    });
  await user.click(compo.queryByText("Remove from project"));
  expect(requestBody).toEqual({
    projectId: 1,
    personId: 1,
  });
});
test("If it doesn't delete a person when unsuccessful", async () => {
  const user = userEvent.setup();
  const person1 = new Person(1, "Klingon", [], "viewer");
  let people = [person1];
  const compo = render(
    <Accordion>
      <PersonSettings
        person={person1}
        proj={new Project(1, "Yoyo", [person1], [])}
        update={(xd) => {
          people = xd;
        }}
        index={0}
      />
    </Accordion>
  );
  expect(compo.queryByText("Klingon")).toBeTruthy();
  vi.mock("axios", async () => {
    const actual = await vi.importActual("axios");
    return {
      ...actual,
    };
  });
  const axiosMock = new MockAdapter(axios);
  let requestBody;
  axiosMock
    .onDelete(import.meta.env.VITE_API_URL + "/person")
    .reply(function (config) {
      requestBody = JSON.parse(config.data);
      return [403]; // Return a mock response
    });
  await user.click(compo.queryByText("Remove from project"));
  expect(requestBody).toEqual({
    projectId: 1,
    personId: 1,
  });
  expect(compo.queryAllByText("Unable to remove Klingon")[0]).toBeTruthy();
});