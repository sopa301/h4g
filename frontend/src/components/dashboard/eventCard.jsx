import React from 'react'
import { Card, Image, Stack, CardBody, Heading, Text, CardFooter, Button, Flex, Spacer, Box} from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import moment from 'moment';
import axios from 'axios';

function EventCard({toast, eventId, eventName, eventDate, eventDesc, eventImg,
isAdmin, setMyEvents, setEvents, events, myEvents, onOpen, setSignUp, setForm}) {

  async function handleForm() {
    await axios.post(import.meta.env.VITE_API_URL + "/form", {
      userId: localStorage.getItem("personId"),
      eventId: eventId
    })
    .then(res => setForm({
      eventName: eventName, 
      prompts: res.data.prompts}))
    .catch(error => console.log(error))
  }

  // handler to submit signup 
  function handleRegister() {
    axios.post(import.meta.env.VITE_API_URL + "/registerEvent", 
      {
        userId: localStorage.getItem("personId"),
        eventId: eventId,
      }
    ).then(res => setMyEvent([])).catch(error => console.log(error))
  }

  function handleSignUp() {
    setSignUp(eventId)
  }

  // Updates both dashboard when event deleted
  function handleDelete() {
    axios.delete(import.meta.env.VITE_API_URL + "/event", {
      data: {
        userId: localStorage.getItem("personId"),
        eventId: eventId,
      }
    }).then(res => {
      setMyEvents([...myEvents].filter(eventData => eventData.eventId !== eventId));
      setEvents([...events].filter(eventData => eventData.eventId !== eventId));
      toast({
        title: "Successful delete",
        description: "Event deleted", 
        status: 'success',
        duration: 1000,
        isClosable: true
      })
      
      })
      .catch(error => console.log(error))
  }

  return (
  <>
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
          <Text as='i'>{moment(eventDate, "DD-MM-YYYY hh:mm a").format('DD MMM YYYY hh:mm a')}</Text>
        </Flex>

        <Text noOfLines={5}>
          {eventDesc}
        </Text>
      </CardBody>

      <CardFooter>
        <Box display='flex' justifyContent='space-between' width="175px">
          <Button variant='solid' colorScheme='twitter' onClick={() => {
            handleForm();
            onOpen();
            }}>
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
  </>  
    
  )
}

export default EventCard