import React from 'react'
import { Container } from 'react-bootstrap'
import ContainerServiceAdd from 'containers/ContainerServiceAdd/ContainerServiceAdd'

const AddServicePage = () => {
  return (
    <Container style={{ marginTop: '5vh', minHeight: '120vh' }}>
      <ContainerServiceAdd />
    </Container>
  )
}
export default AddServicePage
