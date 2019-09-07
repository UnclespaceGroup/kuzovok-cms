import React from 'react'
import { Field, Form as FinalForm } from 'react-final-form'
import { Container, Form, Button } from 'react-bootstrap'
import axios from 'axios'

const MainPage = () => {
  const submit = data => {
    axios.defaults.baseURL = 'http://localhost:3002/';
    axios.defaults.headers.post['Content-Type'] ='application/json';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.post(`http://localhost:3002/work/`, data)
      .then(res => {
        console.log(res)
      })
  }
  return (
    <Container style={{marginTop: '20vh'}}>
      <FinalForm
        onSubmit={submit}
        render={({handleSubmit}) => (
          <Form onSubmit={handleSubmit}>
            <h2>Форма добавления работы</h2>
            <Form.Group controlId="title">
              <label>Заголовок</label>
              <Field name="title" >
                {({input}) => <Form.Control placeholder="Заголовок" {...input} />}
              </Field>
            </Form.Group>
            <Form.Group controlId="annotation">
              <label>Аннотация</label>
              <Field name="annotation" >
                {({input}) => <Form.Control as="textarea" rows="3"  placeholder="Аннотация" {...input} />}
              </Field>
            </Form.Group>
            <Form.Group controlId="text">
              <label>Текст</label>
              <Field name="text" >
                {({input}) => <Form.Control as="textarea" rows="3"  placeholder="Текст" {...input} />}
              </Field>
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        )}
      />
    </Container>
  )
}
export default MainPage
