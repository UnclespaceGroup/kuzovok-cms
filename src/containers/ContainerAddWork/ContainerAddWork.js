import React from 'react'
import { fields } from 'containers/ContainerAddWork/fields'
import { useParams } from 'react-router'
import { METHOD_WORK } from 'constants/url'
import { WORKS_PAGE } from 'constants/routes'
import useAxiosInstance from 'hooks/useAxiosInstance'
import ContainerForm from 'containers/ContainerForm/ContainerForm'
import { getLoadDataByIdUrl } from 'services/getLoadDataByIdUrl'

const ContainerAddWork = () => {
  const { id } = useParams()
  const url = getLoadDataByIdUrl(METHOD_WORK, id)

  const { data } = useAxiosInstance({ url, single: true, where: { id } })

  return (
    <ContainerForm
      title={'Редактирование машины в ремонте'}
      name={'works'}
      prevData={data}
      fileFolder={'works'}
      backUrl={WORKS_PAGE}
      fields={fields}
      sendMethod={METHOD_WORK}
    />
  )
}
export default ContainerAddWork
