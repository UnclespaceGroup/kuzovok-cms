import React from 'react'
import { fields } from './fields'
import { useParams } from 'react-router'
import { METHOD_CARDS } from 'constants/url'
import useAxiosInstance from 'hooks/useAxiosInstance'
import { PAGE_BANNERS } from 'constants/routes'
import ContainerForm from 'containers/ContainerForm/ContainerForm'

const ContainerAddPage = () => {
  const { id } = useParams()

  const { data: prevData } = useAxiosInstance({ url: id ? METHOD_CARDS : undefined, where: { id }, single: true })

  return (
    <ContainerForm
      title={'Редактирование страницы'}
      prevData={prevData}
      fileFolder={'card'}
      backUrl={PAGE_BANNERS}
      fields={fields}
      id={id}
      sendMethod={METHOD_CARDS}
      name={'page'}
    />
  )
}
export default ContainerAddPage
