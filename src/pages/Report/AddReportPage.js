import React from 'react'
import { Container } from 'react-bootstrap'
import ContainerReportAdd from 'containers/ContainerReportAdd/ContainerReportAdd'

const AddReportPage = () => {
  return (
    <Container style={{ marginTop: '5vh', minHeight: '120vh' }}>
      <ContainerReportAdd />
    </Container>
  )
}
export default AddReportPage
