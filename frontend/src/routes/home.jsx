import { Box, Heading } from "@chakra-ui/react";
import { useOutletContext } from "react-router-dom";
import Profile from "../components/profile";

export default function Home() {
  const [personName] = useOutletContext();
  return (
    <Box padding="5px">
      <Heading>Hello, {personName}.</Heading>
      <Profile />
    </Box>
  );
}
