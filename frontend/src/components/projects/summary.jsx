import { useEffect, useState } from "react";
import { TaskGroup } from "../../objects/TaskGroup";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";
import Loading from "../custom/loading";

export default function Summary(props) {
  const proj = props.proj;
  const [summary, setSummary] = useState();
  useEffect(() => {
    if (proj) {
      setSummary(convertToSummary(proj).map(mapSummary));
    }
  }, [proj]);

  return summary ? (
    <Accordion allowMultiple="true" defaultIndex={[-1]}>
      {summary}
    </Accordion>
  ) : (
    <Loading />
  );
}

// Converts a Project object into a summary format
function convertToSummary(proj) {
  let array = [];
  let index = 0;
  for (const person of proj.people) {
    let taskGroups = [];
    for (const tg of proj.taskGroups) {
      taskGroups = addTasks(taskGroups, tg, person.personId);
    }
    array[index] = { person: person, taskGroups: taskGroups };
    index++;
  }
  let taskGroups = [];
  for (const tg of proj.taskGroups) {
    taskGroups = addTasks(taskGroups, tg, null);
  }
  array[index] = {
    person: { personName: "Unassigned", personId: -1, unassigned: true },
    taskGroups: taskGroups,
  };
  return array;
}

// Adds taskGroups containing one task which belongs to the id to the array and returns
// the array
function addTasks(array, taskGroup, personId) {
  const out = [...array];
  for (const task of taskGroup.tasks) {
    if (Number(task.personId) === Number(personId)) {
      out.push(
        new TaskGroup(
          taskGroup.taskGroupId,
          taskGroup.taskGroupName,
          [task],
          taskGroup.pax
        )
      );
    }
  }
  return out;
}
function mapSummary(obj) {
  return (
    <AccordionItem key={obj.person.personId}>
      <AccordionButton padding="5px">
        <Flex w="100%">
          <Box textAlign="left" fontWeight="semibold">
            {obj.person.personName}
          </Box>
          <Spacer />
          {!obj.person.unassigned ? (
            <Box>{TaskGroup.getArrayWorkload(obj.taskGroups) + " minutes"}</Box>
          ) : (
            <div />
          )}
          <AccordionIcon />
        </Flex>
      </AccordionButton>
      <AccordionPanel>
        {obj.taskGroups.length > 0 ? (
          obj.taskGroups.map(mapTaskGroup)
        ) : (
          <Text as="i">No Tasks</Text>
        )}
      </AccordionPanel>
    </AccordionItem>
  );
}
function mapTaskGroup(tg) {
  return (
    <Flex key={tg.tasks[0].taskId}>
      {tg.taskGroupName}
      <Spacer />
      {tg.tasks[0].getInterval()}
    </Flex>
  );
}
