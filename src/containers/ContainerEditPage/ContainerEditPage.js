import React, { useState, useEffect } from 'react'
import { Form as FinalForm } from 'react-final-form'
import { FORM_ADD_WORK } from 'constants/WORK_FIELDS_NAME'
import arrayMutators from 'final-form-arrays'
import { Form, Button } from 'react-bootstrap'
import FormConstructor from 'components/FormConstructor/FormConstructor'
import { fields } from './fields'
import Padding from 'components/Padding/Padding'
import SectionStatus from 'components/SectionStatus/SectionStatus'
import { FAIL, OK } from 'constants/statuses'
import { axiosApi } from 'axiosFetch'
import useUserStore from 'hooks/useUserStore'
import { useParams } from 'react-router'
import { METHOD_PAGE_EDIT } from 'constants/url'

const ContainerEditPage = () => {
  const { accessString } = useUserStore()
  const [ prevData, setPrevData ] = useState({})
  const [status, setStatus] = useState(null)
  const [pending, setPending] = useState(false)
  const { page } = useParams()

  const instanceAxios =  axiosApi({ accessString })

  const url = METHOD_PAGE_EDIT

  useEffect(() => {
    instanceAxios.get(METHOD_PAGE_EDIT + page )
      .then(response => {
        const { data } = response
        setPrevData(data)
      })
  }, [page])

  const submit = data => {
    instanceAxios.post(url + `update/${page}`, data)
      .then(() => {
        setStatus(OK)
        setPending(false)
        setTimeout(() => {
          setStatus()
        }, 1000)
      })
      .catch(e => {
        console.log(e)
        setStatus(FAIL)
        setPending(false)
      })
  }

  const imageParams = {
    id: page,
    categoryName: 'pages'
  }

  console.log(prevData)

  return (
    <FinalForm
      form={FORM_ADD_WORK}
      mutators={arrayMutators}
      onSubmit={submit}
      initialValues={{ ...prevData }}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <h2>Форма редакирования страницы</h2>
          <FormConstructor isSingleImage {...imageParams} scheme={fields} />
          <Button disabled={pending} type="submit">Отправить</Button>
          <Padding value={20} />
          <SectionStatus status={status} />
        </Form>
      )}
    />
  )
}
export default ContainerEditPage
