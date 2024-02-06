import React from 'react'
import { Card, Image, Stack, CardBody, Heading, Text, CardFooter, Button, Flex, Spacer, Box, StatUpArrow} from '@chakra-ui/react'
import axios from 'axios';

function EventCard({toast, eventId, eventName, eventDate, eventDesc, eventImg, isAdmin, setMyEvent, setEvents}) {
  // handler to submit signup 
  function handleRegister() {
    axios.post(import.meta.env.VITE_API_URL + "/registerEvent", 
      {
        userId: localStorage.getItem("personId"),
        eventId: eventId,
      }
    ).then(res => setMyEvent([])).catch(error => console.log(error))
  }

  function handleDelete() {
    axios.delete(import.meta.env.VITE_API_URL + "/event", {
      data: {
        userId: localStorage.getItem("personId"),
        eventId: eventId,
      }
    }).then(res => setEvents([])).catch(error => console.log(error))
  }

  return (
    <Card
    direction={{ base: 'column', sm: 'row' }}
    overflow='hidden'
    variant='outline'
    shadow='md'
  >
    <Image
      objectFit='cover'
      maxW={{ base: '100%', sm: '200px' }}
      src={eventImg}
      alt='Caffe Latte'
    />
    <Stack>
      <CardBody>
        <Flex pb='4px'>
          <Heading size='md'>{eventName}</Heading>
          <Spacer/>
          <Text as='i'>{eventDate}</Text>
        </Flex>

        <Text noOfLines={5}>
          {eventDesc}
        </Text>
      </CardBody>

      <CardFooter>
        <Box display='flex' justifyContent='space-between' width="175px">
          <Button variant='solid' colorScheme='blue' onClick={handleRegister}>
            Sign Up
          </Button>
          {isAdmin ? 
          <Button variant='solid' colorScheme='red' onClick={handleDelete}>
            Delete
          </Button>: <></> }
        </Box>
          
        
      </CardFooter>
    </Stack>
    </Card>
  )
}

export default EventCard