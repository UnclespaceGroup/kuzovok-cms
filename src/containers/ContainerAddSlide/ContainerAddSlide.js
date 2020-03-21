import React from 'react'
import { fields } from './fields'
import { useLocation } from 'react-router'
import { METHOD_SLIDES } from 'constants/url'
import { PAGE_SLIDES } from 'constants/routes'
import ContainerForm from 'containers/ContainerForm/ContainerForm'


const ContainerAddSlide = () => {
  const location = useLocation()
  const prevData = location.state || {}

  return (
    <ContainerForm
      title={'Добавить слайд'}
      name={'slides'}
      fields={fields}
      prevData={prevData}
      backUrl={PAGE_SLIDES}
      sendMethod={METHOD_SLIDES}
    />
  )
}
export default ContainerAddSlide
