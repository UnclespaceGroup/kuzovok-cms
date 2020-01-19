import React from 'react'
import { Container } from 'react-bootstrap'
import ContainerAddService from 'containers/ContainerAddService/ContainerAddService'

const AddServicePage = () => {
  return (
    <Container style={{ marginTop: '5vh', minHeight: '120vh' }}>
      <ContainerAddService />
    </Container>
  )
}
export default AddServicePage
