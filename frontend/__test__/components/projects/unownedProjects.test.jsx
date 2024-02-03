import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import UnownedProjects from "../../../src/components/projects/unownedProjects";
import {
  ChakraProvider,
  extendTheme as chakraExtendTheme,
} from "@chakra-ui/react";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

const chakraTheme = chakraExtendTheme();

test("If it renders properly with an array", () => {
  const projs = [
    { projectName: "p1", projectId: 1 },
    { projectName: "p2", projectId: 2 },
  ];
  const compo = render(
    <BrowserRouter>
      <ChakraProvider theme={chakraTheme} resetCSS>
        <UnownedProjects array={projs} />
      </ChakraProvider>
    </BrowserRouter>
  );
  expect(compo.queryByText("p1")).toBeTruthy();
  expect(compo.queryByText("p2")).toBeTruthy();
  expect(compo.queryByTestId("UnownedItem" + 1)).toBeTruthy();
  expect(compo.queryByTestId("UnownedItem" + 2)).toBeTruthy();
});

test("If it renders properly without an array", () => {
  const projs = [];
  const compo = render(
    <BrowserRouter>
      <ChakraProvider theme={chakraTheme} resetCSS>
        <UnownedProjects array={projs} />
      </ChakraProvider>
    </BrowserRouter>
  );
  expect(compo.queryByText("No projects here!")).toBeTruthy();
  expect(compo.queryAllByTestId(/UnownedItem/)).toEqual([]);
});

test("If rerenders an array properly", () => {
  const projs = [{ projectName: "p1", projectId: 1 }];
  const compo = render(
    <BrowserRouter>
      <ChakraProvider theme={chakraTheme} resetCSS>
        <UnownedProjects array={projs} />
      </ChakraProvider>
    </BrowserRouter>
  );
  expect(compo.queryByText("p1")).toBeTruthy();
  expect(compo.queryByText("p2")).toBeFalsy();
  expect(compo.queryByTestId("UnownedItem" + 1)).toBeTruthy();
  expect(compo.queryByTestId("UnownedItem" + 2)).toBeFalsy();
  const projs2 = [{ projectName: "p2", projectId: 2 }];
  compo.rerender(
    <BrowserRouter>
      <ChakraProvider theme={chakraTheme} resetCSS>
        <UnownedProjects array={projs2} />
      </ChakraProvider>
    </BrowserRouter>
  );
  expect(compo.queryByText("p1")).toBeFalsy();
  expect(compo.queryByText("p2")).toBeTruthy();
  expect(compo.queryByTestId("UnownedItem" + 1)).toBeFalsy();
  expect(compo.queryByTestId("UnownedItem" + 2)).toBeTruthy();
});

test("If it directs to a page properly", async () => {
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
          element: <UnownedProjects array={projs} />,
        },
        {
          path: "2",
          element: <div>You've reached 2!</div>,
        },
      ],
    },
  ]);
  const compo = render(
    <ChakraProvider theme={chakraTheme} resetCSS>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
  fireEvent.click(compo.queryAllByText("Open")[1]);
  expect(compo.queryByText("You've reached 2!")).toBeTruthy();
});
