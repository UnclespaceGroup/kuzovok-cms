import React from 'react'
import css from './MainPage.module.scss'
import BgImage from 'components/BgImage/BgImage'
import logo from 'static/colored-logo.png'

const MainPage = () => {
  return (
    <div className={css.container}>
      <BgImage className={css.img} url={logo} />
      <h2>CMS сайта кузовОК</h2>
    </div>
  )
}
export default MainPage
