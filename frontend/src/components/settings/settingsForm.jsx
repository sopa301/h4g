import React from "react";
import { Container, FormControl, FormLabel, Input, Text, Button } from '@chakra-ui/react';
import { Field, Form, Formik } from "formik";
import axios from 'axios';
import { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DateTime } from "luxon"

function SettingsForm(props) {
  const [userEmail, setUserEmail] = useState("")
  const [userTelegram, setUserTelegram] = useState("")

  async function getUserEmail() {
    
  }

  async function getUserTelegram() {
    
  }

  return (
    <Container pt='20px'>
      <Text>{localStorage.getItem('personName')}</Text>
        <Formik
          initialValues={{ userEmail: getUserEmail() }}
          onSubmit
        >
          {(formik) => (
            <Form>
              <Field name="userEmail">
                {({ field, form }) => (
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder="Email" />
                  </FormControl>
                )}
              </Field>
              <Field>
                {({ field, form }) => (
                  <FormControl>
                    <FormLabel>Telegram Handle</FormLabel>
                    <Input placeholder="Telegram Handle Eg. Username" />
                  </FormControl>
                )}
              </Field>
              <Field>
                {({ field, form }) => (
                  <FormControl>
                    <FormLabel>Availability From</FormLabel>
                    <DateTimePicker 
                      value={formik.values.availabilityDateFrom} 
                      onChange={(val) => formik.setFieldValue("availabilityDateFrom", val, true)}
                      label="date time"
                    />
                  </FormControl>
                )}
              </Field>
              <Field>
                {({ field, form }) => (
                  <FormControl>
                    <FormLabel>Availability To</FormLabel>
                    <DateTimePicker 
                      value={formik.values.availabilityDateTo} 
                      onChange={(val) => formik.setFieldValue("availabilityDateTo", val, true)}
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
                Update
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    )
}

export default SettingsForm;