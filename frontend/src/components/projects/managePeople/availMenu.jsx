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
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { DateTimeField } from "@mui/x-date-pickers";
import { Interval } from "luxon";

export default function AvailMenu(props) {
  function validateInterval(value) {
    const error = {};
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
              validate={validateInterval}
            >
              {(formik) => (
                <Form>
                  <Field name="interval">
                    {({ field, form }) => (
                      <FormControl isInvalid={formik.errors.interval}>
                        <FormLabel>Interval</FormLabel>
                        <DateTimeField
                          format="dd/MM/yyyy hh:mm a"
                          onChange={(val) => {
                            formik.setFieldValue("start", val, true);
                          }}
                          value={formik.values.start}
                          label="Start Time"
                        />
                        <div>
                          <br />
                        </div>
                        <DateTimeField
                          format="dd/MM/yyyy hh:mm a"
                          onChange={(val) => {
                            formik.setFieldValue("end", val, true);
                          }}
                          value={formik.values.end}
                          label="End Time"
                        />
                        <FormErrorMessage>
                          {formik.errors.interval}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={formik.isSubmitting}
                    type="submit"
                  >
                    {props.title}
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
