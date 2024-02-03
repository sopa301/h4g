import {
  Flex,
  Spacer,
  Box,
  RadioGroup,
  Stack,
  Radio,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import CButton from "../../custom/cButton";
import { useState, useContext } from "react";
import { Person } from "../../../objects/Person";
import axios from "axios";
import AvailList from "./availList";
import { ToastContext } from "../../../ToastContext";

export default function PersonSettings(props) {
  const toast = useContext(ToastContext);
  const [val, setVal] = useState(props.person.role);
  const [avails, setAvails] = useState(props.person.availabilities);
  const [isOwner] = useState(
    () => getRole(props.person.personId, props.proj) === "owner"
  );
  async function setPerm(newVal) {
    if (val === newVal) {
      return;
    } else {
      axios
        .patch(import.meta.env.VITE_API_URL + "/person", {
          personId: props.person.personId,
          projectId: props.proj.projectId,
          role: newVal,
        })
        .then(function (response) {
          toast({
            title: props.person.personName + " set to " + newVal + ".",
            status: "success",
            duration: 1000,
            isClosable: true,
          });
          const newPerson = new Person(
            props.person.personId,
            props.person.personName,
            props.person.availabilities,
            newVal
          );
          const newPeople = [
            ...props.proj.people.slice(0, props.index),
            newPerson,
            ...props.proj.people.slice(
              props.index + 1,
              props.proj.people.length
            ),
          ];
          props.update(newPeople);
          setVal(newVal);
        })
        .catch(function (error) {
          toast({
            title: "Unable to set role for " + props.person.personName + ".",
            description: getErrorMessage(error),
            status: "error",
            duration: 1000,
            isClosable: true,
          });
          setVal(val);
        });
    }
  }
  async function handleDelete() {
    axios
      .delete(import.meta.env.VITE_API_URL + "/person", {
        data: {
          personId: props.person.personId,
          projectId: props.proj.projectId,
        },
      })
      .then(function (response) {
        toast({
          title: props.person.personName + " removed.",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        const newPeople = [
          ...props.proj.people.slice(0, props.index),
          ...props.proj.people.slice(props.index + 1, props.proj.people.length),
        ];
        props.update(newPeople);
      })
      .catch(function (error) {
        toast({
          title: "Unable to remove " + props.person.personName,
          description: getErrorMessage(error),
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      });
  }
  function updateAvails(newAvails) {
    setAvails(newAvails);
    const newPerson = new Person(
      props.person.personId,
      props.person.personName,
      newAvails,
      props.person.role
    );
    const newPeople = [
      ...props.proj.people.slice(0, props.index),
      newPerson,
      ...props.proj.people.slice(props.index + 1, props.proj.people.length),
    ];
    props.update(newPeople);
  }
  return (
    <AccordionItem>
      <AccordionButton padding="5px">
        <Flex w="100%">
          <Box textAlign="left" fontWeight="semibold">
            {props.person.personName}
          </Box>
          <Spacer />
          <AccordionIcon />
        </Flex>
      </AccordionButton>
      <AccordionPanel>
        {isOwner ? (
          <div />
        ) : (
          <Flex>
            <RadioGroup onChange={setPerm} value={val}>
              <Stack direction="row">
                <Radio value="editor">Editor</Radio>
                <Radio value="viewer">Viewer</Radio>
              </Stack>
            </RadioGroup>
            <Spacer />
            <CButton
              children={{ colorScheme: "red", paddingX: "5px" }}
              content="Remove from project"
              onClick={handleDelete}
            />
          </Flex>
        )}
        <AvailList
          array={avails}
          setArray={updateAvails}
          person={props.person}
          projectId={props.proj.projectId}
        />
      </AccordionPanel>
    </AccordionItem>
  );
}
function getErrorMessage(error) {
  if (!error.response) {
    return "Network error.";
  }
  let status = error.response.status;
  return "Unknown error.";
}
function getRole(personId, project) {
  if (!project || !project.people) {
    return "";
  }
  return project.people.filter(
    (x) => Number(x.personId) === Number(personId)
  )[0].role;
}
