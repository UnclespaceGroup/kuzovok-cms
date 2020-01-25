import React, { useState } from 'react'
import useUserStore from 'hooks/useUserStore'
import { login } from 'axiosFetch/login'
import { Form as FinalForm, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { Form, Button } from 'react-bootstrap'
import css from './PageLogin.module.scss'
import { FIELD_PASSWORD, FIELD_LOGIN } from 'constants/WORK_FIELDS_NAME'
import logo from 'static/colored-logo.png'
import BgImage from 'components/BgImage/BgImage'

const PageLogin = () => {
  const [pending, setPending] = useState(false)
  const { logIn } = useUserStore()

  const submit = data => {
    setPending(true)
    login(data)
      .then(data => {
        setPending(false)
        logIn(data)
      })
      .catch(err => {
        console.log(err)
        setPending(false)
      })
  }

  return (
    <FinalForm
      form={'login'}
      mutators={arrayMutators}
      onSubmit={submit}
      initialValues={{}}
      render={({ handleSubmit }) => (
        <Form className={css.container} inline onSubmit={handleSubmit}>
          <BgImage className={css.logo} url={logo} />
          <h2>Авторизация</h2>
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
export default PageLogin
