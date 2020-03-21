import React from 'react'
import { fields } from './fields'
import { METHOD_OTHER_DATA } from 'constants/url'
import useAxiosInstance from 'hooks/useAxiosInstance'
import ContainerForm from 'containers/ContainerForm/ContainerForm'

const ContainerAddStationPhotos = () => {
  const id = 'stationPhotos'
  const { data } = useAxiosInstance({ url: METHOD_OTHER_DATA, where: { id }, single: true })

  return (
    <ContainerForm
      title={'Фото станции'}
      name={id}
      sendMethod={METHOD_OTHER_DATA}
      fields={fields}
      backUrl={'/'}
      prevData={data}
    />
  )
}
export default ContainerAddStationPhotos
