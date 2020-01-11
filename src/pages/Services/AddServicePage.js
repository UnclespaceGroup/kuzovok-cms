import React, { useState } from 'react'
import { Field, Form as FinalForm } from 'react-final-form'
import { Container, Form, Button } from 'react-bootstrap'
import SectionStatus from '../../components/SectionStatus/SectionStatus'
import Padding from '../../components/Padding/Padding'
import { FAIL } from 'constants/statuses'
import { withRouter } from 'react-router'
import arrayMutators from 'final-form-arrays'
import InputEditor from '../../components/InputEditor/InputEditor'
import InputImage from '../../components/InputImage/InputImage'
import { submitService } from '../../axiosFetch/service'
import { FIELD_TAGS } from '../../constants/WORK_FIELDS_NAME'

import { FIELD_ANNOTATION, FIELD_TEXT, FIELD_TITLE, FIELD_BANNER, FORM_ADD_REPORT } from '../../constants/WORK_FIELDS_NAME'
import useUserStore from '../../hooks/useUserStore'

const AddServicePage = ({ location, history }) => {
  const { accessString } = useUserStore()

  const prevData = location.state || {}
  const [status, setStatus] = useState(null)
  const [pending, setPending] = useState(false)
  const submit = data => {
    setPending(true)
    setStatus(null)
    submitService({ data, id: prevData.id, accessString})
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
            <h2>Форма добавления услуги</h2>
            <Form.Group>
              <label>Заголовок</label>
              <Field name={FIELD_TITLE}>
                {({ input }) => <Form.Control placeholder="Заголовок" {...input} />}
              </Field>
            </Form.Group>
            <Form.Group>
              <label>Главный баннер</label>
              <Field name={FIELD_BANNER}
                     component={InputImage}
              />
            </Form.Group>
            <Form.Group>
              <label>Аннотация</label>
              <Field name={FIELD_ANNOTATION}>
                {({ input }) => <Form.Control as="textarea" rows="3" placeholder="Аннотация" {...input} />}
              </Field>
            </Form.Group>
            <Form.Group>
              <label>Теги</label>
              <Field name={FIELD_TAGS}>
                {({ input }) => <Form.Control as="textarea" rows="1" placeholder="#покраска" {...input} />}
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
export default withRouter(AddServicePage)
