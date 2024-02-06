import React from 'react'
import { Card, Image, Stack, CardBody, Heading, Text, CardFooter, Button, Flex, Spacer, Box} from '@chakra-ui/react'
import moment from 'moment';

function EventCard({eventName, eventDate, eventDesc, eventImg}) {
  return (
    <Card
    direction={{ base: 'column', sm: 'row' }}
    overflow='hidden'
    variant='outline'
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
        <Button variant='solid' colorScheme='blue'>
          Sign Up
        </Button>
      </CardFooter>
    </Stack>
    </Card>
  )
}

export default EventCard