import React from 'react'
import _ from 'lodash'
import { Form } from 'react-bootstrap'
import { Field } from 'react-final-form'
import InputEditor from '../InputEditor/InputEditor'
import InputFile from 'components/InputFile/InputFile'
import Select from 'components/Select/Select'
import InputWrapper from 'components/InputWrapper/InputWrapper'

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
        return (
          <InputWrapper key={key} label={label} text={text}>
            <Field name={name}>
              {({ input }) => <Form.Control
                placeholder={placeholder} {...input} />}
            </Field>
          </InputWrapper>
        )
      }
      if (type === 'editor') {
        return (
          <InputWrapper key={key} label={label} text={text}>
            <Field component={InputEditor} {...props} {...others} name={name}/>
          </InputWrapper>)
      }
      if (type === 'textarea') {
        return (
          <InputWrapper key={key} label={label} text={text}>
            <Field name={name}>
              {({ input }) => <Form.Control as="textarea" rows="3" placeholder={placeholder} {...input} />}
            </Field>
          </InputWrapper>
        )
      }
      if (type === 'select') {
        return (
          <InputWrapper key={key} label={label} text={text}>
            <Field name={name}
                   component={Select}
                   placeholder={placeholder}
                   options={options}
            />
          </InputWrapper>)
      }
      if (type === 'image') {
        return (
          <InputWrapper key={key} label={label} text={text}>
            <Field name={name} component={InputFile} {...props} {...others} />
          </InputWrapper>)
      }
      if (type === 'checkbox') {
        return (
          <InputWrapper key={key} label={label} text={text}>
            <Field name={name} type="checkbox">
              {({ input }) => <Form.Check
                {...input}
                label={label}
              />}
            </Field>
          </InputWrapper>)
      }
    })

export default React.memo(FormConstructor)
