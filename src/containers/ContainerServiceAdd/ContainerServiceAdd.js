import React, { useState } from 'react'
import { FORM_ADD_WORK } from 'constants/WORK_FIELDS_NAME'
import arrayMutators from 'final-form-arrays'
import { Form, Button } from 'react-bootstrap'
import FormConstructor from 'components/FormConstructor/FormConstructor'
import { fields } from './fields'
import Padding from 'components/Padding/Padding'
import SectionStatus from 'components/SectionStatus/SectionStatus'
import { Form as FinalForm } from 'react-final-form'
import useUserStore from 'hooks/useUserStore'
import { useLocation, useHistory } from 'react-router'
import { generateId } from 'services/generateId'
import { FAIL } from 'constants/statuses'
import { axiosApi } from 'axiosFetch'
import { METHOD_SERVICE, DELETE_IMAGE_FOLDER_URL } from 'constants/url'

const ContainerServiceAdd = () => {
  const { accessString } = useUserStore()
  const location = useLocation()
  const history = useHistory()

  const prevData = location.state || {}
  const [status, setStatus] = useState(null)
  const [pending, setPending] = useState(false)

  const id = prevData.id || generateId('service')

  const instanceAxios =  axiosApi({ accessString })

  const submit = data => {
    setPending(true)
    setStatus(null)

    const isUpdate = prevData.id

    const url = isUpdate ? `${METHOD_SERVICE}update/${id}` : METHOD_SERVICE + 'add'

    instanceAxios.post(url, data)
      .then(res => {
        setStatus(res)
        setTimeout(() => {
          history.goBack()
        }, 1000)
        setPending(false)
      })
      .catch(e => {
        console.log(e)
        !isUpdate && deleteFolderWhereFail()
        setStatus(FAIL)
        setPending(false)
      })
  }

  const imageParams = {
    id,
    categoryName: 'services'
  }

  const deleteFolderWhereFail = () => {
    instanceAxios.post(DELETE_IMAGE_FOLDER_URL, { ...imageParams })
      .then(res => {
        console.log(res)
      })
      .catch(e => console.log(e))
  }

  return (
    <FinalForm
      form={FORM_ADD_WORK}
      mutators={arrayMutators}
      onSubmit={submit}
      initialValues={{...prevData, id}}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <h2>Форма добавления услуги</h2>
          <FormConstructor isSingleImage {...imageParams} scheme={fields} />
          <Button disabled={pending} type="submit">Отправить</Button>
          <Padding value={20} />
          <SectionStatus status={status} />
        </Form>
      )}
    />
  )
}
export default ContainerServiceAdd