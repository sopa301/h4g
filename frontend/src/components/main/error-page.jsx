import { Link, useRouteError } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Box id="error-page">
      <Center paddingTop="50px">
        <Stack alignItems="center">
          <Heading>Oops!</Heading>
          <Text>Sorry, an unexpected error has occurred.</Text>
          <Text>{error.statusText || error.message}</Text>
          <Image boxSize="192px" src="../../../purpledog192.png" />
          <Button>
            <Link to="/">Return to Home</Link>
          </Button>
        </Stack>
      </Center>
    </Box>
  );
}
