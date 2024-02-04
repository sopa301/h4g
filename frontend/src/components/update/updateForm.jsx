import React from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Box
} from "@chakra-ui/react";
import { Container, Input, Textarea } from '@chakra-ui/react';
import { Field, Form, Formik } from "formik";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DateTime } from "luxon"
import axios from 'axios';

function UpdateForm() {
  async function updateEvent(eventName, eventDesc, eventImg, eventDate) {
    return await axios
    .put(import.meta.env.VITE_API_URL + "/event", {
      userId: localStorage.getItem("personId"),
      eventName: eventName,
      eventDate: eventDate, 
      eventDesc: eventDesc,
      eventImg: eventImg
    }).catch(error => console.log(error))
  }

  console.log(localStorage.getItem("personId"))
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
        initialValues={{ eventName: "", eventDesc: "", eventImg: "", eventDate: DateTime.local()}}
        onSubmit={(values, actions) => updateEvent(values.eventName, values.eventDesc, values.eventImg, values.eventDate)}
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
            <Field name="eventDate">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.eventDate && form.touched.eventDate}
                  >
                  <FormLabel>Event Date</FormLabel>
                  <DateTimePicker 
                    value={formik.values.eventDate} 
                    onChange={(val) => formik.setFieldValue("eventDate", val, true)}
                    label="date time"
                    />
                  </FormControl>
                )}
            </Field>
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