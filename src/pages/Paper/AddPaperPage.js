import React from 'react'
import { Container } from 'react-bootstrap'
import ContainerAddPaper from 'containers/ContainerAddPaper/ContainerAddPaper'

const AddPaperPage = () => {
  return (
    <Container style={{ marginTop: '5vh', minHeight: '120vh' }}>
      <ContainerAddPaper />
    </Container>
  )
}
export default AddPaperPage
