import React, { useState } from 'react'
import { Field, Form as FinalForm } from 'react-final-form'
import { Container, Form, Button } from 'react-bootstrap'
import { submitWork } from '../axios'
import SectionStatus from '../components/SectionStatus/SectionStatus'
import Padding from '../components/Padding/Padding'
import { FAIL } from '../constants/STATUSES'
import { withRouter } from 'react-router'
import arrayMutators from 'final-form-arrays'
import InputEditor from '../components/InputEditor/InputEditor'
import InputImage from '../components/InputImage/InputImage'
import { FIELD_ANNOTATION, FIELD_BANNER, FIELD_STATUS, FIELD_TEXT, FIELD_TITLE } from '../constants/WORK_FIELDS_NAME'

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
    <Container style={{marginTop: '5vh', minHeight: '120vh'}}>
      <FinalForm
        mutators={arrayMutators}
        onSubmit={submit}
        initialValues={prevData}
        render={({handleSubmit}) => (
          <Form onSubmit={handleSubmit}>
            <h2>Форма добавления работы</h2>
            <Form.Group>
              <label>Заголовок</label>
              <Field name={FIELD_TITLE} >
                {({input}) => <Form.Control placeholder="Заголовок" {...input} />}
              </Field>
            </Form.Group>
            <Form.Group>
              <label>Статус</label>
              <Field name={FIELD_STATUS}>
                {({ input }) => <Form.Control {...input} as="select" >
                  <option>В работе</option>
                  <option>Готово</option>
                  <option>Архив</option>
                </Form.Control>}
              </Field>
            </Form.Group>
            <Form.Group>
              <label>Изображение баннера</label>
              <Field name={FIELD_BANNER} component={InputImage} />
            </Form.Group>
            <Form.Group>
              <label>Аннотация</label>
              <Field name={FIELD_ANNOTATION} >
                {({input}) => <Form.Control as="textarea" rows="3"  placeholder="Аннотация" {...input} />}
              </Field>
            </Form.Group>
            <Form.Group>
              <label>Текст</label>
              <Field component={InputEditor} name={FIELD_TEXT} />
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
