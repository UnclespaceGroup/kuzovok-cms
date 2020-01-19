import React from 'react'
import { FORM_ADD_WORK } from 'constants/WORK_FIELDS_NAME'
import arrayMutators from 'final-form-arrays'
import { Form, Button } from 'react-bootstrap'
import FormConstructor from 'components/FormConstructor/FormConstructor'
import { fields } from './fields'
import Padding from 'components/Padding/Padding'
import SectionStatus from 'components/SectionStatus/SectionStatus'
import { Form as FinalForm } from 'react-final-form'
import { useLocation } from 'react-router'
import { generateId } from 'services/generateId'
import { METHOD_SERVICE } from 'constants/url'
import useHandleAxios from 'hooks/useHandleAxios'
import { OK, FAIL } from 'constants/statuses'

const ContainerAddService = () => {
  const location = useLocation()
  const prevData = location.state || {}

  const id = prevData.id || generateId('service')
  const isUpdate = prevData.id
  const url = isUpdate ? `${METHOD_SERVICE}update/${id}` : METHOD_SERVICE + 'add'

  const { handleSendData, isSuccess, isError, isPending } = useHandleAxios({ url })

  const imageParams = {
    id,
    categoryName: 'services'
  }

  return (
    <FinalForm
      form={FORM_ADD_WORK}
      mutators={arrayMutators}
      onSubmit={handleSendData}
      initialValues={{...prevData, id}}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <h2>Форма добавления услуги</h2>
          <FormConstructor isSingleImage {...imageParams} scheme={fields} />
          <Button disabled={isPending} type="submit">Отправить</Button>
          <Padding value={20} />
          <SectionStatus status={isError ? FAIL : isSuccess ? OK : null} />
        </Form>
      )}
    />
  )
}
export default ContainerAddService
