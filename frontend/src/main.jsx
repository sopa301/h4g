import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  ChakraProvider,
  extendTheme as chakraExtendTheme,
} from "@chakra-ui/react";
import {
  ThemeProvider as MaterialThemeProvider,
  createTheme as muiCreateTheme,
  THEME_ID,
} from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/main/error-page";
import Root from "./routes/root";
import Login from "./routes/login";
import LoginComponent from "./components/login/loginComponent";
import SignUpComponent from "./components/login/signUpComponent";
import Projects from "./routes/projects";
import ProjectPage, {
  loader as projLoader,
} from "./components/projects/projectPage";
import Home from "./routes/home";
import Tasks from "./routes/tasks";
import Dashboard from "./routes/dashboard";
import Update from "./routes/update";
import Attendance from "./routes/attendance";
import Settings from "./routes/settings";
import Eventqr from "./routes/eventqr";
import Report from "./routes/report";
import { toast, ToastContainer, ToastContext } from "./ToastContext";
import store from './app/store'
import { Provider } from 'react-redux'

const chakraTheme = chakraExtendTheme();
const materialTheme = muiCreateTheme();
const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root toast={toast} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/tasks",
        element: <Tasks />,
      },
      {
        path: "/dashboard",
        element: <Dashboard toast={toast}/>,
      },
      {
        path: "/update",
        element: <Update toast={toast}/>,
      },
      {
        path: "/attend/:eventId",
        element: <Attendance toast={toast}/>,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/eventqr/:eventId",
        element: <Eventqr />,
      },
      {
        path: "/report/:eventId",
        element: <Report />,
      },
      {
        path: "/projects",
        children: [
          {
            path: "",
            element: <Projects toast={toast} />,
          },
          {
            path: ":projectId",
            element: <ProjectPage toast={toast} />,
            loader: projLoader,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <LoginComponent />,
      },
      {
        path: "signup",
        element: <SignUpComponent />,
      },
    ],
  },
]);

root.render(
  <ChakraProvider theme={chakraTheme} resetCSS>
    {/* <React.StrictMode> */}
    <MaterialThemeProvider theme={{ [THEME_ID]: materialTheme }}>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <ToastContext.Provider value={toast}>
            <RouterProvider router={router} />
          </ToastContext.Provider>
          <ToastContainer />
        </LocalizationProvider>
      </Provider>
    </MaterialThemeProvider>
    {/* </React.StrictMode> */}
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
