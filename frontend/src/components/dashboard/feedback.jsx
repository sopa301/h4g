import React from 'react'
import { Field, Form, Formik } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Box, 
  Text,
  Heading, 
  Textarea
} from "@chakra-ui/react";

function Feedback() {

  function validateFeedback(value) {
    let error;
    if (!value) {
      error = "Feedback cannot be empty!";
    }

    return error;
  }

  function sendFeedback() {
  
  }

  return (
    <>
    
    <Formik
        initialValues={{ feedback:"" }}
        onSubmit={(values, actions) => sendFeedback(values.feedback)}
      >
        <Field name="feedback" validate={validateFeedback}>
          {({ field, form }) => (
            <FormControl
              isInvalid={form.errors.feedback && form.touched.feedback}
              pb='10px'
            >
              <Textarea {...field} resize="vertical" placeholder="feedback">
              </Textarea>
              <FormErrorMessage>{form.errors.feedback}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
      </Formik>
    </>
  )
}

export default Feedback