import { Box, Flex } from "@chakra-ui/react";
import Banner from "../components/main/banner";
import { Outlet } from "react-router-dom";

export default function Login() {
  return (
    <Box>
      <Banner loggedIn={false} />
      <Box>
        <Flex justify="center">
          <Box paddingTop="50px">
            <Outlet />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
