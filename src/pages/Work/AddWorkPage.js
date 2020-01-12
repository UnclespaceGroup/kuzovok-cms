import React from 'react'
import { Container } from 'react-bootstrap'
import ContainerWorkAdd from 'containers/ContainerWorkAdd/ContainerWorkAdd'

const AddWorkPage = () => {
  return (
    <Container style={{ marginTop: '5vh', minHeight: '120vh' }}>
      <ContainerWorkAdd />
    </Container>
  )
}
export default AddWorkPage
