import React from 'react'
import { Form } from 'react-bootstrap'
import css from './InputImage.module.scss'

const InputImage = ({ input }) => {
  return (
    <div>
      { input.value && <img className={css.image} src={input.value} alt={'Не корректная картинка'} />}
      <Form.Control {...input} />
    </div>
  )
}
export default InputImage
