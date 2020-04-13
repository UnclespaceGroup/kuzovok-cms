import React from 'react'
import { fields } from './fields'
import { useHistory, useLocation } from 'react-router'
import { METHOD_SLIDES } from 'constants/url'
import ContainerForm from 'containers/ContainerForm/ContainerForm'


const ContainerAddSlide = () => {
  const location = useLocation()
  const prevData = location.state || {}
  const history = useHistory()

  return (
    <ContainerForm
      title={'Добавить слайд'}
      name={'slides'}
      fields={fields}
      onBackClick={() => history.pop()}
      fileFolder={'slide'}
      prevData={prevData}
      sendMethod={METHOD_SLIDES}
    />
  )
}
export default ContainerAddSlide
