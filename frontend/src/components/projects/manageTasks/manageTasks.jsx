import { useContext, useState, useEffect } from "react";
import { Accordion, Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import TaskMenu from "./taskMenu";
import TaskSettings from "./taskSettings";
import { DateTime, Interval } from "luxon";
import { TaskGroup } from "../../../objects/TaskGroup";
import { Task } from "../../../objects/Task";
import axios from "axios";
import CButton from "../../custom/cButton";
import { Project } from "../../../objects/Project";
import { ToastContext } from "../../../ToastContext";

export default function ManageTasks(props) {
  const toast = useContext(ToastContext);
  const [taskGroups, setTaskGroups] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const proj = props.proj;
  const update = props.update;
  useEffect(() => {
    if (proj && proj.taskGroups) {
      setTaskGroups(proj.taskGroups.map(mapTaskGroups));
    }
  }, [proj, update]);
  function mapTaskGroups(taskGroup, index) {
    return (
      <TaskSettings
        key={taskGroup.taskGroupId}
        taskGroup={taskGroup}
        index={index}
        update={props.update}
        proj={props.proj}
      />
    );
  }
  async function handleSubmit(values, actions) {
    const array = [];
    const outArray = [];
    const interval = Interval.fromDateTimes(values.start, values.end);
    for (let i = 0; i < values.assignees.length; i++) {
      array[i] = new Task(
        null,
        interval,
        values.assignees[i],
        values.completed,
        props.proj.projectId,
        Number(values.priority),
        null,
        values.assignees[i] ? true : false
      );
      outArray[i] = array[i].toJSONable();
    }
    await axios
      .put(import.meta.env.VITE_API_URL + "/taskgroup", {
        projectId: props.proj.projectId,
        pax: values.pax,
        taskArrJSON: outArray,
        taskGroupName: values.name,
      })
      .then(function (response) {
        toast({
          title: values.name + " added to project.",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        for (let i = 0; i < array.length; i++) {
          array[i].taskId = response.data.idArray[i];
          array[i].taskGroupId = response.data.taskGroupId;
        }
        const newTaskGroup = new TaskGroup(
          response.data.taskGroupId,
          values.name,
          array,
          values.pax
        );
        const newTaskGroups = [...props.proj.taskGroups, newTaskGroup];
        props.update(newTaskGroups);
        onClose();
      })
      .catch(function (error) {
        toast({
          title: "Unable to add " + values.name + ".",
          description: getErrorMessage(error),
          status: "error",
          duration: 1000,
          isClosable: true,
        });
        actions.setSubmitting(false);
      });
  }
  async function runAlgo() {
    axios
      .post(import.meta.env.VITE_API_URL + "/run", {
        project: props.proj.toJSONable(),
      })
      .then(function (response) {
        toast({
          title: "Tasks automatically assigned.",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        props.update(Project.fromJSONable(response.data.project).taskGroups);
      })
      .catch(function (error) {
        toast({
          title: "Could not assign tasks",
          description: getErrorMessage(error),
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      });
  }
  return (
    <Box>
      <Accordion allowMultiple="true" defaultIndex={[-1]} paddingY="10px">
        {taskGroups}
      </Accordion>
      <Flex>
        <Box paddingX="2.5px">
          <Button onClick={onOpen}>Add Task</Button>
        </Box>
        <Box paddingX="2.5px">
          <CButton content="Auto-Assign" onClick={runAlgo} />
        </Box>
      </Flex>
      <TaskMenu
        isOpen={isOpen}
        onClose={onClose}
        title="Add Task"
        initialValues={{
          name: "",
          pax: "",
          priority: 0,
          start: DateTime.now(),
          end: DateTime.now(),
          assignees: [],
          completed: false,
        }}
        onSubmit={handleSubmit}
        proj={props.proj}
      />
    </Box>
  );
}
function getErrorMessage(error) {
  if (!error.response) {
    return "Network error.";
  }
  let status = error.response.status;
  return "Unknown error.";
}
