import React from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { Container, Input, Textarea } from '@chakra-ui/react';
import { Field, Form, Formik } from "formik";
import { DateTimeField } from "@mui/x-date-pickers";
import { Interval } from "luxon";

function UpdateForm() {
  async function updateEvent() {

  }

  function validateEventName(value) {
    let error;
    if (!value) {
      error = "Event name cannot be empty!";
    }
    return error;
  }

  function validateEventDesc(value) {
    let error;
    if (!value) {
      error = "Event desc cannot be empty!";
    }
    return error;
  }


  return (
    <Container>
      <Formik
        initialValues={{ eventName: "", eventDesc: "", eventImg: "", eventDate:""}}
        onSubmit={updateEvent}
      >
        {(formik) => (
          <Form>
            <Field name="eventName" validate={validateEventName}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.eventName && form.touched.eventName}
                  >
                    <FormLabel>Event Name</FormLabel>
                    <Input {...field} placeholder="Event Name"/>
                    <FormErrorMessage>{form.errors.eventName}</FormErrorMessage>
                  </FormControl>
                )}
            </Field>
            <Field name="eventDesc" validate={validateEventDesc}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.eventDesc && form.touched.eventDesc}
                  >
                    <FormLabel>Event Desc</FormLabel>
                    <Textarea {...field} resize="vertical" placeholder="Event Desc">
                    </Textarea>
                    <FormErrorMessage>{form.errors.eventDesc}</FormErrorMessage>
                  </FormControl>
                )}
            </Field>
            <Field name="eventImg">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.eventImg && form.touched.eventImg}
                  >
                    <FormLabel>Image URL</FormLabel>
                    <Input {...field} placeholder="Image URL"/>
                  </FormControl>
                )}
            </Field>
            {/* <Field name="eventDate">
              {({ field, form }) => (
                <FormControl isInvalid={formik.errors.interval}>
                  <FormLabel>Event Date</FormLabel>
                  <DateTimeField
                    format="dd/MM/yyyy hh:mm a"
                    onChange={(val) => {
                      formik.setFieldValue("eventDate", val, true);
                    }}
                    value={formik.values.eventDate}
                    label="Event Date Time"
                  />
                  <FormErrorMessage>
                    {formik.errors.interval}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field> */}
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={formik.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default UpdateForm