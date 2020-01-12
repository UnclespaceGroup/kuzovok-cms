import React, { useState } from 'react'
import { FORM_ADD_WORK } from 'constants/WORK_FIELDS_NAME'
import arrayMutators from 'final-form-arrays'
import { Form, Button } from 'react-bootstrap'
import FormConstructor from 'components/FormConstructor/FormConstructor'
import { fields } from 'containers/ContainerWorkAdd/fields'
import { Form as FinalForm } from 'react-final-form'
import useUserStore from 'hooks/useUserStore'
import { submitWork } from 'axiosFetch/work'
import { FAIL } from 'constants/statuses'
import { useLocation, useHistory } from 'react-router'
import Padding from 'components/Padding/Padding'
import SectionStatus from 'components/SectionStatus/SectionStatus'
import { generateId } from 'services/generateId'

const ContainerWorkAdd = () => {
  const { accessString } = useUserStore()
  const location = useLocation()
  const history = useHistory()

  const prevData = location.state || {}
  const [status, setStatus] = useState(null)
  const [pending, setPending] = useState(false)

  const id = prevData.id || generateId('work')

  const submit = data => {
    setPending(true)
    setStatus(null)
    submitWork({ data, id, accessString, update: !!prevData.id })
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

  const imageParams = {
    id,
    categoryName: 'works'
  }

  return (
    <FinalForm
      form={FORM_ADD_WORK}
      mutators={arrayMutators}
      onSubmit={submit}
      initialValues={{...prevData, id}}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <h2>Форма добавления работы</h2>
          <FormConstructor isSingleImage {...imageParams} scheme={fields} />
          <Button disabled={pending} type="submit">Отправить</Button>
          <Padding value={20} />
          <SectionStatus status={status} />
        </Form>
      )}
    />
  )
}
export default ContainerWorkAdd
