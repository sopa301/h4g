import React from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Box, 
  Text
} from "@chakra-ui/react";
import { Container, Input, Textarea } from '@chakra-ui/react';
import { Field, Form, Formik } from "formik";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DateTime } from "luxon"
import axios from 'axios';

const defaultImg = "https://static.wixstatic.com/media/014c07_8aaef62173da4bb5b99dbe5b7ae87d9b~mv2.png/v1/fill/w_190,h_120,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/big%20at%20heart%20logo.png";

function UpdateForm(props) {

  const toastEffect = props.toast;

  async function updateEvent(eventName, eventDesc, eventImg, eventDate) {
    if (eventImg === "") {
      eventImg = defaultImg
    }

    return await axios
    .put(import.meta.env.VITE_API_URL + "/event", {
      userId: localStorage.getItem("personId"),
      eventName: eventName,
      eventDate: eventDate, 
      eventDesc: eventDesc,
      eventImg: eventImg
    })
    .then(res => toastEffect({
      title: "Success",
      description: "Added new event", 
      status: 'success',
      duration: 1000,
      isClosable: true
    }))
    .catch(function (error) {
        toastEffect({
          title: "Unable to retrieve data.",
          description: getErrorMessage(error),
          status: "error",
          duration: 1000,
          isClosable: true,
    })});
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
    <Container pt='20px'>
      <Formik
        initialValues={{ eventName: "", eventDesc: "", 
        eventImg: "",
        eventDate: DateTime.local()}}
        onSubmit={(values, actions) => updateEvent(values.eventName, values.eventDesc, values.eventImg, values.eventDate)}
      >
        {(formik) => (
          <Form>
            <Field name="eventName" validate={validateEventName}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.eventName && form.touched.eventName}
                    pb='10px'
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
                    pb='10px'
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
                    pb='10px'
                  >
                    <FormLabel>Image URL</FormLabel>
                    <Input {...field} placeholder="Image URL"/>
                    <Text fontSize='sm' as='em'>If not image url given, default image will be used</Text>
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

function getErrorMessage(error) {
  if (!error.response) {
    return "Network error.";
  }
  let status = error.response.status;
  if (status === 404) {
    return "User ID not found.";
  }
  if (status === 403) {
    return "Please ensure fields are input correctly"
  }
  return "Unknown error.";
}

export default UpdateForm