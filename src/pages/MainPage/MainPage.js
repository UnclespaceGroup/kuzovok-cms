import React from 'react'
import css from './MainPage.module.scss'
import BgImage from 'components/BgImage/BgImage'
import logo from 'static/colored-logo.png'
import CardAdd from 'components/CardAdd/Card'
import { ADD_SERVICE_PAGE, ADD_WORK_PAGE, WORKS_PAGE, SERVICES_PAGE } from 'constants/routes'
import Padding from 'components/Padding/Padding'
import CardLink from 'components/CardLink/CardLink'

const MainPage = () => {
  return (
    <div className={css.container}>
      <BgImage className={css.img} url={logo} />
      <h2>CMS сайта кузовОК</h2>
      <Padding value={64} />
      <div className={'row-wrap-3'}>
        <CardLink theme={'green'} to={WORKS_PAGE} >Работы</CardLink>
        <CardLink theme={'red'} to={SERVICES_PAGE} >Услуги</CardLink>
        <CardLink theme={'blue'} >Статьи</CardLink>
      </div>
      <Padding value={24} />
      <div className={'row-wrap-3'}>
        <CardAdd to={ADD_WORK_PAGE} text={'Добавить работу'} />
        <CardAdd to={ADD_SERVICE_PAGE} text={'Добавить услугу'} />
        <CardAdd text={'Добавить статью'} />
      </div>
    </div>
  )
}
export default MainPage
