import React, { useState, useEffect } from 'react';
import { Box, Grid, GridItem, Text, Heading, Button } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import EventCard from '../components/dashboard/eventCard';
import RegisterCard from '../components/dashboard/registerCard';
import { useSelector, useDispatch } from 'react-redux'
import { updateAdmin } from '.././features/admin/adminSlice'
import { useDisclosure } from '@chakra-ui/react';
import axios from 'axios';


export default function Dashboard(props) {
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [signUp, setSignUp] = useState("") //state to check which signup prompts to render
  const [signEvent, setSignEvent] = useState()
  const [form, setForm] = useState({
    eventName: "",
    prompts: []
  })

  // states for modal 
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    getAllEvents()
  }, [])

  useEffect(() => {
    getMyEvents()
  }, [])

  // set state to current event user wants to sign up
  useEffect(() => {
    const newEvent = [...events].filter(eventData => eventData.eventId === signUp)[0]
    if (newEvent === undefined) {
      setSignEvent()
    } else { 
      setSignEvent(newEvent)
    }
  }, [events, signUp])


  const isAdmin = useSelector(state => state.admin.value) // this is to get the global state from redux

  async function getAllEvents() {
    await axios.post(import.meta.env.VITE_API_URL + "/getEvents", {userId: localStorage.getItem('personId')})
    .then(res => {
      setEvents(res.data.events)
    })
    .catch(error => console.log(error))
  }

  async function getMyEvents() {
    await axios.post(import.meta.env.VITE_API_URL + "/getMyEvents", {userId: localStorage.getItem('personId')})
    .then(res => setMyEvents(res.data.events))
    .catch(error => console.log(error))
  }

  return (
    <Box px={{md:'100px', base:'30px'}} pt="10px">
      {signEvent !== undefined ? (
      <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`Event Name: ` + form.eventName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {form.prompts.length === 0 ? 
            <Text>No Additional Information Required</Text> : form.prompts.map((prompt, key) => 
            <Text fontWeight='bold' mb='1rem' key={key}>
              {prompt}
            </Text>)
            }
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' mr={3}>Submit</Button>
            <Button colorScheme='twitter' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>) 
      : <></>
      }

      <Grid templateColumns={{md:'repeat(2, 1fr)', sm: 'repeat(1, 1fr)'}} gap={4}>
        <GridItem>
          <Heading pb='10px'>Upcoming activities</Heading>
          <Box maxHeight={{ md:'580px', lg: '600px', xl:'800px'}} overflowY='auto'>
          {events.map(eventData => (
            <Box key={eventData.eventId} pb="12px">
              <EventCard key={eventData.eventId} {...eventData} toast={props.toast} 
              isAdmin={isAdmin} 
              setMyEvents={setMyEvents}
              setEvents={setEvents}
              events={events}
              myEvents={myEvents}
              onOpen={onOpen}
              setSignUp={setSignUp}
              setForm = {setForm}/>
            </Box>
          ))}
          </Box>
        </GridItem>
        <GridItem>
          <Heading pb='10px'>Events you signed up</Heading>
          <Box maxHeight={{ md:'600px', lg: '800px'}} overflowY='auto'>
            {myEvents.length == 0 
            ? <Text fontSize='lg'>{`No Events :(`}</Text>
            : myEvents.map(registerData => (
            <Box key={registerData.eventId} pb="12px">
              <RegisterCard key={registerData.eventId} {...registerData} toast={props.toast}/>
            </Box>
            ))} 
          </Box>
        </GridItem>
      </Grid>
    
    </Box>
      
  )
}