import React, { createContext } from "react";
import { render, fireEvent, cleanup, getByText } from "@testing-library/react";
import {
  ChakraProvider,
  extendTheme as chakraExtendTheme,
  createStandaloneToast,
} from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import SignUpComponent from "../../../src/components/login/signUpComponent";

const chakraTheme = chakraExtendTheme();
const { ToastContainer, toast } = createStandaloneToast();
const ToastContext = createContext(toast);

test("If it renders properly", () => {
  const compo = render(
    <div>
      <ToastContext.Provider value={toast}>
        <BrowserRouter>
          <ChakraProvider theme={chakraTheme} resetCSS>
            <SignUpComponent />
          </ChakraProvider>
        </BrowserRouter>
      </ToastContext.Provider>
      <ToastContainer />
    </div>
  );
  expect(compo.queryByText("Sign Up")).toBeTruthy();
  expect(compo.queryByText("Username")).toBeTruthy();
  expect(compo.queryByText("Password")).toBeTruthy();
  expect(compo.queryByText("Confirm Password")).toBeTruthy();
  expect(compo.queryByText("Submit")).toBeTruthy();
  expect(compo.queryByText("Back")).toBeTruthy();
});
