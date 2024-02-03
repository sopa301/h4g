import { Box, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Nav(props) {
  return (
    <Stack paddingLeft="30px" alignItems="end" direction={"row"}>
      <Box paddingX="5px" fontWeight="bold">
        <Link to="./tasks">My Tasks</Link>
      </Box>
      <Box paddingX="5px" fontWeight="bold">
        <Link to="./projects">All Projects</Link>
      </Box>
    </Stack>
  );
}
