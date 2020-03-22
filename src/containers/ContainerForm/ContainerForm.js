import React from 'react'
import arrayMutators from 'final-form-arrays'
import { Button, Form } from 'react-bootstrap'
import FormConstructor from 'components/FormConstructor/FormConstructor'
import Padding from 'components/Padding/Padding'
import SectionStatus from 'components/SectionStatus/SectionStatus'
import { FAIL, OK } from 'constants/statuses'
import { Form as FinalForm } from 'react-final-form'
import useHandleAxios from 'hooks/useHandleAxios'
import { generateId } from 'services/generateId'

const ContainerForm = (
  {
    prevData = {},
    name,
    sendMethod,
    fields = [],
    backUrl,
    onBackClick,
    title,
    fileFolder
  }) => {

  const id = prevData.id || generateId(name)
  const isUpdate = prevData && prevData.id
  const url = isUpdate ? `${sendMethod}update/${id}` : sendMethod + 'add'
  console.log(id)
  const { handleSendData, isSuccess, isError, isPending } = useHandleAxios({ url, backUrl, onBackClick })

  return (
    <FinalForm
      form={name}
      mutators={arrayMutators}
      onSubmit={handleSendData}
      initialValues={{ ...prevData, id }}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <h2>{title}</h2>
          <FormConstructor
            id={id}
            fileFolder={fileFolder}
            scheme={fields}/>
          <Button disabled={isPending} type="submit">Отправить</Button>
          <Padding value={20}/>
          <SectionStatus status={isError ? FAIL : isSuccess ? OK : null}/>
        </Form>
      )}
    />
  )
}
export default ContainerForm
