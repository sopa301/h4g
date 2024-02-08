import { Box, Button, Heading, Spacer, Flex, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./nav";
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'

export default function Banner(props) {
  const [isOpen, setIsOpen] = useState(false)
  // const navigate = useNavigate();

  const toggle = () => setIsOpen(!isOpen)

  const MenuToggle = ({ toggle, isOpen }) => {
    return (
      <Box fontSize='xl' pr={16} display={{ base: "block", md: "none" }} onClick={toggle}>
        {isOpen ? <CloseIcon /> : <HamburgerIcon />}
      </Box>
    )
  }

  /**function handleLogout() {
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
  }*/

  return (
    <Flex
      size="2xl"
      backgroundColor="blue.400"
      textColor="white"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
    >
      <Heading
        font="sans-serif"
        pl={16}
        // color="#CB6CE6"
        // color="black"
      >
        Big At Heart
      </Heading>
      {props.loggedIn ? <MenuToggle toggle={toggle} isOpen={isOpen} /> : <Box />}
      {props.loggedIn ? <Nav toast={props.toast} loggedIn={props.loggedIn} isOpen={isOpen} /> : <Box />}
      {/**props.loggedIn ? (
          <Text
            as='b'
            fontSize='md'
            font='sans-serif'
            pt='2'
            pr='8'
          >
            Welcome, {localStorage.getItem("personName")}!
          </Text> 
        ) : ( 
          <Box />
        )}
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
        )*/}
    </Flex>
  );
}
