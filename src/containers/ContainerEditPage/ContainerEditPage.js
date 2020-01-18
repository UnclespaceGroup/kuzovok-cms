import React, { useState, useMemo } from 'react'
import { Form as FinalForm } from 'react-final-form'
import { FORM_ADD_WORK } from 'constants/WORK_FIELDS_NAME'
import arrayMutators from 'final-form-arrays'
import { Form, Button } from 'react-bootstrap'
import FormConstructor from 'components/FormConstructor/FormConstructor'
import { fields } from './fields'
import Padding from 'components/Padding/Padding'
import SectionStatus from 'components/SectionStatus/SectionStatus'
import { FAIL, OK } from 'constants/statuses'
import { useParams } from 'react-router'
import { METHOD_PAGE_EDIT } from 'constants/url'
import useHandleAxios from 'hooks/useHandleAxios'
import useAxiosInstance from 'hooks/useAxiosInstance'

const ContainerEditPage = () => {
  const { id: page } = useParams()

  const { handleSendData, isPending, isSuccess, isError } = useHandleAxios({ url: METHOD_PAGE_EDIT + `update/${page}` })
  const { data: prevData } = useAxiosInstance({ url: METHOD_PAGE_EDIT, where: { id: page }, single: true }, [page])


  const imageParams = {
    id: page,
    categoryName: 'pages'
  }

  return (
    <FinalForm
      form={FORM_ADD_WORK}
      mutators={arrayMutators}
      onSubmit={handleSendData}
      initialValues={{ ...prevData }}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <h2>Форма редакирования страницы</h2>
          <FormConstructor isSingleImage {...imageParams} scheme={fields} />
          <Button disabled={isPending} type="submit">Отправить</Button>
          <Padding value={20} />
          <SectionStatus status={isSuccess ? OK : isError ? FAIL : null} />
        </Form>
      )}
    />
  )
}
export default ContainerEditPage
