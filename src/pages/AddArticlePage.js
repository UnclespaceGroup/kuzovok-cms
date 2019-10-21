import React, { useState } from 'react'
import { Field, Form as FinalForm } from 'react-final-form'
import { Container, Form, Button } from 'react-bootstrap'
import { submitArticle, submitWork } from '../axios/work'
import SectionStatus from '../components/SectionStatus/SectionStatus'
import Padding from '../components/Padding/Padding'
import { FAIL } from '../constants/STATUSES'

const AddArticlePage = () => {
  const [ status, setStatus ] = useState(null)
  const [ pending, setPending ] = useState(false)
  const submit = data => {
    setPending(true)
    setStatus(null)
    submitArticle(data)
      .then(res => {
        setStatus(res)
        setPending(false)
      })
      .catch(e => {
        console.log(e)
        setStatus(FAIL)
        setPending(false)
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
            <Button disabled={pending} type="submit">Submit</Button>
          </Form>
        )}
      />
      <Padding value={20} />
      <SectionStatus status={status} />
    </Container>
  )
}
export default AddArticlePage
