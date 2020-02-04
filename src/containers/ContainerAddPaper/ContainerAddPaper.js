import React from 'react'
import { useLocation } from 'react-router'
import { generateId } from 'services/generateId'
import { METHOD_PAPER } from 'constants/url'
import { FAIL, OK } from 'constants/statuses'
import { Form as FinalForm } from 'react-final-form'
import { FORM_ADD_WORK } from 'constants/WORK_FIELDS_NAME'
import arrayMutators from 'final-form-arrays'
import { Form, Button } from 'react-bootstrap'
import FormConstructor from 'components/FormConstructor/FormConstructor'
import { fields } from './fields'
import Padding from 'components/Padding/Padding'
import SectionStatus from 'components/SectionStatus/SectionStatus'
import useHandleAxios from 'hooks/useHandleAxios'

const ContainerAddPaper = () => {
  const location = useLocation()

  const prevData = location.state || {}

  const id = prevData.id || generateId('paper')

  const isUpdate = prevData.id

  const url = isUpdate ? `${METHOD_PAPER}update/${id}` : METHOD_PAPER + 'add'

  const { isError, isSuccess, isPending, handleSendData } = useHandleAxios({ url })

  const imageParams = {
    id,
    categoryName: 'paper'
  }

  return (
    <FinalForm
      form={FORM_ADD_WORK}
      mutators={arrayMutators}
      onSubmit={handleSendData}
      initialValues={{ ...prevData, id }}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <h2>Форма добавления Статьи</h2>
          <FormConstructor isSingleImage {...imageParams} scheme={fields} />
          <Button disabled={isPending} type="submit">Отправить</Button>
          <Padding value={20} />
          <SectionStatus status={isSuccess ? OK : isError ? FAIL : null} />
        </Form>
      )}
    />
  )
}
export default ContainerAddPaper
