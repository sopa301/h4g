import React from 'react'
import { Box } from '@chakra-ui/react'
import UpdateForm from '../components/update/updateForm'

function Update(props) {
  return (
    <>
      <UpdateForm toast={props.toast}/>
    </>
  )
}

export default Update