import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Heading } from '@chakra-ui/react';
import axios from 'axios';
import QRCode from "react-qr-code";

function EventQR() {
  const isAdmin = useSelector(state => state.admin.value)
  const { eventId } = useParams(); //get eventId from dynamic route 

  const [hash, setHash] = useState("")
  console.log(eventId)

  useEffect(() => {
    getEventHash()
  }, [])

  console.log(hash)

  const test = "Hello World"

  async function createHash() {
    await axios.post(import.meta.env.VITE_API_URL + "/makeQrCode", {
      userId: localStorage.getItem('personId'),
      eventId: eventId
    }).then(res => console.log(res)).catch(error => console.log(error))
  }

  async function getEventHash()  {
    await axios.post(import.meta.env.VITE_API_URL + "/getQrCode", {
        userId: localStorage.getItem('personId'),
        eventId: eventId
      })
    .then(res => {
      console.log(res.qr)
      setHash(res.data.qr)
    })
    .catch(error => console.log(error))
  }

  return (
    <Box 
      display="flex"
      flexDirection="column"
      alignItems="center">
      <Heading pb='10px'>Event QR Code</Heading>
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "30%", width: "30%" }}
        value={test}
        viewBox={`0 0 256 256`}
        />
    </Box>
  )
}

export default EventQR