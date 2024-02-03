import { useContext, useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Heading,
  Text,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import axios from "axios";
import Loading from "../components/custom/loading";
import { TaskGroup } from "../objects/TaskGroup";
import { ToastContext } from "../ToastContext";

export default function Tasks(props) {
  const toast = useContext(ToastContext);
  const [tasks, setTasks] = useState();
  useEffect(() => {
    axios
      .post(import.meta.env.VITE_API_URL + "/getMyTasks", {
        personId: localStorage.getItem("personId"),
      })
      .then(function (response) {
        const data = response.data.tasks.map((x) => {
          return {
            projectName: x.projectName,
            taskGroup: TaskGroup.fromJSONable(x.taskGroup),
          };
        });
        data.sort((a, b) => {
          return a.taskGroup.tasks[0].interval.start <
            b.taskGroup.tasks[0].interval.start
            ? -1
            : 1;
        });
        setTasks(data.map(mapTasks));
      })
      .catch(function (error) {
        toast({
          title: "Unable to load tasks",
          description: getErrorMessage(error),
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      });
  }, []);

  function mapTasks(task) {
    return (
      <AccordionItem key={task.taskGroup.tasks[0].taskId}>
        <AccordionButton>
          <Flex w="100%">
            {task.taskGroup.taskGroupName}
            <Spacer />
            <AccordionIcon />
          </Flex>
        </AccordionButton>
        <AccordionPanel>
          <Text>{task.projectName}</Text>
          <Text>{task.taskGroup.tasks[0].getInterval()}</Text>
        </AccordionPanel>
      </AccordionItem>
    );
  }

  return (
    <Box paddingX="5px">
      <Heading paddingX="5px">My Tasks</Heading>
      {tasks ? (
        tasks.length > 0 ? (
          <Accordion allowMultiple="true" defaultIndex={[-1]} padding="5px">
            {tasks}
          </Accordion>
        ) : (
          <Text>No tasks!</Text>
        )
      ) : (
        <Loading />
      )}
    </Box>
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
  return "Unknown error.";
}
