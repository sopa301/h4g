import React from "react";
import { render } from "../../test_utils";
import { BrowserRouter } from "react-router-dom";
import Banner from "../../../src/components/main/banner";

test("If it renders properly when logged in", () => {
  const compo = render(
    <BrowserRouter>
      <Banner loggedIn={true} />
    </BrowserRouter>
  );
  expect(compo.queryByText("The Purple Dog Project")).toBeTruthy();
  expect(compo.queryByText("Logout")).toBeTruthy();
});

test("If it renders properly when not logged in", () => {
  const compo = render(
    <BrowserRouter>
      <Banner loggedIn={false} />
    </BrowserRouter>
  );
  expect(compo.queryByText("The Purple Dog Project")).toBeTruthy();
  expect(compo.queryByText("Logout")).toBeFalsy();
});
