import React, { createContext } from "react";
import { render, fireEvent, cleanup, act } from "@testing-library/react";
import {
  ChakraProvider,
  extendTheme as chakraExtendTheme,
  createStandaloneToast,
} from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProjectPage from "../../../src/components/projects/projectPage";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { vi } from "vitest";
import { ProjectJSONable } from "../../../src/objects/ProjectJSONable";
import { PersonJSONable } from "../../../src/objects/PersonJSONable";

vi.mock("axios", async () => {
  const actual = await vi.importActual("axios");
  return {
    ...actual,
  };
});
const axiosMock = new MockAdapter(axios);
const chakraTheme = chakraExtendTheme();
const { ToastContainer, toast } = createStandaloneToast();
const ToastContext = createContext(toast);

test("If it renders properly with owner privileges", async () => {
  vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
      ...actual,
      useLoaderData: () => ({ projectId: -1 }),
    };
  });
  axiosMock.onPost(import.meta.env.VITE_API_URL + "/project").reply(200, {
    project: new ProjectJSONable(-1, "Project Name", [new PersonJSONable(1, "Patrick", [], "owner")], []),
  });  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProjectPage />,
    },
  ]);
  localStorage.setItem("personId", 1);
  let compo;
  await act(async () => {
    compo = render(
      <div>
        <ToastContext.Provider value={toast}>
          <ChakraProvider theme={chakraTheme} resetCSS>
            <RouterProvider router={router} />
          </ChakraProvider>
        </ToastContext.Provider>
        <ToastContainer />
      </div>
    );
  });
  expect(compo.queryByText("Back")).toBeTruthy();
  expect(compo.queryByText("Summary")).toBeTruthy();
  expect(compo.queryByText("Manage People")).toBeTruthy();
  expect(compo.queryByText("Manage Tasks")).toBeTruthy();
});

test("If it renders properly with editor privileges", async () => {
  vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
      ...actual,
      useLoaderData: () => ({ projectId: -1 }),
    };
  });
  axiosMock.onPost(import.meta.env.VITE_API_URL + "/project").reply(200, {
    project: new ProjectJSONable(-1, "Project Name", [new PersonJSONable(1, "Patrick", [], "editor")], []),
  });  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProjectPage />,
    },
  ]);
  localStorage.setItem("personId", 1);
  let compo;
  await act(async () => {
    compo = render(
      <div>
        <ToastContext.Provider value={toast}>
          <ChakraProvider theme={chakraTheme} resetCSS>
            <RouterProvider router={router} />
          </ChakraProvider>
        </ToastContext.Provider>
        <ToastContainer />
      </div>
    );
  });
  expect(compo.queryByText("Back")).toBeTruthy();
  expect(compo.queryByText("Summary")).toBeTruthy();
  expect(compo.queryByText("Manage People")).toBeFalsy();
  expect(compo.queryByText("Manage Tasks")).toBeTruthy();
});

test("If it renders properly with viewer privileges", async () => {
  vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
      ...actual,
      useLoaderData: () => ({ projectId: -1 }),
    };
  });
  axiosMock.onPost(import.meta.env.VITE_API_URL + "/project").reply(200, {
    project: new ProjectJSONable(-1, "Project Name", [new PersonJSONable(1, "Patrick", [], "viewer")], []),
  });  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProjectPage />,
    },
  ]);
  localStorage.setItem("personId", 1);
  let compo;
  await act(async () => {
    compo = render(
      <div>
        <ToastContext.Provider value={toast}>
          <ChakraProvider theme={chakraTheme} resetCSS>
            <RouterProvider router={router} />
          </ChakraProvider>
        </ToastContext.Provider>
        <ToastContainer />
      </div>
    );
  });
  expect(compo.queryByText("Back")).toBeTruthy();
  expect(compo.queryByText("Summary")).toBeTruthy();
  expect(compo.queryByText("Manage People")).toBeFalsy();
  expect(compo.queryByText("Manage Tasks")).toBeFalsy();
});