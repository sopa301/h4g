import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, Input } from '@chakra-ui/react';
import { Heading, Button, Flex, Box, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from '../ToastContext';

function Report() {
  const [report, setReport] = useState({
    eventName: "",
    prompts: [], 
    attendees: [], 
  })
  const [updateHours, setUpdateHours] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    getAttendees()
  }, [])

  const { eventId } = useParams()

  async function getAttendees() {
    await axios.post(import.meta.env.VITE_API_URL + "/getAttendance", {
      userId: localStorage.getItem('personId'),
      eventId: eventId
    })
    .then(res => {
      console.log(res.data)
      setReport({
        eventName: res.data.eventName,
        prompts: res.data.prompts,
        attendees: res.data.attendees
      })
      
      const data = res.data.attendees.map(({userId, username, hours}) => (
        {userId: userId, username: username, hours: hours}
      ));
      setUpdateHours(data)
    })
    .catch(error => console.log(error))
  }

  async function handleHours() {
    const update = updateHours.map(({userId, hours}) => ({userId: userId , hours: hours}))
    console.log(update)

    await axios.post(import.meta.env.VITE_API_URL + "/updateHours", {
      eventId: eventId,
      hourUpdate: update,
    })
    .then(res => {
      toast({
        title: "Successful",
        description: "Hours Updated", 
        status: 'success',
        duration: 1000,
        isClosable: true
      })
    })
    .catch(error => console.log(error))
  }


  const handleHoursChange = (ind, hours) => {
    const newHours = [...updateHours]
    newHours.filter(attendee =>
    attendee.username.toLowerCase().includes(searchQuery.toLowerCase())
    )[ind].hours = parseInt(hours)
    setUpdateHours(newHours)
  }

  console.log(updateHours)

  const filteredAttendees = report.attendees.filter(attendee =>
    attendee.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filterUpdateHours = updateHours.filter(attendee =>
    attendee.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box mx={2}>
      <Flex mb={4}>
        <Input
          flex="1"
          placeholder="Search by username"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <Button ml={4} colorScheme="twitter" onClick={handleHours}>
          Send all attendance
        </Button>
      </Flex>
      <Flex pb={4}>
        <Text as="strong" pr={4}>Prompts:</Text>
        {report.prompts.map((q, key) => <Text key={key} pr="8px">{`${key + 1}: ${q}`}</Text>)}
      </Flex>
      {
        report.attendees.length !== 0 ? 
        (<Table variant="striped" colorScheme='blackAlpha'>
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Age</Th>
              <Th>Responses</Th>
              <Th>Attendance</Th>
              <Th>Hours</Th>
              <Th>Feedback</Th>
            </Tr>
          </Thead>
          <Tbody>
          {filteredAttendees.map((attendee, index) => (
            <Tr key={index}>
              <Td width="100px">{attendee.username}</Td>
              <Td width="80px">{attendee.age}</Td>
              <Td>{attendee.responses.join(', ')}</Td>
              <Td width="80px">{attendee.attendance ? 'Present' : 'Absent'}</Td>
              <Td width="100px">
                <Input type="number" value={filterUpdateHours[index].hours} onChange={e => handleHoursChange(index, e.target.value)} isReadOnly={!attendee.attendance}/>
              </Td>
              <Td>{attendee.feedback}</Td>
            </Tr>
          ))}
          </Tbody>
        </Table>) : <Heading textAlign='center'>No Attendees</Heading>
      }
    </Box>
  );
}

export default Report