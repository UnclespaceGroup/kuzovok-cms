import React from 'react'
import { useLocation } from 'react-router'
import { METHOD_CARDS } from 'constants/url'
import { fields } from './fields'
import { EDIT_MAIN_PAGE } from 'constants/routes'
import ContainerForm from 'containers/ContainerForm/ContainerForm'

const ContainerAddAdvantagesMain = () => {
  const location = useLocation()
  const prevData = location.state || {
    type: 'advantagesCard'
  }

  return (
    <ContainerForm
      title={'Добавление преимущества на главной'}
      name={'advantages'}
      fileFolder={'card'}
      backUrl={EDIT_MAIN_PAGE}
      prevData={prevData}
      fields={fields}
      sendMethod={METHOD_CARDS}
    />
  )
}
export default ContainerAddAdvantagesMain
