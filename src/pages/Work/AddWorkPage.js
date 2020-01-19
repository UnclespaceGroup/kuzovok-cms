import React from 'react'
import { Container } from 'react-bootstrap'
import ContainerAddWork from 'containers/ContainerAddWork/ContainerAddWork'

const AddWorkPage = () => {
  return (
    <Container style={{ marginTop: '5vh', minHeight: '120vh' }}>
      <ContainerAddWork />
    </Container>
  )
}
export default AddWorkPage
