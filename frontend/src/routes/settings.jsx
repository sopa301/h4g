import React from 'react'
import { Box } from '@chakra-ui/react'
import SettingsForm from '../components/settings/settingsForm'

function Settings(props) {
  return (
    <>
      <SettingsForm toast={props.toast} />
    </>
  )
}

export default Settings