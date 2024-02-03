import {render} from '@testing-library/react';
import React, { createContext } from "react";
import {
  ChakraProvider,
  extendTheme as chakraExtendTheme,
  createStandaloneToast,
} from "@chakra-ui/react";
import {
  ThemeProvider as MaterialThemeProvider,
  createTheme as muiCreateTheme,
  THEME_ID,
} from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

const chakraTheme = chakraExtendTheme();
const materialTheme = muiCreateTheme();
const { ToastContainer, toast } = createStandaloneToast();
const ToastContext = createContext(toast);

const AllTheProviders = ({children}) => {
  return (
    <ChakraProvider theme={chakraTheme} resetCSS>
    {/* <React.StrictMode> */}
    <MaterialThemeProvider theme={{ [THEME_ID]: materialTheme }}>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <ToastContext.Provider value={toast}>
          {children}
        </ToastContext.Provider>
        <ToastContainer />
      </LocalizationProvider>
    </MaterialThemeProvider>
    {/* </React.StrictMode> */}
  </ChakraProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, {wrapper: AllTheProviders, ...options})

const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}
export {flushPromises}