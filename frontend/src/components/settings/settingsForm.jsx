import React from "react";
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  Textarea,
  Flex,
  Spacer,
  Select,
  Box,
  Heading,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DateTime } from "luxon";
import Certificate from "../certificate";

function SettingsForm(props) {
  const userSettings = props.userSettings;
  const updateUser = props.updateUser;
  const userHours = userSettings.volunteeringHours;
  const name = userSettings.username;
  const [userEmail, setUserEmail] = useState(userSettings.email);
  const [userTelegram, setUserTelegram] = useState(userSettings.teleHandle);
  const [userAge, setUserAge] = useState(userSettings.age);
  const [interests, setInterests] = useState(userSettings.interests);
  const [skills, setSkills] = useState(userSettings.skills);
  const [addInfo, setAddInfo] = useState(userSettings.addInfo);
  const [availabilityDateFrom, setAvailabilityDateFrom] = useState(
    DateTime.fromISO(userSettings.availabilityDateFrom)
  );
  const [availabilityDateTo, setAvailabilityDateTo] = useState(
    DateTime.fromISO(userSettings.availabilityDateTo)
  );
  const [userArea, setUserArea] = useState(userSettings.area);

  return (
    <>
      <Container mb="12">
        <Box pb='10px' >
          <Heading size='lg'>
            {localStorage.getItem("personName")}
          </Heading>
          <Grid borderBottom='2px' pb="4px" borderColor='gray.400' templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <Text pt="20px">Voluntering Hours: {userHours}</Text>
            </GridItem>
            <GridItem justifySelf='end'> 
              <Certificate name={name} hours={userHours.toString()}/>     
            </GridItem>
          </Grid>
        </Box>
        <Formik
          initialValues={{
            userEmail: userEmail,
            userTelegram: userTelegram,
            userAge: userAge,
            userArea: userArea,
            availabilityDateFrom: availabilityDateFrom,
            availabilityDateTo: availabilityDateTo,
            interests: interests,
            skills: skills,
            addInfo: addInfo,
          }}
          onSubmit={(values, actions) =>
            updateUser(
              userEmail,
              userTelegram,
              userAge,
              userArea,
              values.availabilityDateFrom,
              values.availabilityDateTo,
              interests,
              skills,
              addInfo
            )
          }
        >
          {(formik) => (
            <Form>
              <Field name="userEmail">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.userEmail && form.touched.userEmail}
                    pb="10px"
                  >
                    <FormLabel>Email</FormLabel>
                    <Input
                      {...field}
                      placeholder="Email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </FormControl>
                )}
              </Field>
              <Field name="userTelegram">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.userTelegram && form.touched.userTelegram
                    }
                    pb="10px"
                  >
                    <FormLabel>Telegram Handle</FormLabel>
                    <Input
                      {...field}
                      placeholder="Telegram Handle Eg. Username"
                      value={userTelegram}
                      onChange={(e) => setUserTelegram(e.target.value)}
                    />
                  </FormControl>
                )}
              </Field>
              <Field name="userAge">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.userAge && form.touched.userAge}
                    pb="10px"
                  >
                    <FormLabel>Age</FormLabel>
                    <Input
                      {...field}
                      placeholder="Your Age"
                      value={userAge}
                      type="number"
                      onChange={(e) => setUserAge(e.target.value)}
                    />
                  </FormControl>
                )}
              </Field>
              <Field name="userArea">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.userArea && form.touched.userArea}
                    pb="10px"
                  >
                    <FormLabel>Area</FormLabel>
                    <Select
                      name="userArea"
                      value={userArea}
                      placeholder="Select volunteer area"
                      onChange={(e) => setUserArea(e.target.value)}
                    >
                      <option value="Central">Central</option>
                      <option value="North">North</option>
                      <option value="South">South</option>
                      <option value="East">East</option>
                      <option value="West">West</option>
                    </Select>
                  </FormControl>
                )}
              </Field>
              <Flex>
                <Field name="availabilityDateFrom">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.availabilityDateFrom &&
                        form.touched.availabilityDateFrom
                      }
                      pb="10px"
                    >
                      <FormLabel>Availability From</FormLabel>
                      <DateTimePicker
                        value={formik.values.availabilityDateFrom}
                        onChange={(e) => {
                          formik.setFieldValue("availabilityDateFrom", e, true);
                        }}
                        label="date time"
                      />
                    </FormControl>
                  )}
                </Field>
                <Spacer />
                <Field name="availabilityDateTo">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.availabilityDateTo &&
                        form.touched.availabilityDateTo
                      }
                      pb="10px"
                    >
                      <FormLabel>Availability To</FormLabel>
                      <DateTimePicker
                        value={formik.values.availabilityDateTo}
                        onChange={(e) => {
                          formik.setFieldValue("availabilityDateTo", e, true);
                        }}
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
                    pb="10px"
                  >
                    <FormLabel>Interests</FormLabel>
                    <Textarea
                      {...field}
                      value={interests}
                      placeholder="List your interests here"
                      onChange={(e) => setInterests(e.target.value)}
                    />
                  </FormControl>
                )}
              </Field>
              <Field name="skills">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.skills && form.touched.skills}
                    pb="10px"
                  >
                    <FormLabel>Skills</FormLabel>
                    <Textarea
                      {...field}
                      value={skills}
                      placeholder="List your skills here"
                      onChange={(e) => setSkills(e.target.value)}
                    />
                  </FormControl>
                )}
              </Field>
              <Field name="addInfo">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.addInfo && form.touched.addInfo}
                    pb="10px"
                  >
                    <FormLabel>Additional Information</FormLabel>
                    <Textarea
                      {...field}
                      value={addInfo}
                      placeholder="Any additional information"
                      onChange={(e) => setAddInfo(e.target.value)}
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
    </>
  );
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
    return "Please ensure fields are input correctly";
  }
  return "Unknown error.";
}

export default SettingsForm;
