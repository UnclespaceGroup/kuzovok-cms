import React from 'react'
import _ from 'lodash'
import { Button, Form } from 'react-bootstrap'
import { Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import InputEditor from '../InputEditor/InputEditor'
import InputImage from '../InputImage/InputImage'

const FormConstructor = ({ scheme }) =>
  _.map(scheme,
    ({
       type,
       label,
       placeholder,
       name,
       options = []
     },
     key) => {
      if (type === 'text') {
        return <Form.Group key={key}>
          <label>{label}</label>
          <Field name={name}>
            {({ input }) => <Form.Control
              placeholder={placeholder} {...input} />}
          </Field>
        </Form.Group>
      }
      if (type === 'editor') {
        return <Form.Group key={key}>
          <label>{label}</label>
          <Field component={InputEditor} name={name} />
        </Form.Group>
      }
      if (type === 'textarea') {
        return <Form.Group key={key}>
          <label>{label}</label>
          <Field name={name}>
            {({ input }) => <Form.Control as="textarea" rows="3" placeholder={placeholder} {...input} />}
          </Field>
        </Form.Group>
      }
      if (type === 'select') {
        return <Form.Group key={key}>
          <label>{label}</label>
          <Field name={name}>
            {({ input }) => <Form.Control {...input} as="select">
              {
                options.map(({ id, title }, key) => (
                  <option key={key} value={id}>{title}</option>
                ))
              }
            </Form.Control>}
          </Field>
        </Form.Group>
      }
      if (type === 'image') {
        return <Form.Group key={key}>
          <label>{label}</label>
          <Field name={name} component={InputImage} />
        </Form.Group>
      }
      if (type === 'imagesList') {
        return <Form.Group key={key}>
          <label>{label}</label>
          <FieldArray name={name}>
            {({ fields }) =>
              <div>
                {
                  fields.map((item, key) => (
                    <Field key={key}
                           name={`${item}`}
                           component={InputImage}
                           remove={() => { fields.pop(key) }}
                    />
                  ))
                }
                <Button onClick={() => { fields.push(undefined) }}>Добавить</Button>
              </div>
            }
          </FieldArray>
        </Form.Group>
      }
    })

export default React.memo(FormConstructor)
