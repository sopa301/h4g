import React, { createContext } from "react";
import { render, fireEvent, cleanup, getByText } from "@testing-library/react";
import {
  ChakraProvider,
  extendTheme as chakraExtendTheme,
  createStandaloneToast,
} from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import LoginComponent from "../../../src/components/login/loginComponent";

const chakraTheme = chakraExtendTheme();
const { ToastContainer, toast } = createStandaloneToast();
const ToastContext = createContext(toast);

test("If it renders properly", () => {
  const compo = render(
    <div>
      <ToastContext.Provider value={toast}>
        <BrowserRouter>
          <ChakraProvider theme={chakraTheme} resetCSS>
            <LoginComponent />
          </ChakraProvider>
        </BrowserRouter>
      </ToastContext.Provider>
      <ToastContainer />
    </div>
  );
  expect(compo.queryByText("Login")).toBeTruthy();
  expect(compo.queryByText("Don't have an account?")).toBeTruthy();
  expect(compo.queryByText("Sign up now!")).toBeTruthy();
});
