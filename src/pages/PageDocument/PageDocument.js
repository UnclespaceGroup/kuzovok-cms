import React from 'react'
import css from './PageDocument.module.scss'

const PageDocument = () => {
  return (
    <div className={css.container}>
      <h1>
        Документация
      </h1>
      Для ознакомления с документацией нажмите ниже
      <br />
      <a className={css.link} target={'_blank'} href={'https://docs.google.com/document/d/1oHW83yFZC540jx_KNEYdrAqsqqoDbvBHFox1ySks9f4/edit?usp=sharing'} >Как пользоваться</a>
    </div>
  )
}
export default PageDocument
