import React, { useState } from 'react'
import { FORM_ADD_WORK } from 'constants/WORK_FIELDS_NAME'
import arrayMutators from 'final-form-arrays'
import { Form, Button } from 'react-bootstrap'
import FormConstructor from 'components/FormConstructor/FormConstructor'
import { fields } from 'pages/Work/fields'
import { Form as FinalForm, Field } from 'react-final-form'
import useUserStore from 'hooks/useUserStore'
import { submitWork } from 'axiosFetch/work'
import { FAIL } from 'constants/STATUSES'
import { useLocation, useHistory } from 'react-router'
import Padding from 'components/Padding/Padding'
import SectionStatus from 'components/SectionStatus/SectionStatus'
import InputFile from 'components/InputFile/InputFile'

const ContainerWorkAdd = () => {
  const { accessString } = useUserStore()
  const location = useLocation()
  const history = useHistory()

  const prevData = location.state || {}
  const [status, setStatus] = useState(null)
  const [pending, setPending] = useState(false)

  const submit = data => {
    setPending(true)
    setStatus(null)
    submitWork({ data, id: prevData.id, accessString })
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
    <FinalForm
      form={FORM_ADD_WORK}
      mutators={arrayMutators}
      onSubmit={submit}
      initialValues={prevData}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <h2>Форма добавления работы</h2>
          <Field name={'file'} type={'file'} accessString={accessString} component={InputFile} />
          <FormConstructor scheme={fields} />
          <Button disabled={pending} type="submit">Отправить</Button>
          <Padding value={20} />
          <SectionStatus status={status} />
        </Form>
      )}
    />
  )
}
export default ContainerWorkAdd
