import React from 'react'
import _ from 'lodash'
import { Form } from 'react-bootstrap'
import { Field } from 'react-final-form'
import InputEditor from '../InputEditor/InputEditor'
import InputFile from 'components/InputFile/InputFile'

const FormConstructor = ({ scheme, ...props }) =>
  _.map(scheme,
    ({
       type,
       label,
       placeholder,
       name,
       options = [],
      ...others
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
        console.log(others)
        return <Form.Group key={key}>
          <label>{label}</label>
          <Field name={name} component={InputFile} {...props} {...others} />
        </Form.Group>
      }
    })

export default React.memo(FormConstructor)
