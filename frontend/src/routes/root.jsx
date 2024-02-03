import { Outlet, useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import Banner from "../components/main/banner";
import { useEffect } from "react";

export default function Root(props) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const personName = localStorage.getItem("personName");
  const personId = localStorage.getItem("personId");
  useEffect(() => {
    validateToken(token, navigate, personId, personName, props.toast);
  }, []);
  return (
    <Box>
      <Banner loggedIn={true} toast={props.toast} />
      <Outlet context={[personName]} />
    </Box>
  );
}

function validateToken(token, navFn, personId, personName, toastFn) {
  if (token && personName && personId) {
    return axios
      .post(import.meta.env.VITE_API_URL + "/validate", {
        personId: personId,
        token: token,
      })
      .catch(function (error) {
        toastFn({
          title: "Please log in again.",
          description: getErrorMessage(error),
          status: "error",
          duration: 1000,
          isClosable: true,
        });
        navFn("/login");
      });
  } else {
    if (!(!token && !personName && !personId)) {
      toastFn({
        title: "Please log in again.",
        description: "Missing credentials.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
    navFn("/login");
  }
}

function getErrorMessage(error) {
  if (!error.response) {
    return "Network error.";
  }
  let status = error.response.status;
  if (status === 401) {
    return "Invalid token.";
  }
  if (status === 404) {
    return "User ID not found.";
  }
  return "Unknown error.";
}
