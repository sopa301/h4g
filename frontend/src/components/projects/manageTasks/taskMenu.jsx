import { Fragment } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  RadioGroup,
  Stack,
  Radio,
  Select,
  Text,
  Box,
  Checkbox,
} from "@chakra-ui/react";
import { Field, Form, FieldArray, Formik } from "formik";
import { DateTimeField } from "@mui/x-date-pickers";
import { Interval } from "luxon";

export default function TaskMenu(props) {
  function validate(value) {
    const error = {};
    // name
    if (!value.name) {
      error.name = "Name is required";
    }
    // pax
    if (!isInDesiredForm(value.pax) || Number(value.pax) < 1) {
      error.pax = "Enter a valid number";
    }
    // interval
    if (!value.start || !value.end) {
      error.interval = "Both fields are required";
    } else if (!Interval.fromDateTimes(value.start, value.end).isValid) {
      error.interval = "Interval is invalid";
    }
    return error;
  }

  return (
    <Fragment>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.title}</ModalHeader>
          <ModalCloseButton onClick={props.onClose} />
          <ModalBody>
            <Formik
              initialValues={props.initialValues}
              onSubmit={props.onSubmit}
              validate={validate}
            >
              {(formik) => (
                <Form>
                  <Field name="name">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={formik.errors.name && form.touched.name}
                      >
                        <FormLabel>Task Name</FormLabel>
                        <Input {...field} placeholder="" />
                        <FormErrorMessage>
                          {formik.errors.name}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="pax">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={formik.errors.pax && form.touched.pax}
                      >
                        <FormLabel>Pax</FormLabel>
                        <Input
                          value={formik.values.pax}
                          placeholder=""
                          onChange={(v) => {
                            formik.values.pax = v.target.value;
                            formik.setFieldValue(
                              "assignees",
                              isInDesiredForm(v.target.value)
                                ? createAssigneeArray(
                                    v.target.value,
                                    formik.values.assignees
                                  )
                                : []
                            );
                          }}
                        />
                        <FormErrorMessage>{formik.errors.pax}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <FieldArray
                    name="assignees"
                    values={formik.values.assignees}
                    render={({ move, swap, push, insert, unshift, pop }) => (
                      <Box>
                        {formik.values.assignees.map((assignee, index) => (
                          <Box key={index} padding="5px">
                            <Text>Person {index + 1}</Text>
                            <Select
                              placeholder="None"
                              defaultValue={assignee}
                              onChange={(v) =>
                                formik.setFieldValue("assignees", [
                                  ...formik.values.assignees.slice(0, index),
                                  v.target.value,
                                  ...formik.values.assignees.slice(
                                    index + 1,
                                    formik.values.assignees.length
                                  ),
                                ])
                              }
                            >
                              {props.proj.people.map((person, index) => (
                                <option
                                  key={person.personId}
                                  value={person.personId}
                                >
                                  {person.personName}
                                </option>
                              ))}
                            </Select>
                          </Box>
                        ))}
                      </Box>
                    )}
                  />
                  <Field name="priority">
                    {({ field, form }) => (
                      <FormControl>
                        <FormLabel>Priority</FormLabel>
                        <RadioGroup
                          onChange={(val) => {
                            formik.setFieldValue("priority", Number(val));
                          }}
                          value={field.value}
                        >
                          <Stack direction="row">
                            <Radio value={2}>Low</Radio>
                            <Radio value={1}>Medium</Radio>
                            <Radio value={0}>High</Radio>
                          </Stack>
                        </RadioGroup>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="interval">
                    {({ field, form }) => (
                      <FormControl isInvalid={formik.errors.interval}>
                        <FormLabel>Interval</FormLabel>
                        <DateTimeField
                          format="dd/MM/yyyy hh:mm a"
                          onChange={(val) =>
                            formik.setFieldValue("start", val, true)
                          }

                          value={formik.values.start}
                          label="Start Time"
                        />
                        <div>
                          <br />
                        </div>
                        <DateTimeField
                          format="dd/MM/yyyy hh:mm a"
                          onChange={(val) =>
                            formik.setFieldValue("end", val, true)
                          }
                          value={formik.values.end}
                          label="End Time"
                        />
                        <FormErrorMessage>
                          {formik.errors.interval}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <br />
                  <Field name="completed">
                    {({ field, form }) => (
                      <Checkbox
                        isChecked={formik.values.completed}
                        onChange={(val) => {
                          formik.setFieldValue(
                            "completed",
                            !formik.values.completed
                          );
                        }}
                      >
                        Completed
                      </Checkbox>
                    )}
                  </Field>
                  <br />
                  <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={formik.isSubmitting}
                    type="submit"
                  >
                    {" "}
                    {props.title}{" "}
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
function isInDesiredForm(str) {
  if (typeof str === "number" && str % 1 === 0 && str > 0) {
    return true;
  }
  var n = Math.floor(Number(str));
  return n !== Infinity && String(n) === str && n >= 0;
}
function createAssigneeArray(len, oldArr) {
  const out = [...oldArr.slice(0, len)];
  for (let i = oldArr.length; i < len; i++) {
    out[i] = null;
  }
  return out;
}
