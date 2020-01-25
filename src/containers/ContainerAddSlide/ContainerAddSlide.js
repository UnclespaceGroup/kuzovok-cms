import React from 'react'
import { FORM_ADD_WORK } from 'constants/WORK_FIELDS_NAME'
import arrayMutators from 'final-form-arrays'
import { Form, Button } from 'react-bootstrap'
import FormConstructor from 'components/FormConstructor/FormConstructor'
import { fields } from './fields'
import { Form as FinalForm } from 'react-final-form'
import { FAIL, OK } from 'constants/statuses'
import { useLocation } from 'react-router'
import Padding from 'components/Padding/Padding'
import SectionStatus from 'components/SectionStatus/SectionStatus'
import { generateId } from 'services/generateId'
import useHandleAxios from 'hooks/useHandleAxios'
import { METHOD_SLIDES } from 'constants/url'

const IMAGE_FOLDER = 'slides'

const ContainerAddSlide = () => {
  const location = useLocation()

  const prevData = location.state || {}

  const id = prevData.id || generateId(IMAGE_FOLDER)

  const isUpdate = !!prevData.id

  const url = isUpdate ? `${METHOD_SLIDES}update/${id}` : METHOD_SLIDES + 'add'

  const { handleSendData, isError, isSuccess, isPending } = useHandleAxios({ url })

  const imageParams = {
    id,
    categoryName: IMAGE_FOLDER
  }

  return (
    <FinalForm
      form={FORM_ADD_WORK}
      mutators={arrayMutators}
      onSubmit={handleSendData}
      initialValues={{...prevData, id, type: 'mainPage'}}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <h2>Форма добавления слайда</h2>
          <FormConstructor isSingleImage {...imageParams} scheme={fields} />
          <Button disabled={isPending} type="submit">Отправить</Button>
          <Padding value={20} />
          <SectionStatus status={isError ? FAIL : isSuccess ? OK : null} />
        </Form>
      )}
    />
  )
}
export default ContainerAddSlide
