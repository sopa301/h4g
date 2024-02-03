import {
  ListItem,
  List,
  Button,
  Box,
  Flex,
  Spacer,
  Card,
  Container,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../custom/loading";

export default function UnownedProjects(props) {
  const [projects, setProjects] = useState();

  const arrayEffect = props.array;
  useEffect(() => {
    if (arrayEffect) {
      setProjects(arrayEffect.map(mapProjects));
    }
  }, [arrayEffect]);

  function mapProjects(proj) {
    return (
      <ListItem key={proj.projectId} data-testid={"UnownedItem" + proj.projectId}>
        <Card padding="5px">
          <Flex alignItems="center">
            <Container maxWidth="40ch">{proj.projectName}</Container>
            <Spacer />
            <Box paddingX="2.5px">
              <Link to={"./" + proj.projectId}>
                <Button colorScheme="green" variant="outline">
                  Open
                </Button>
              </Link>
            </Box>
          </Flex>
        </Card>
      </ListItem>
    );
  }
  return (
    <Box>
      {projects ? (
        <Box paddingY="10px">
          {projects.length > 0 ? (
            <List>{projects}</List>
          ) : (
            <Text>No projects here!</Text>
          )}
        </Box>
      ) : (
        <Loading />
      )}
    </Box>
  );
}
