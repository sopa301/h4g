import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

import "../../App.css";
import { useState } from "react";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm(props) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();

  function validateUsername(value) {
    let error;
    if (!value) {
      error = "Username is required";
    }
    return error;
  }
  function validatePassword(value) {
    let error;
    if (!value) {
      error = "Password is required";
    }
    return error;
  }

  async function handleLogin(values, actions) {
    await axios
      .post(import.meta.env.VITE_API_URL + "/login", {
        username: values.username,
        password: values.password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("personName", values.username);
        localStorage.setItem("personId", response.data.userId);
        navigate("/dashboard");
      })
      .catch(function (error) {
        actions.setSubmitting(false);
        props.toast({
          title: "Login Failed.",
          description: getErrorMessage(error),
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      });
  }

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={handleLogin}
    >
      {(props) => (
        <Form>
          <Field name="username" validate={validateUsername}>
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.username && form.touched.username}
              >
                <FormLabel>Username</FormLabel>
                <Input {...field} placeholder="username"/>
                <FormErrorMessage>{form.errors.username}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="password" validate={validatePassword}>
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.password && form.touched.password}
                pt='10px'
              >
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    {...field}
                    placeholder="password"
                    type={show ? "text" : "password"}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}

function getErrorMessage(error) {
  if (!error.response) {
    return "Network error.";
  }
  let status = error.response.status;
  if (status === 403) {
    return "Incorrect password.";
  }
  if (status === 404) {
    return "Username not found.";
  }
  return "Unknown error."
}