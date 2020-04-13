import React from 'react'
import ContainerEditMainPageAdvantages from 'containers/ContainerEditMainPageAdvantages/ContainerEditMainPageAdvantages'
import ContainerEditMainPageCards from 'containers/ContainerEditMainPageCards/ContainerEditMainPageCards'
import Padding from 'components/Padding/Padding'
import ContainerAddMainPageText from 'containers/ContainerAddMainPageText/ContainerAddMainPageText'
import ContainerEditMainPageSlides from 'containers/ContainerEditMainPageSlides/ContainerEditMainPageSlides'

const EditMainPage = () => (
  <>
    <ContainerEditMainPageSlides/>
    <Padding value={40}/>
    <ContainerAddMainPageText/>
    <Padding value={40}/>
    <ContainerEditMainPageAdvantages/>
    <Padding value={40}/>
    <ContainerEditMainPageCards/>
  </>
)
export default EditMainPage
