import { Box, Stack, Text, VStack, Button, Spacer } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Nav(props) {
  const navigate = useNavigate();
  const isAdmin = useSelector(state => state.admin.value)

  const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
    return (
      <Link to={to}>
        <Text fontWeight='bold' display="block" {...rest}>
          {children}
        </Text>
      </Link>
    )
  }

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
    <Box
      display={{ base: props.isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
      px={12}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="./dashboard">Dashboard</MenuItem>
        {isAdmin && <MenuItem to="./update">Create Event</MenuItem>}
        <MenuItem to="./attendance">Attendance</MenuItem>
        <MenuItem to="./settings">Settings</MenuItem>
        <VStack>
        {props.loggedIn ? (
          <Text
            as='b'
            fontSize='md'
            font='sans-serif'
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
        )}
      </VStack>
      </Stack>
    </Box>
  );
}
