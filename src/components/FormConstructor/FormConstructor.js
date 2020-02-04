import React from 'react'
import _ from 'lodash'
import { Form } from 'react-bootstrap'
import { Field } from 'react-final-form'
import InputEditor from '../InputEditor/InputEditor'
import InputFile from 'components/InputFile/InputFile'
import Select from 'components/Select/Select'

const FormConstructor = ({ scheme, ...props }) =>
  _.map(scheme,
    ({
       type,
       label,
       placeholder,
       name,
       options = [],
       text,
       defaultValue,
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
          <Form.Text className="text-muted">
            {text}
          </Form.Text>
        </Form.Group>
      }
      if (type === 'editor') {
        return <Form.Group key={key}>
          <label>{label}</label>
          <Field component={InputEditor} {...props} {...others}  name={name} />
          <Form.Text className="text-muted">
            {text}
          </Form.Text>
        </Form.Group>
      }
      if (type === 'textarea') {
        return <Form.Group key={key}>
          <label>{label}</label>
          <Field name={name}>
            {({ input }) => <Form.Control as="textarea" rows="3" placeholder={placeholder} {...input} />}
          </Field>
          <Form.Text className="text-muted">
            {text}
          </Form.Text>
        </Form.Group>
      }
      if (type === 'select') {
        return <Form.Group key={key}>
          <label>{label}</label>
          <Field name={name}
                 component={Select}
                 placeholder={placeholder}
                 options={options}
          />
          <Form.Text className="text-muted">
            {text}
          </Form.Text>
        </Form.Group>
      }
      if (type === 'image') {
        return <Form.Group key={key}>
          <label>{label}</label>
          <Field name={name} component={InputFile} {...props} {...others} />
          <Form.Text className="text-muted">
            {text}
          </Form.Text>
        </Form.Group>
      }
      if (type === 'checkbox') {
        return <Form.Group key={key}>
          <Field name={name} type="checkbox">
          {({ input }) => <Form.Check
            {...input}
            label={label}
          />}
          </Field>
          <Form.Text className="text-muted">
            {text}
          </Form.Text>
        </Form.Group>
      }
    })

export default React.memo(FormConstructor)
