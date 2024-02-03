import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

export default function ProjectMenu(props) {
  function validateField(value) {
    let error;
    if (!value) {
      error = "Project must have a name.";
    }
    return error;
  }
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.title}</ModalHeader>
        <ModalCloseButton onClick={props.onClose} />
        <ModalBody>
          <Formik initialValues={props.initialValues} onSubmit={props.onSubmit}>
            {(propsInner) => (
              <Form>
                <Field name="name" validate={validateField}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <FormLabel>Project Name</FormLabel>
                      <Input {...field} placeholder="" />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={propsInner.isSubmitting}
                  type="submit"
                >
                  {props.submitButton}
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
