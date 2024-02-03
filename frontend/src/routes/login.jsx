import { Grid, GridItem, Box, Image, Flex } from "@chakra-ui/react";
import Banner from "../components/main/banner";
import { Outlet } from "react-router-dom";

export default function Login() {
  return (
    <Box>
      <Banner loggedIn={false} />
      <Box>
        <Grid templateColumns="repeat(5, 1fr)" gap={4}>
          <GridItem colSpan={3}>
            <Flex justify="center">
              <Box paddingTop="50px">
                <Outlet />
              </Box>
            </Flex>
          </GridItem>
          <GridItem colSpan={2}>
            <Image src="/loginpageimage.png" />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}
