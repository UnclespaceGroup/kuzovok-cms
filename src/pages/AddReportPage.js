import React, { useState } from 'react'
import { Field, Form as FinalForm } from 'react-final-form'
import { Container, Form, Button } from 'react-bootstrap'
import SectionStatus from '../components/SectionStatus/SectionStatus'
import Padding from '../components/Padding/Padding'
import { FAIL } from '../constants/STATUSES'
import { withRouter } from 'react-router'
import arrayMutators from 'final-form-arrays'
import InputEditor from '../components/InputEditor/InputEditor'
import { FieldArray } from 'react-final-form-arrays'
import InputImage from '../components/InputImage/InputImage'
import { submitReport } from '../axios/report'

const { FIELD_ANNOTATION, FIELD_TEXT, FIELD_TITLE, FIELD_PARENT_ID, FIELD_IMAGES, FORM_ADD_REPORT } = require('../constants/WORK_FIELDS_NAME')

const AddReportPage = ({ location, history }) => {
  const prevData = location.state || {}
  const [status, setStatus] = useState(null)
  const [pending, setPending] = useState(false)
  const submit = data => {
    setPending(true)
    setStatus(null)
    submitReport(correctData(data), prevData.id)
      .then(res => {
        setStatus(res)
        setTimeout(() => {
          history.goBack()
        }, 1000)
        setPending(false)
      })
      .catch(e => {
        console.log(e)
        setStatus(FAIL)
        setPending(false)
      })
  }
  const correctData = (data) => ({
    ...data,
    [FIELD_IMAGES]: JSON.stringify(data[FIELD_IMAGES]),
    [FIELD_PARENT_ID]: prevData.parentId
  })
  return (
    <Container style={{ marginTop: '5vh', minHeight: '120vh' }}>
      <FinalForm
        form={FORM_ADD_REPORT}
        mutators={arrayMutators}
        onSubmit={submit}
        initialValues={{
          ...prevData,
          images: prevData.images && JSON.parse(prevData.images)
        }}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <h2>Форма добавления отчета за день</h2>
            <Form.Group>
              <label>Заголовок</label>
              <Field name={FIELD_TITLE}>
                {({ input }) => <Form.Control placeholder="Заголовок" {...input} />}
              </Field>
            </Form.Group>
            <Form.Group>
              <label>Картинки</label>
              <FieldArray name={FIELD_IMAGES}>
                {({ fields }) =>
                  <div>
                    {
                      fields.map((item, key) => (
                        <Field key={key}
                               name={`${item}`}
                               component={InputImage}
                               remove={() => { fields.pop(key) }}
                        />
                      ))
                    }
                    <Button onClick={() => { fields.push(undefined) }}>Добавить</Button>
                  </div>
                }
              </FieldArray>
            </Form.Group>
            <Form.Group>
              <label>Аннотация</label>
              <Field name={FIELD_ANNOTATION}>
                {({ input }) => <Form.Control as="textarea" rows="3" placeholder="Аннотация" {...input} />}
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
export default withRouter(AddReportPage)
