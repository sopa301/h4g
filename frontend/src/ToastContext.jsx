import { createStandaloneToast } from "@chakra-ui/react";
import { createContext } from "react";

const { ToastContainer: tc, toast: tst } = createStandaloneToast();
export const ToastContainer = tc;
export const toast = tst;
export const ToastContext = createContext(toast);
