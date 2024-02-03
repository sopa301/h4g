import { Box, Heading, Grid, GridItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import UnownedProjects from "../components/projects/unownedProjects";
import OwnedProjects from "../components/projects/ownedProjects";
import axios from "axios";

export default function Projects(props) {
  const [ownArray, setOwnArray] = useState();
  const [otherArray, setOtherArray] = useState();

  const toastEffect = props.toast;
  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios
      .post(import.meta.env.VITE_API_URL + "/getProjects", {
        personId: localStorage.getItem("personId"),
      })
      .then(function (response) {
        setOwnArray(response.data.projects.owned);
        setOtherArray(response.data.projects.unowned);
      })
      .catch(function (error) {
        toastEffect({
          title: "Unable to retrieve data.",
          description: getErrorMessage(error),
          status: "error",
          duration: 1000,
          isClosable: true,
        });
        setOwnArray();
        setOtherArray();
      });
  }
  return (
    <Box paddingX="10px">
      <Heading>Projects</Heading>
      <br />
      <Box>
        <Grid templateColumns="repeat(2, 1fr)" gap={1}>
          <GridItem paddingX="10px">
            <Text>My Projects:</Text>
            <OwnedProjects
              array={ownArray}
              setArray={setOwnArray}
            />
          </GridItem>
          <GridItem paddingX="10px">
            <Text>Projects I'm in:</Text>
            <UnownedProjects
              array={otherArray}
              setArray={setOtherArray}
              toast={props.toast}
            />
          </GridItem>
        </Grid>
      </Box>
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
