import React from 'react'
import ContainerEditMainPageAdvantages from 'containers/ContainerEditMainPageAdvantages/ContainerEditMainPageAdvantages'
import ContainerEditMainPageCards from 'containers/ContainerEditMainPageCards/ContainerEditMainPageCards'
import Padding from 'components/Padding/Padding'

const EditMainPage = () => (
  <>
    <ContainerEditMainPageAdvantages />
    <Padding value={40} />
    <ContainerEditMainPageCards />
  </>
)
export default EditMainPage
