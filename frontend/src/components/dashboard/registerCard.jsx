import React from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Stack, Heading, Text, StackDivider, Box, Button } from '@chakra-ui/react'
import axios from 'axios'

function RegisterCard({toast, eventId, eventName, eventDate, eventDesc, myEvents, setMyEvents}) {

  async function handleLeave() {
    await axios.post(import.meta.env.VITE_API_URL + "/leaveEvent", {
      userId: localStorage.getItem("personId"),
      eventId: eventId
    })
    .then(res => {
      setMyEvents([...myEvents].filter(event => event.eventId !== eventId));
      toast({
        title: "Successful leave",
        description: "Left event: " + eventName, 
        status: 'success',
        duration: 1000,
        isClosable: true
      })
    })
    .catch(error => console.log(error))
  }

  return (
    <Card 
    direction={{ base: 'column', sm: 'row' }}
    overflow='hidden' 
    variant='outline' 
    shadow='md'>
      <CardBody>
        <Stack divider={<StackDivider />} spacing='2' pb="8px">
          <Box>
            <Heading size='md'>{eventName}</Heading>
            <Text pt='2' fontSize='sm'>
              {eventDate}
            </Text>
          </Box>
          <Box>
            <Text pt='2' fontSize='sm'>
              {eventDesc}
            </Text>
          </Box>
        </Stack>
        <Button colorScheme='red' onClick={handleLeave}>
            Leave
        </Button>
      </CardBody>
    </Card>
  )
}

export default RegisterCard