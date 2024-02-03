import {
  ListItem,
  List,
  Button,
  Box,
  useDisclosure,
  Text,
  Spacer,
  Flex,
  Card,
  Container,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CButton from "../custom/cButton";
import ProjectMenu from "./projectMenu";
import Loading from "../custom/loading";
import { ToastContext } from "../../ToastContext";

export default function OwnedProjects(props) {
  const toast = useContext(ToastContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const editProjFn = (name) => {
    return {
      title: "Edit Project",
      initialValues: { name: name },
      onSubmit: editProject,
      submitButton: "Change name",
    };
  };
  const addProj = {
    title: "Add Project",
    initialValues: { name: "" },
    onSubmit: createProject,
    submitButton: "Add Project",
  };
  const [modalSettings, setModalSettings] = useState(addProj);
  const activeId = useRef();
  const [projects, setProjects] = useState();

  const arrayEffect = props.array;
  useEffect(() => {
    if (arrayEffect) {
      setProjects(arrayEffect.map(mapProjects));
    }
  }, [arrayEffect]);

  function mapProjects(proj, index) {
    async function deleteProject() {
      await axios
        .delete(import.meta.env.VITE_API_URL + "/project", {
          data: {
            personId: localStorage.getItem("personId"),
            projectId: proj.projectId,
          },
        })
        .then(function (response) {
          toast({
            title: proj.projectName + " deleted.",
            status: "success",
            duration: 1000,
            isClosable: true,
          });
          props.setArray((x) => [
            ...x.slice(0, index),
            ...x.slice(index + 1, x.length),
          ]);
        })
        .catch(function (error) {
          toast({
            title: "Unable to delete project.",
            description: getErrorMessageDP(error),
            status: "error",
            duration: 1000,
            isClosable: true,
          });
        });
    }
    async function handleEdit() {
      activeId.current = proj.projectId;
      setModalSettings(editProjFn(proj.projectName));
      onOpen();
    }
    return (
      <ListItem key={proj.projectId} data-testid={"OwnedItem" + proj.projectId}>
        <Card padding="5px">
          <Flex alignItems="center">
            <Container maxWidth="40ch">{proj.projectName}</Container>
            <Spacer />
            <Flex>
              <Box paddingX="2.5px">
                <Link to={"./" + proj.projectId}>
                  <Button colorScheme="green" variant="outline">
                    Open
                  </Button>
                </Link>
              </Box>
              <Box paddingX="2.5px">
                <CButton
                  content="Edit"
                  onClick={handleEdit}
                  children={{ colorScheme: "yellow", variant: "outline" }}
                />
              </Box>
              <Box paddingX="2.5px">
                <CButton
                  content="Delete"
                  onClick={deleteProject}
                  children={{ colorScheme: "red", variant: "outline" }}
                />
              </Box>
            </Flex>
          </Flex>
        </Card>
      </ListItem>
    );
  }
  async function createProject(values, actions) {
    await axios
      .put(import.meta.env.VITE_API_URL + "/project", {
        personId: localStorage.getItem("personId"),
        projectName: values.name,
      })
      .then(function (response) {
        toast({
          title: values.name + " created.",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        onClose();
        props.setArray((x) => [
          ...x,
          { projectName: values.name, projectId: response.data.projectId },
        ]);
      })
      .catch(function (error) {
        toast({
          title: "Unable to create project.",
          description: getErrorMessageCP(error),
          status: "error",
          duration: 1000,
          isClosable: true,
        });
        actions.setSubmitting(false);
      });
  }
  async function editProject(values, actions) {
    const oldName = props.array.filter(
      (x) => x.projectId === activeId.current
    )[0].projectName;
    await axios
      .patch(import.meta.env.VITE_API_URL + "/project", {
        projectId: activeId.current,
        projectName: values.name,
      })
      .then(function (response) {
        toast({
          title: "Changed name of " + oldName + " to " + values.name,
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        onClose();
        const index = props.array.indexOf(
          props.array.filter((x) => x.projectId === activeId.current)[0]
        );
        props.setArray((x) => [
          ...x.slice(0, index),
          { projectName: values.name, projectId: activeId.current },
          ...x.slice(index + 1, x.length),
        ]);
      })
      .catch(function (error) {
        toast({
          title: "Unable to change project name.",
          description: getErrorMessageEP(error),
          status: "error",
          duration: 1000,
          isClosable: true,
        });
        actions.setSubmitting(false);
      });
  }

  return (
    <Box>
      {projects ? (
        <Box>
          <Box paddingY="10px">
            {projects.length > 0 ? (
              <List>{projects}</List>
            ) : (
              <Text>No projects here!</Text>
            )}
          </Box>
          <Button
            onClick={() => {
              setModalSettings(addProj);
              onOpen();
            }}
            variant="outline"
          >
            Add Project
          </Button>
        </Box>
      ) : (
        <Loading />
      )}
      <ProjectMenu onClose={onClose} isOpen={isOpen} {...modalSettings} />
    </Box>
  );
}
function getErrorMessageDP(error) {
  if (!error.response) {
    return "Network error.";
  }
  let status = error.response.status;
  if (status === 403) {
    return "Not authorised.";
  }
  if (status === 404) {
    return "Project not found";
  }
  return "Unknown error.";
}
function getErrorMessageEP(error) {
  if (!error.response) {
    return "Network error.";
  }
  let status = error.response.status;
  return "Unknown error.";
}
function getErrorMessageCP(error) {
  if (!error.response) {
    return "Network error.";
  }
  return "Unknown error.";
}
