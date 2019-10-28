import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Field, Form as FinalForm } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import Padding from '../../components/Padding/Padding'
import SectionStatus from '../../components/SectionStatus/SectionStatus'
import { login } from '../../axios/login'
import { connect } from 'react-redux'
import { JWT, USER_NAME } from '../../constants/OTHER'
import { actionLogin } from '../../actions/actionLogin'

const { FORM_LOGIN, FIELD_PASSWORD, FIELD_LOGIN } = require('../../constants/WORK_FIELDS_NAME')

const Login = ({ actionLogin }) => {
  console.log(actionLogin)
  const [status, setStatus] = useState(null)
  const [pending, setPending] = useState(false)
  const submit = data => {
    setPending(true)
    login(data)
      .then(data => {
        setPending(false)
        console.log(data)
        actionLogin(data)
        localStorage.setItem(JWT, data.token)
        localStorage.setItem(USER_NAME, data.name)
      })
      .catch(err => {
        console.log(err)
        setPending(false)
      })
    setStatus(null)
  }

  return (
    <Container style={{ marginTop: '5vh', minHeight: '120vh' }}>
      <FinalForm
        form={FORM_LOGIN}
        mutators={arrayMutators}
        onSubmit={submit}
        initialValues={{}}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <h2>Форма добавления отчета за день</h2>
            <Form.Group>
              <label>Логин</label>
              <Field name={FIELD_LOGIN}>
                {({ input }) => <Form.Control placeholder="Заголовок" {...input} />}
              </Field>
            </Form.Group>
            <Form.Group>
              <label>Пароль</label>
              <Field name={FIELD_PASSWORD}>
                {({ input }) => <Form.Control placeholder="********" {...input} />}
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

export default connect(
  state => ({}),
  dispatch => {
    return {
      actionLogin: payload => dispatch(() => actionLogin(payload))
    }
  }
)(Login);
