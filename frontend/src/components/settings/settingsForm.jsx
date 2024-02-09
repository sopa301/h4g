import React from "react";
import { Container, FormControl, FormLabel, Input, Text, Button, Textarea, Flex, Spacer, Select } from '@chakra-ui/react';
import { Field, Form, Formik, setIn } from "formik";
import axios from 'axios';
import { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DateTime } from "luxon"
import { useEffect } from "react";

function SettingsForm(props) {
  const toastEffect = props.toast;
  const [userEmail, setUserEmail] = useState("")
  const [userTelegram, setUserTelegram] = useState("")
  const [userAge, setUserAge] = useState(0)
  const [interests, setInterests] = useState("")
  const [skills, setSkills] = useState("")
  const [addInfo, setAddInfo] = useState("")
  const [availabilityDateFrom, setAvailabilityDateFrom] = useState(DateTime.now())
  const [availabilityDateTo, setAvailabilityDateTo] = useState(DateTime.now())
  const [userArea, setUserArea] = useState("")

  useEffect(() => {
    getUser(localStorage.getItem('personId'))
  }, [])

  async function getUser(userId) {
    return await axios
    .post(import.meta.env.VITE_API_URL + "/user", {
      userId: userId
    })
    .then((res => {
      setUserEmail(res.data.email)
      setUserTelegram(res.data.teleHandle)
      setUserAge(res.data.age)
      setUserArea(res.data.area)
      setInterests(res.data.interests)
      setSkills(res.data.skills)
      setAddInfo(res.data.addInfo)
      setAvailabilityDateFrom(res.data.availabilityDateFrom)
      setAvailabilityDateTo(res.data.availabilityDateTo)
    }))
    .catch(function (error) {
      toastEffect({
        title: "Unable to retrieve data.",
        description: getErrorMessage(error),
        status: "error",
        duration: 1000,
        isClosable: true,
      })
    })
  }

  async function updateUser(userEmail, userTelegram, userAge, userArea, availabilityDateFrom, availabilityDateTo, interests, skills, addInfo) {
    return await axios
    .patch(import.meta.env.VITE_API_URL + "/user", {
      userId: localStorage.getItem("personId"),
      email: userEmail,
      teleHandle: userTelegram,
      age: userAge,
      area: userArea,
      availabilityDateFrom: availabilityDateFrom,
      availabilityDateTo: availabilityDateTo,
      interests: interests,
      skills: skills,
      addInfo: addInfo
    })
    .then(res => toastEffect({
      title: "Success",
      description: "Successfully updated!", 
      status: 'success',
      duration: 1000,
      isClosable: true
    }))
    .catch(function (error) {
      toastEffect({
        title: "Unable to update.",
        description: getErrorMessage(error),
        status: "error",
        duration: 1000,
        isClosable: true,
      })
    })
  }

  return (
    <>
      <Container mb='12'>
        <Text fontSize='2xl' pb='4'>{localStorage.getItem('personName')}</Text>
          <Formik
            initialValues={{ userEmail: userEmail, userTelegram: userTelegram, userAge: userAge, userArea: userArea, availabilityDateFrom: availabilityDateFrom, availabilityDateTo: availabilityDateTo, interests: interests, skills:skills, addInfo: addInfo }}
            onSubmit={(values, actions) => updateUser(userEmail, userTelegram, userAge, userArea, values.availabilityDateFrom, values.availabilityDateTo, interests, skills, addInfo)}
          >
            {(formik) => (
              <Form>
                <Field name="userEmail">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.userEmail && form.touched.userEmail}
                      pb='10px'
                    >
                      <FormLabel>Email</FormLabel>
                      <Input {...field} placeholder="Email" value={userEmail} onChange={e => setUserEmail(e.target.value)} />
                    </FormControl>
                  )}
                </Field>
                <Field name="userTelegram">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.userTelegram && form.touched.userTelegram}
                      pb='10px'
                    >
                      <FormLabel>Telegram Handle</FormLabel>
                      <Input {...field} placeholder="Telegram Handle Eg. Username" value={userTelegram} onChange={e => setUserTelegram(e.target.value)} />
                    </FormControl>
                  )}
                </Field>
                <Field name="userAge">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.userAge && form.touched.userAge}
                      pb='10px'
                    >
                      <FormLabel>Age</FormLabel>
                      <Input {...field} placeholder="Your Age" value={userAge} type='number' onChange={e => setUserAge(e.target.value)}/>
                    </FormControl>
                  )}
                </Field>
                <Field name="userArea">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.userArea && form.touched.userArea}
                      pb='10px'
                    >
                      <FormLabel>Area</FormLabel>
                      <Select name="userArea" value={userArea} placeholder='Select volunteer area' onChange={e => setUserArea(e.target.value)}>
                        <option value='Central'>Central</option>
                        <option value='North'>North</option>
                        <option value='South'>South</option>
                        <option value='East'>East</option>
                        <option value='West'>West</option>
                      </Select>
                    </FormControl>
                  )}
                </Field>
                <Flex>
                  <Field name="availabilityDateFrom">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.availabilityDateFrom && form.touched.availabilityDateFrom}
                        pb='10px'
                      >
                        <FormLabel>Availability From</FormLabel>
                        <DateTimePicker 
                          value={formik.values.availabilityDateFrom} 
                          onChange={(val) => formik.setFieldValue("availabilityDateFrom", val, true)}
                          label="date time"
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Spacer />
                  <Field name="availabilityDateTo">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.availabilityDateTo && form.touched.availabilityDateTo}
                        pb='10px'
                      >
                        <FormLabel>Availability To</FormLabel>
                        <DateTimePicker 
                          value={formik.values.availabilityDateTo}
                          onChange={(val) => formik.setFieldValue("availabilityDateTo", val, true)}
                          label="date time"
                        />
                      </FormControl>
                    )}
                  </Field>
                </Flex>
                <Field name="interests">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.intersts && form.touched.interests}
                      pb='10px'
                    >
                      <FormLabel>Interests</FormLabel>
                      <Textarea {...field} value={interests} placeholder="List your interests here" onChange={e => setInterests(e.target.value)}/>
                    </FormControl>
                  )}
                </Field>
                <Field name="skills">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.skills && form.touched.skills}
                      pb='10px'
                    >
                      <FormLabel>Skills</FormLabel>
                      <Textarea {...field} value={skills} placeholder="List your skills here" onChange={e => setSkills(e.target.value)} />
                    </FormControl>
                  )}
                </Field>
                <Field name="addInfo">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.addInfo && form.touched.addInfo}
                      pb='10px'
                    >
                      <FormLabel>Additional Information</FormLabel>
                      <Textarea {...field} value={addInfo} placeholder="Any additional information" onChange={e => setAddInfo(e.target.value)} />
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
      </>
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

export default SettingsForm;