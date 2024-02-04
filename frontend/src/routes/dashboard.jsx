import React, { useState, useEffect } from 'react';
import { Box, Grid, GridItem, Text, Heading } from '@chakra-ui/react'
import EventCard from '../components/dashboard/eventCard';
import axios from 'axios';



export default function Dashboard(props) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    axios.post(import.meta.env.VITE_API_URL + "/event").then(res => setEvents(res)).catch(error => console.log(error))
  };

  const fakeData = [{
    eventId: 1,
    eventName: "Flea Market",
    eventDate: "01-05-2022",
    eventDesc: "In celebration of International Domestic Workers Day, ADEO is organising Flea Market with A Heart - a mon of our migrant domestic workers! Big At Heart is supporting it by owning the flea market items collection & management, zumba demo, snacks distribution etc",
    eventImg: "https://static.wixstatic.com/media/014c07_1f3bdd43f1b5454fb96ffb90ea68bfdc~mv2.png/v1/fill/w_1414,h_2000,al_c,q_95,enc_auto/014c07_1f3bdd43f1b5454fb96ffb90ea68bfdc~mv2.png" 
  }, {
    eventId: 2,
    eventName: "Flea Market",
    eventDate: "01-05-2022",
    eventDesc: "Raise money for the foreign workers dhiuehfeuahfiehifhhduiahda",
    eventImg: "https://static.wixstatic.com/media/f6709c_85b670d34f7249dcb6dfb926ae50a589~mv2.jpeg/v1/fill/w_1062,h_1502,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/WhatsApp%20Image%202022-06-10%20at%206_44_03%20PM.jpeg" 
  },];

  return (
    <Box px={{md:'100px', base:'30px'}} pt="10px">
      <Grid templateColumns={{md:'repeat(2, 1fr)', sm: 'repeat(1, 1fr)'}} gap={4}>
        <GridItem bg="pink">
          <Heading pb='10px'>Upcoming activities</Heading>
          {fakeData.map(eventData => (
            <Box key={eventData.eventId} pb="8px">
              <EventCard key={eventData.eventId} {...eventData}/>
            </Box>
          ))}
        </GridItem>
        <GridItem bg="green">
          <Heading pb='10px'>Events you signed up</Heading>
          <Text>{`No upcoming events :(`}</Text>
        </GridItem>
      </Grid>
    
    </Box>
      
  )
}