import React from 'react'
import { Container } from 'react-bootstrap'
import ContainerWorkAdd from 'containers/ContainerWorkAdd/ContainerWorkAdd'

const AddWorkPage = () => {
  return (
    <Container style={{ marginTop: '5vh', minHeight: '120vh' }}>
      <ContainerWorkAdd />
      <form action="http://localhost:3002/upload" method="post" encType="multipart/form-data">
        <label>Файл</label><br />
        <input type="file" name="filedata" /><br /><br />
        <input type="submit" value="Send" />
      </form>
    </Container>
  )
}
export default AddWorkPage
