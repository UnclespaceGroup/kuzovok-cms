import React, { useState } from 'react'
import { Field, Form as FinalForm } from 'react-final-form'
import { Container, Form, Button } from 'react-bootstrap'
import { submitWork } from '../axios'
import SectionStatus from '../components/SectionStatus/SectionStatus'
import Padding from '../components/Padding/Padding'
import { FAIL } from '../constants/STATUSES'
import { withRouter } from 'react-router'
import arrayMutators from 'final-form-arrays'
import InputFile from '../components/InputFile/InputFile'
import InputContent from '../components/InputContent/InputContent'

const AddWorkPage = ({ location }) => {
  const prevData = location.state || {}
  const [ status, setStatus ] = useState(null)
  const [ pending, setPending ] = useState(false)
  const submit = data => {
    setPending(true)
    setStatus(null)
    console.log(data)
    submitWork(data, prevData.id)
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
    <Container style={{marginTop: '5vh'}}>
      <FinalForm
        mutators={arrayMutators}
        onSubmit={submit}
        initialValues={prevData}
        render={({handleSubmit, form: { mutators }}) => (
          <Form onSubmit={handleSubmit}>
            <h2>Форма добавления работы</h2>
            <Form.Group controlId="title">
              <label>Заголовок</label>
              <Field name="title" >
                {({input}) => <Form.Control placeholder="Заголовок" {...input} />}
              </Field>
            </Form.Group>
            <Form.Group controlId="banner">
              <label>Изображение баннера</label>
              <Field name="banner" component={InputFile} />
            </Form.Group>
            <Form.Group controlId="annotation">
              <label>Аннотация</label>
              <Field name="annotation" >
                {({input}) => <Form.Control as="textarea" rows="3"  placeholder="Аннотация" {...input} />}
              </Field>
            </Form.Group>
            <Form.Group controlId="annotation">
              <label>Строки</label>
              <InputContent name={'content'} mutators={mutators} />
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
export default withRouter(AddWorkPage)
