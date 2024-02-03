import React from "react";
import { render, fireEvent, cleanup, getByText } from "@testing-library/react";
import {
  ChakraProvider,
  extendTheme as chakraExtendTheme,
} from "@chakra-ui/react";
import { BrowserRouter, } from "react-router-dom";
import LoginForm from "../../../src/components/login/loginForm";

const chakraTheme = chakraExtendTheme();

test("If it renders properly", () => {
  const compo = render(
    <BrowserRouter>
      <ChakraProvider theme={chakraTheme} resetCSS>
        <LoginForm/>
      </ChakraProvider>
    </BrowserRouter>
  );
  expect(compo.queryByText('Username')).toBeTruthy();
  expect(compo.queryByText('Password')).toBeTruthy();
  expect(compo.queryByText('Submit')).toBeTruthy();
});
