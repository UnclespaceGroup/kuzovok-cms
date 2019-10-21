import React from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import css from './InputImage.module.scss'
import Padding from '../Padding/Padding'

const InputImage = ({ input, remove }) => {
  return (
    <div className={css.container}>
      <div>{ input.value && <img className={css.image} src={input.value} alt={'Не корректная картинка'} />}</div>

      <InputGroup className="mb-3">
        <Form.Control {...input} />
        <InputGroup.Prepend>
          <Button variant={'danger'} onClick={() => { remove() }} >Удалить картинку</Button>
        </InputGroup.Prepend>
      </InputGroup>
      <Padding value={10} />
    </div>
  )
}
export default InputImage
