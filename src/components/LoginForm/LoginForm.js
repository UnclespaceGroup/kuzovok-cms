import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Field, Form as FinalForm } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { login } from '../../axios/login'
import { connect } from 'react-redux'
import css from './LoginForm.module.scss'

const { FORM_LOGIN, FIELD_PASSWORD, FIELD_LOGIN } = require('../../constants/WORK_FIELDS_NAME')

const LoginForm = ({ actionLogin }) => {
  const [status, setStatus] = useState(null)
  const [pending, setPending] = useState(false)
  const submit = data => {
    setPending(true)
    login(data)
      .then(data => {
        setPending(false)
        actionLogin(data)
      })
      .catch(err => {
        console.log(err)
        setPending(false)
      })
    setStatus(null)
  }

  return (
    <FinalForm
      form={FORM_LOGIN}
      mutators={arrayMutators}
      onSubmit={submit}
      initialValues={{}}
      render={({ handleSubmit }) => (
        <Form className={css.container} inline onSubmit={handleSubmit}>
          <Field name={FIELD_LOGIN}>
            {({ input }) => <Form.Control placeholder="Логин" {...input} />}
          </Field>
          <Field name={FIELD_PASSWORD}>
            {({ input }) => <Form.Control placeholder="********" {...input} />}
          </Field>
          <Button disabled={pending} variant="outline-success" type="submit">Войти</Button>
        </Form>
      )}
    />
  )
}

export default connect(
  null
  // dispatch => {
  //   return {
  //     actionLogin: (payload) => dispatch({ type: 'loginUser', payload })
  //   }
  // }
)(LoginForm)
