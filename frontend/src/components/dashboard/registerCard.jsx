import React from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Stack, Heading, Text, StackDivider, Box } from '@chakra-ui/react'

function RegisterCard({toast, eventId, eventName, eventDate, eventDesc}) {
  return (
    <Card 
    direction={{ base: 'column', sm: 'row' }}
    overflow='hidden' 
    variant='outline' 
    shadow='md'>
      <CardBody>
        <Stack divider={<StackDivider />} spacing='2'>
          <Box>
            <Heading size='md'>{eventName}</Heading>
            <Text pt='2' fontSize='sm'>
              {eventDate}
            </Text>
          </Box>
          <Box>
            <Text pt='2' fontSize='sm'>
              {eventDesc}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default RegisterCard