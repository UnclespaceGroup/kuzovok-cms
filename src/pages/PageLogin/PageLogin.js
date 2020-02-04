import React, { useState } from 'react'
import useUserStore from 'hooks/useUserStore'
import { Form as FinalForm, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { Form, Button } from 'react-bootstrap'
import css from './PageLogin.module.scss'
import logo from 'static/colored-logo.png'
import BgImage from 'components/BgImage/BgImage'
import { axiosInstance } from 'axiosFetch/index'

const PageLogin = () => {
  const [pending, setPending] = useState(false)
  const { logIn } = useUserStore()


  const submit = data => {
    setPending(true)
    axiosInstance.post('/login', data)
      .then(res => {
        console.log(res.data)
        setPending(false)
        logIn(res.data)
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
          <Field name={'username'}>
            {({ input }) => <Form.Control placeholder="Логин" {...input} />}
          </Field>
          <Field name={'password'}>
            {({ input }) => <Form.Control placeholder="*****" type={'password'} {...input} />}
          </Field>
          <Button disabled={pending} variant="outline-success" type="submit">Войти</Button>
        </Form>
      )}
    />
  )
}
export default PageLogin
