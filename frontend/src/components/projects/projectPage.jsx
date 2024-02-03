import "../../App.css";
import {
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import ManageTasks from "./manageTasks/manageTasks";
import Summary from "./summary";
import ManagePeople from "./managePeople/managePeople";
import { Project } from "../../objects/Project";
import { ToastContext } from "../../ToastContext";

export default function ProjectPage(props) {
  const { projectId } = useLoaderData();
  const [proj, setProj] = useState();
  const toast = useContext(ToastContext);
  const [role, setRole] = useState("");
  useEffect(() => {
    axios
      .post(import.meta.env.VITE_API_URL + "/project", {
        personId: localStorage.getItem("personId"),
        projectId: projectId,
      })
      .then(function (response) {
        if (response.data.project) {
          const proj = Project.fromJSONable(response.data.project);
          setProj(proj);
          setRole(getRole(localStorage.getItem("personId"), proj));
        } else {
          toast({
            title: "Unable to load project.",
            description: "Unable to read data from server.",
            status: "error",
            duration: 1000,
            isClosable: true,
          });
        }
      })
      .catch(function (error) {
        toast({
          title: "Unable to load project.",
          description: getErrorMessage(error),
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      });
  }, [setProj]);

  return (
    <Tabs defaultIndex={1}>
      <TabList>
        <Link to="../">
          <Button>Back</Button>
        </Link>
        <Tab
          isDisabled
          css={`
            &:disabled {
              cursor: default;
            }
          `}
        />
        <Tab>Summary</Tab>
        {role === "owner" || role === "editor" ? (
          <Tab>Manage Tasks</Tab>
        ) : (
          <div />
        )}
        {role === "owner" ? <Tab>Manage People</Tab> : <div />}
      </TabList>

      <TabPanels>
        <TabPanel />
        <TabPanel>
          <Summary proj={proj} />
        </TabPanel>
        {role === "owner" || role === "editor" ? (
          <TabPanel>
            <ManageTasks
              proj={proj}
              update={(newTasks) =>
                setProj(
                  new Project(
                    proj.projectId,
                    proj.projectName,
                    proj.people,
                    newTasks
                  )
                )
              }
            />
          </TabPanel>
        ) : (
          <div />
        )}
        {role === "owner" ? (
          <TabPanel>
            <ManagePeople
              proj={proj}
              update={(newPeople) =>
                setProj(
                  new Project(
                    proj.projectId,
                    proj.projectName,
                    newPeople,
                    proj.taskGroups
                  )
                )
              }
            />
          </TabPanel>
        ) : (
          <div />
        )}
      </TabPanels>
    </Tabs>
  );
}

export async function loader({ params }) {
  return { projectId: params.projectId };
}

function getRole(personId, project) {
  if (!project || !project.people) {
    return "";
  }
  return project.people.filter(
    (x) => Number(x.personId) === Number(personId)
  )[0].role;
}
function getErrorMessage(error) {
  if (!error.response) {
    return "Network error.";
  }
  let status = error.response.status;
  if (status === 404) {
    return "Project not found.";
  }
  if (status === 403) {
    return "No view rights.";
  }
  return "Unknown error.";
}
