import { Box, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Nav(props) {
  return (
    <Stack paddingLeft="30px" alignItems="end" direction={"row"}>
      <Box paddingX="5px" fontWeight="bold">
        <Link to="./dashboard">Dashboard</Link>
      </Box>
      <Box paddingX="5px" fontWeight="bold">
        <Link to="./settings">Settings</Link>
      </Box>
    </Stack>
  );
}
