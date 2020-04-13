import React from 'react'
import { fields } from './fields'
import { METHOD_OTHER_DATA } from 'constants/url'
import useAxiosInstance from 'hooks/useAxiosInstance'
import ContainerForm from 'containers/ContainerForm/ContainerForm'

const ContainerAddMainPageText = () => {
  const id = 'mainPageText'
  const { data } = useAxiosInstance({ url: id ? METHOD_OTHER_DATA : undefined, where: { id }, single: true })

  return (
    <ContainerForm
      title={'Текст на главной странице'}
      name={id}
      id={id}
      sendMethod={METHOD_OTHER_DATA}
      fields={fields}
      prevData={data}
    />
  )
}
export default ContainerAddMainPageText
