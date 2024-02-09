import React, { useState, useEffect } from 'react';
import { Box, Grid, GridItem, Text, Heading, Button, Input } from '@chakra-ui/react'
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
  const [form, setForm] = useState({
    eventName: '',
    eventId: '',
    prompts: []
  })

  const [responses, setResponses] = useState(Array(form.prompts.length).fill(''))

  // states for modal 
  const { isOpen, onOpen, onClose } = useDisclosure()
  const useToast = props.toast;

  useEffect(() => {
    getAllEvents()
  }, [])

  useEffect(() => {
    getMyEvents()
  }, [])

  useEffect(() => {
    setResponses(Array(form.prompts.length).fill(''))
  }, [form])

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

  async function handleRegisterEvent() {
    await axios.post(import.meta.env.VITE_API_URL + "/registerEvent", {
      userId: localStorage.getItem('personId'),
      eventId: form.eventId,
      responses: responses
    }).then(res => {
      const newMyEvents = [...events].filter(event => event.eventId == form.eventId)[0];
      setMyEvents([...myEvents, newMyEvents]);
      useToast({
        title: "Successful signup",
        description: "Signed up for " + form.eventName, 
        status: 'success',
        duration: 1000,
        isClosable: true
      });
    }).catch(error => {
      if (error.response.data.error === 'user already registered') {
        useToast({
        title: "Unsucessful",
        description: "Already registered: " + form.eventName, 
        status: 'error',
        duration: 1000,
        isClosable: true
      });
      }
      console.log(error)
      
  })
  }

  const handleResponse = (index, value) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  return (
    <Box px={{md:'100px', base:'30px'}} pt="10px">
      <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`Event Name: ` + form.eventName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {form.prompts.length === 0 ? 
            <Text>No Additional Information Required</Text> : form.prompts.map((prompt, ind) => 
            <Box key={ind}>
              <Text fontWeight='bold' mb='1rem'>
                {prompt}
              </Text>
              <Input value={responses[ind]} onChange={e => handleResponse(ind, e.target.value)}/>
            </Box>
            )
            }
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={handleRegisterEvent}>Submit</Button>
            <Button colorScheme='twitter' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
              <RegisterCard key={registerData.eventId} {...registerData} toast={props.toast}
                  myEvents={myEvents} setMyEvents={setMyEvents}/>
            </Box>
            ))} 
          </Box>
        </GridItem>
      </Grid>
    
    </Box>
      
  )
}