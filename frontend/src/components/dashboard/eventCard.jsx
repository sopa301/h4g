import React from 'react'
import { Card, Image, Stack, CardBody, Heading, Text, CardFooter, Button, Flex, Spacer, Box, Grid} from '@chakra-ui/react'
import { DateTime } from 'luxon';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EventCard({toast, eventId, eventName, eventDate, eventDesc, eventImg,
isAdmin, setMyEvents, setEvents, events, myEvents, onOpen, setForm, setShowEvent}) {

  async function handleForm() {
    await axios.post(import.meta.env.VITE_API_URL + "/form", {
      userId: localStorage.getItem("personId"),
      eventId: eventId
    })
    .then(res => setForm({
      eventName: eventName,
      eventId: eventId,
      prompts: res.data.prompts}))
    .catch(error => console.log(error))
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

  const dt = DateTime.fromISO(eventDate)
  const now = DateTime.now()
  const dtStr = dt.toFormat('dd LLL yyyy hh:mm a')
  const isOver = dt < now

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
          <Box pb='4px'>
            <Heading size='md'>{eventName}</Heading>
              <Flex>
                {isOver && <Text as='b' pr="6px">{`( Event Over )`}</Text>}
                <Text as='i'>{dtStr}</Text>
              </Flex>
          </Box>

          <Text noOfLines={5}>
            {eventDesc}
          </Text>
        </CardBody>

        <CardFooter>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <Button variant='solid' colorScheme='twitter' isDisabled={isOver}
            onClick={() => {
              handleForm();
              setShowEvent(false);
              onOpen();
            }}>
              Sign Up
            </Button>
            {isAdmin && (
              <Button variant='solid' colorScheme='red' onClick={handleDelete}>
                Delete
              </Button>
            )}
            {isAdmin && (
              <Link to={`/eventqr/${eventId}`}>
                <Button variant='solid' colorScheme='orange'>
                  QR Code
                </Button>
              </Link>
            )}
            {isAdmin && (
              <Link to={`/report/${eventId}`}>
                <Button variant='solid' colorScheme='purple'>
                  Report
                </Button>
              </Link>
            )}
          </Grid>
        </CardFooter>
      </Stack>
      </Card>
    </>  
    
  )
}

export default EventCard