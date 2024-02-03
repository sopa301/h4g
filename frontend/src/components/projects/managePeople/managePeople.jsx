import { Accordion, Box, Button, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import PersonSettings from "./personSettings";
import PersonMenu from "./personMenu";
import axios from "axios";
import { Person } from "../../../objects/Person";
import { ToastContext } from "../../../ToastContext";

export default function ManagePeople(props) {
  const toast = useContext(ToastContext);
  const [people, setPeople] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const proj = props.proj;
  const update = props.update;
  useEffect(() => {
    if (proj && proj.people) {
      setPeople(proj.people.map(mapPeople));
    }
  }, [proj, update]);
  function mapPeople(person, index) {
    return (
      <PersonSettings
        key={person.personId}
        person={person}
        proj={props.proj}
        update={props.update}
        index={index}
      />
    );
  }
  async function handleSubmit(values, actions) {
    await axios
      .put(import.meta.env.VITE_API_URL + "/person", {
        personName: values.username,
        projectId: props.proj.projectId,
        role: values.role,
        projectName: props.proj.projectName,
      })
      .then(function (response) {
        toast({
          title: values.username + " added to project.",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        const newPerson = new Person(
          response.data.personId,
          values.username,
          [],
          values.role
        );
        const newPeople = [...props.proj.people, newPerson];
        props.update(newPeople);
        onClose();
      })
      .catch(function (error) {
        toast({
          title: "Unable to add " + values.username + ".",
          description: getErrorMessage(error),
          status: "error",
          duration: 1000,
          isClosable: true,
        });
        actions.setSubmitting(false);
      });
  }

  return (
    <Box>
      <Accordion allowMultiple="true" defaultIndex={[-1]} padding="5px">
        {people}
      </Accordion>
      <Button onClick={onOpen}>Add Person</Button>
      <PersonMenu
        initialValues={{ username: "", role: "viewer" }}
        isOpen={isOpen}
        onClose={onClose}
        title="Add Person"
        onSubmit={handleSubmit}
      />
    </Box>
  );
}
function getErrorMessage(error) {
  if (!error.response) {
    return "Network error.";
  }
  let status = error.response.status;
  if (status === 403) {
    return "Person already added.";
  }
  if (status === 404) {
    return "Person not found.";
  }
  return "Unknown error.";
}
