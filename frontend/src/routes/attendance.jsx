import React from 'react'
import QRCodeScanner from '../components/attendance/QRCodeScanner'
import { Heading, useBreakpointValue } from '@chakra-ui/react'
import { Text, Box } from '@chakra-ui/react';

function Attendance() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <div>
      { isMobile ? (
        <Box padding="10px">
          <Heading pb="10px" textAlign="center">Scan QRCode:</Heading>
          <QRCodeScanner/> 
        </Box>
      ) : 
      <Heading textAlign="center" pt="20px">Please Switch to Phone Device</Heading>
      }
    </div>
  )
}

export default Attendance