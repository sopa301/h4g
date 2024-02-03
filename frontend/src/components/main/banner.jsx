import { Box, Button, Heading, Spacer, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Nav from "./nav";

export default function Banner(props) {
  const navigate = useNavigate();

  function handleLogout() {
    props.toast({
      title: "Successfully logged out.",
      description: "",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
    navigate("/login");
    localStorage.removeItem("personName");
    localStorage.removeItem("personId");
    localStorage.removeItem("token");
  }
  return (
    <Flex
      size="2xl"
      backgroundColor="#0CC0DF"
      paddingX="10px"
      paddingY="15px"
      textColor="white"
    >
      <Heading
        font="sans-serif"
        // color="#CB6CE6"
        // color="black"
      >
        The Purple Dog Project
      </Heading>
      {props.loggedIn ? <Nav /> : <Box />}
      <Spacer />
      {props.loggedIn ? (
        <Button
          onClick={handleLogout}
          position="right"
          color="white"
          variant="outline"
        >
          Logout
        </Button>
      ) : (
        <Box />
      )}
    </Flex>
  );
}
