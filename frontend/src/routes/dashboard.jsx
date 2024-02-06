import React, { useState, useEffect } from 'react';
import { Box, Grid, GridItem, Text, Heading } from '@chakra-ui/react'
import EventCard from '../components/dashboard/eventCard';
import RegisterCard from '../components/dashboard/registerCard';
import { useSelector, useDispatch } from 'react-redux'
import { updateAdmin } from '.././features/admin/adminSlice'
import axios from 'axios';


export default function Dashboard(props) {
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  useEffect(() => {
    getAllEvents()
  }, [events])

  useEffect(() => {
    getMyEvents()
  }, [myEvents])

  const isAdmin = useSelector(state => state.admin.value) // this is to get the global state from redux

  function getAllEvents() {
    axios.post(import.meta.env.VITE_API_URL + "/getEvents", {userId: localStorage.getItem('personId')})
    .then(res => {
      setEvents(res.data.events)
    })
    .catch(error => console.log(error))
  }

  function getMyEvents() {
    axios.post(import.meta.env.VITE_API_URL + "/getMyEvents", {userId: localStorage.getItem('personId')})
    .then(res => setMyEvents(res.data.events))
    .catch(error => console.log(error))
  }

  return (
    <Box px={{md:'100px', base:'30px'}} pt="10px">
      <Grid templateColumns={{md:'repeat(2, 1fr)', sm: 'repeat(1, 1fr)'}} gap={4}>
        <GridItem>
          <Heading pb='10px'>Upcoming activities</Heading>
          <Box maxHeight={{ md:'600px', lg: '800px'}} overflowY='auto'>
          {events.map(eventData => (
            <Box key={eventData.eventId} pb="12px">
              <EventCard key={eventData.eventId} {...eventData} toast={props.toast} 
              isAdmin={isAdmin} 
              setMyEvents={setMyEvents}
              setEvents={setEvents}/>
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