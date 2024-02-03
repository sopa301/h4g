import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Heading,
  Box,
  Flex,
  Spacer,
  Container,
} from "@chakra-ui/react";
import "../../App.css";
import { useContext, useState } from "react";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import PasswordChecklist from "react-password-checklist";
import { Link, useNavigate } from "react-router-dom";
import { ToastContext } from "../../ToastContext";

export default function SignUpComponent() {
  const toast = useContext(ToastContext);
  const navigate = useNavigate();
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [validPass, setValidPass] = useState(false);

  function validateUsername(value) {
    let error;
    if (!value) {
      error = "Username is required";
    }
    return error;
  }
  function validateEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let error;
    if (!value) {
      error = "Email is required";
    }
    
    if (!emailRegex.test(value)) {
      error = "Please enter valid email";
    }

    return error;
  }
  function validatePassword(value) {
    let error;
    setP1(value);
    if (!value) {
      error = "Password is required";
    } else if (!validPass) {
      error = "Please set the password to match the requirements.";
    }
    return error;
  }
  function validatePassword2(value) {
    let error;
    setP2(value);
    if (!value) {
      error = "Please confirm your password";
    } else if (p1 !== p2) {
      error = "Passwords do not match";
    } else if (!validPass) {
      error = "Please follow the password requirements";
    }
    return error;
  }
  async function signUpFunction(user, pass, email, telegram) {
    return await axios
      .post(import.meta.env.VITE_API_URL + "/signup", {
        username: user,
        password: pass,
        email: email,
        teleHandle: telegram
      })
      .then(function () {
        toast({
          title: "Signed up successfully!",
          description: "",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        return true;
      })
      .catch(function (error) {
        toast({
          title: "Sign up failed.",
          description: getErrorMessage(error),
          status: "error",
          duration: 1000,
          isClosable: true,
        });
        return false;
      });
  }

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Container px="5px">
      <Box>
        <Heading pb='10px'>Sign Up as a Volunteer</Heading>
        <Formik
          initialValues={{ username: "", password: "", password2: "", email:"", telegram: ""}}
          onSubmit={(values, actions) => {
            signUpFunction(values.username, values.password, values.email, values.telegram).then((result) => {
              actions.setSubmitting(result);
              if (result) {
                navigate("/login");
              }
            });
          }}
        >
          {(propsInner) => (
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
              <Field name="email" validate={validateEmail}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel>Email</FormLabel>
                    <Input {...field} placeholder="email"/>
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="telegram">
                {({ field }) => (
                  <FormControl
                  >
                    <FormLabel>Telegram Handle (Optional)</FormLabel>
                    <Input {...field} placeholder="telegram"/>
                  </FormControl>
                )}
              </Field>
              <Field name="password" validate={validatePassword}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
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
              <Field name="password2" validate={validatePassword2}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password2 && form.touched.password2}
                  >
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup size="md">
                      <Input
                        {...field}
                        placeholder="confirm password"
                        type={show ? "text" : "password"}
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                          {show ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{form.errors.password2}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Container py={4}>
                <PasswordChecklist
                  rules={["minLength", "specialChar", "number", "capital"]}
                  minLength={8}
                  value={p1}
                  valueAgain={p2}
                  onChange={(isValid) => {
                    setValidPass(isValid);
                  }}
                />
              </Container>
              
              <Flex>
                <Button
                  colorScheme="teal"
                  isLoading={propsInner.isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
                <Spacer/>
                <Link to="/login">
                  <Button colorScheme="red">Back</Button>
                </Link>
              </Flex> 
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}

function getErrorMessage(error) {
  if (!error.response) {
    return "Network error.";
  }
  let status = error.response.status;
  if (status === 403) {
    return "Username is taken.";
  }
  return "Unknown error.";
}
