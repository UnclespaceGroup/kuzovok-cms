import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import css from './InputContent.module.scss'
import { buttons } from './types'
import { FieldArray } from 'react-final-form-arrays'
import { Field } from 'react-final-form'

const InputContent = ({ name, mutators }) => {
  const [ params, setParams ] = useState({})
  return (
    <div className={css.container}>

      <FieldArray name={name} >
        {({fields}) => console.log(fields) ||
          <div>
            { fields.value && <div className={css.view} dangerouslySetInnerHTML={{ __html: fields.value.join('') }} />}
            {fields.map((item, key) => (
              <Field
                key={key}
                name={item}
              >
                {({ input, ...props }) => {
                  const { text, tag } = params[input.name]
                  return (
                  <InputGroup className={css.input} >
                    <InputGroup.Prepend>
                      <InputGroup.Text>{text}</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      name={input.name}
                      onChange={e => {
                        input.onChange(`<${tag}>${e.target.value}</${tag}>`)
                      }}
                      as="textarea" rows="3"  placeholder="Введите" />
                    <div className={css.delete}>X</div>
                  </InputGroup>
                  )}}
              </Field>
            ))}
            <div className={css.buttons}>
              {
                buttons.map((item, key) =>
                  <Button key={key}
                          variant={item.variant}
                          onClick={() => {
                            setParams({...params, [`content[${fields.length || 0}]`]: item })
                            fields.push(undefined)
                          }}
                  >{item.text}</Button>
                )
              }
            </div>
          </div>
        }
      </FieldArray>
    </div>
  )
}

export default InputContent
