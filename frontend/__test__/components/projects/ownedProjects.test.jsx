import React from "react";
import { render } from "../../test_utils";
import OwnedProjects from "../../../src/components/projects/ownedProjects";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

test("If it renders properly with an array", () => {
  const projs = [
    { projectName: "p1", projectId: 1 },
    { projectName: "p2", projectId: 2 },
  ];
  const compo = render(
    <BrowserRouter>
      <OwnedProjects array={projs} />
    </BrowserRouter>
  );
  expect(compo.queryByText("p1")).toBeTruthy();
  expect(compo.queryByText("p2")).toBeTruthy();
  expect(compo.queryByTestId("OwnedItem" + 1)).toBeTruthy();
  expect(compo.queryByTestId("OwnedItem" + 2)).toBeTruthy();
});
test("If it renders properly without an array", () => {
  const projs = [];
  const compo = render(
    <BrowserRouter>
      <OwnedProjects array={projs} />
    </BrowserRouter>
  );
  expect(compo.queryByText("No projects here!")).toBeTruthy();
  expect(compo.queryAllByTestId(/OwnedItem/)).toEqual([]);
});
test("If rerenders an array properly", () => {
  const projs = [{ projectName: "p1", projectId: 1 }];
  const compo = render(
    <BrowserRouter>
      <OwnedProjects array={projs} />
    </BrowserRouter>
  );
  expect(compo.queryByText("p1")).toBeTruthy();
  expect(compo.queryByText("p2")).toBeFalsy();
  expect(compo.queryByTestId("OwnedItem" + 1)).toBeTruthy();
  expect(compo.queryByTestId("OwnedItem" + 2)).toBeFalsy();

  const projs2 = [{ projectName: "p2", projectId: 2 }];
  compo.rerender(
    <BrowserRouter>
      <OwnedProjects array={projs2} />
    </BrowserRouter>
  );
  expect(compo.queryByText("p1")).toBeFalsy();
  expect(compo.queryByText("p2")).toBeTruthy();
  expect(compo.queryByTestId("OwnedItem" + 1)).toBeFalsy();
  expect(compo.queryByTestId("OwnedItem" + 2)).toBeTruthy();
});
test("If it directs to a page properly", async () => {
  const user = userEvent.setup();
  const projs = [
    { projectName: "p1", projectId: 1 },
    { projectName: "p2", projectId: 2 },
  ];
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          path: "",
          element: <OwnedProjects array={projs} />,
        },
        {
          path: "2",
          element: <div>You've reached 2!</div>,
        },
      ],
    },
  ]);
  const compo = render(<RouterProvider router={router} />);
  await user.click(compo.queryAllByText("Open")[1]);
  expect(compo.queryByText("You've reached 2!")).toBeTruthy();
});
test("If it deletes an entry properly when successful", async () => {
  const user = userEvent.setup();
  vi.mock("axios", async () => {
    const actual = await vi.importActual("axios");
    return {
      ...actual,
    };
  });
  const axiosMock = new MockAdapter(axios);
  let requestBody;
  axiosMock
    .onDelete(import.meta.env.VITE_API_URL + "/project")
    .reply(function (config) {
      requestBody = JSON.parse(config.data);
      return [200, {}]; // Return a mock response
    });
  localStorage.setItem("personId", 1);
  let projs = [
    { projectName: "p1", projectId: 1 },
    { projectName: "p2", projectId: 2 },
  ];
  const compo = render(
    <BrowserRouter>
      <OwnedProjects
        array={projs}
        setArray={(fn) => {
          projs = fn(projs);
        }}
      />
    </BrowserRouter>
  );
  expect(compo.queryByText("p2")).toBeTruthy();
  await user.click(compo.queryAllByText("Delete")[1]);
  expect(requestBody).toEqual({
    personId: localStorage.getItem("personId"),
    projectId: 2,
  });
  compo.rerender(
    <BrowserRouter>
      <OwnedProjects array={projs} />
    </BrowserRouter>
  );
  expect(compo.queryByText("p2")).toBeFalsy();
});
test("If it doesn't delete an entry if unsuccessful", async () => {
  const user = userEvent.setup();
  vi.mock("axios", async () => {
    const actual = await vi.importActual("axios");
    return {
      ...actual,
    };
  });
  const axiosMock = new MockAdapter(axios);
  let requestBody;
  axiosMock
    .onDelete(import.meta.env.VITE_API_URL + "/project")
    .reply(function (config) {
      requestBody = JSON.parse(config.data);
      return [401, {}]; // Return a mock response
    });
  localStorage.setItem("personId", 1);
  let projs = [
    { projectName: "p1", projectId: 1 },
    { projectName: "p2", projectId: 2 },
  ];
  const compo = render(
    <BrowserRouter>
      <OwnedProjects
        array={projs}
        setArray={(fn) => {
          projs = fn(projs);
        }}
      />
    </BrowserRouter>
  );
  expect(compo.queryByText("p2")).toBeTruthy();
  await user.click(compo.queryAllByText("Delete")[1]);
  expect(requestBody).toEqual({
    personId: localStorage.getItem("personId"),
    projectId: 2,
  });
  compo.rerender(
    <BrowserRouter>
      <OwnedProjects array={projs} />
    </BrowserRouter>
  );
  expect(compo.queryByText("p2")).toBeTruthy();
});
test("If it edits an entry properly when successful", async () => {
  const user = userEvent.setup();
  vi.mock("axios", async () => {
    const actual = await vi.importActual("axios");
    return {
      ...actual,
    };
  });
  const axiosMock = new MockAdapter(axios);
  let requestBody;
  axiosMock
    .onPatch(import.meta.env.VITE_API_URL + "/project")
    .reply(function (config) {
      requestBody = JSON.parse(config.data);
      return [200, { projectId: 1 }]; // Return a mock response
    });
  localStorage.setItem("personId", 1);
  let projs = [
    { projectName: "p1", projectId: 1 },
    { projectName: "p2", projectId: 2 },
  ];
  const compo = render(
    <BrowserRouter>
      <OwnedProjects
        array={projs}
        setArray={(fn) => {
          projs = fn(projs);
        }}
      />
    </BrowserRouter>
  );
  expect(compo.queryByText("p2")).toBeTruthy();
  await user.click(compo.queryAllByText("Edit")[1]);
  expect(compo.queryByText("Edit Project")).toBeTruthy();
  const projectName = compo.queryByDisplayValue("p2");
  expect(projectName).toBeTruthy();
  await userEvent.type(projectName, "p3");
  expect(projectName).toHaveValue("p2p3");
  await user.click(compo.queryByText("Change name"));
  expect(requestBody).toEqual({ projectId: 2, projectName: "p2p3" });
  compo.rerender(
    <BrowserRouter>
      <OwnedProjects
        array={projs}
        setArray={(fn) => {
          projs = fn(projs);
        }}
      />
    </BrowserRouter>
  );
  expect(compo.queryByText("p2")).toBeFalsy();
  expect(compo.queryByText("p1")).toBeTruthy();
  expect(compo.queryByText("p2p3")).toBeTruthy();
});
test("If it doesn't edit an entry when unsuccessful", async () => {
  const user = userEvent.setup();
  vi.mock("axios", async () => {
    const actual = await vi.importActual("axios");
    return {
      ...actual,
    };
  });
  const axiosMock = new MockAdapter(axios);
  let requestBody;
  axiosMock
    .onPatch(import.meta.env.VITE_API_URL + "/project")
    .reply(function (config) {
      requestBody = JSON.parse(config.data);
      return [401]; // Return a mock response
    });
  localStorage.setItem("personId", 1);
  let projs = [
    { projectName: "p1", projectId: 1 },
    { projectName: "p2", projectId: 2 },
  ];
  const compo = render(
    <BrowserRouter>
      <OwnedProjects
        array={projs}
        setArray={(fn) => {
          projs = fn(projs);
        }}
      />
    </BrowserRouter>
  );
  expect(compo.queryByText("p2")).toBeTruthy();
  await user.click(compo.queryAllByText("Edit")[1]);
  expect(compo.queryByText("Edit Project")).toBeTruthy();
  const projectName = compo.queryByDisplayValue("p2");
  expect(projectName).toBeTruthy();
  await userEvent.type(projectName, "p3");
  expect(projectName).toHaveValue("p2p3");
  await user.click(compo.queryByText("Change name"));
  expect(requestBody).toEqual({ projectId: 2, projectName: "p2p3" });
  compo.rerender(
    <BrowserRouter>
      <OwnedProjects
        array={projs}
        setArray={(fn) => {
          projs = fn(projs);
        }}
      />
    </BrowserRouter>
  );
  expect(compo.queryByText("p2")).toBeTruthy();
  expect(compo.queryByText("p1")).toBeTruthy();
  expect(compo.queryByText("p2p3")).toBeFalsy();
});
