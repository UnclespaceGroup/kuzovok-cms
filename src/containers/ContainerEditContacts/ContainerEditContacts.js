import React from 'react'
import { FORM_ADD_WORK } from 'constants/WORK_FIELDS_NAME'
import arrayMutators from 'final-form-arrays'
import { Form, Button } from 'react-bootstrap'
import FormConstructor from 'components/FormConstructor/FormConstructor'
import { fields } from './fields'
import Padding from 'components/Padding/Padding'
import SectionStatus from 'components/SectionStatus/SectionStatus'
import { FAIL, OK } from 'constants/statuses'
import { Form as FinalForm } from 'react-final-form'
import useHandleAxios from 'hooks/useHandleAxios'
import { METHOD_CONTACTS } from 'constants/url'
import useAxiosInstance from 'hooks/useAxiosInstance'

const ContainerEditContacts = () => {

  const id = 0

  const url = `${METHOD_CONTACTS}update/${id}`

  const { handleSendData, isError, isSuccess, isPending } = useHandleAxios({ url, backUrl: '/' })

  const { data } = useAxiosInstance({ url: METHOD_CONTACTS, single: true })
  const imageParams = {
    id,
    categoryName: 'contact'
  }
  return (
    <FinalForm
      form={FORM_ADD_WORK}
      mutators={arrayMutators}
      onSubmit={handleSendData}
      initialValues={{ ...data }}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <h2>Форма редактирования контактной информации</h2>
          <FormConstructor isSingleImage {...imageParams} scheme={fields} />
          <Button disabled={isPending} type="submit">Отправить</Button>
          <Padding value={20} />
          <SectionStatus status={isError ? FAIL : isSuccess ? OK : null} />
        </Form>
      )}
    />
  )
}
export default ContainerEditContacts
