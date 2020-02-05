import React from 'react'
import { useLocation } from 'react-router'
import { generateId } from 'services/generateId'
import { METHOD_ADVANTAGES_MAIN } from 'constants/url'
import useHandleAxios from 'hooks/useHandleAxios'
import { Form as FinalForm } from 'react-final-form'
import { FORM_ADD_WORK } from 'constants/WORK_FIELDS_NAME'
import arrayMutators from 'final-form-arrays'
import { Form, Button } from 'react-bootstrap'
import FormConstructor from 'components/FormConstructor/FormConstructor'
import { fields } from './fields'
import Padding from 'components/Padding/Padding'
import SectionStatus from 'components/SectionStatus/SectionStatus'
import { FAIL, OK } from 'constants/statuses'
import { EDIT_MAIN_PAGE } from 'constants/routes'

const ContainerAddAdvantagesMain = () => {
  const location = useLocation()
  const prevData = location.state || {}

  const id = prevData.id || generateId('advantages')
  const isUpdate = prevData.id
  const url = isUpdate ? `${METHOD_ADVANTAGES_MAIN}update/${id}` : METHOD_ADVANTAGES_MAIN + 'add'

  const { handleSendData, isSuccess, isError, isPending } = useHandleAxios({ url, backUrl: EDIT_MAIN_PAGE })

  const imageParams = {
    id,
    categoryName: 'advantages'
  }

  return (
    <FinalForm
      form={FORM_ADD_WORK}
      mutators={arrayMutators}
      onSubmit={handleSendData}
      initialValues={{...prevData, id}}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <h2>Форма добавления преимущества главной</h2>
          <FormConstructor isSingleImage {...imageParams} scheme={fields} />
          <Button disabled={isPending} type="submit">Отправить</Button>
          <Padding value={20} />
          <SectionStatus status={isError ? FAIL : isSuccess ? OK : null} />
        </Form>
      )}
    />
  )
}
export default ContainerAddAdvantagesMain
