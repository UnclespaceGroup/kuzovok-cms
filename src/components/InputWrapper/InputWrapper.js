import React from 'react'
import { Form } from 'react-bootstrap'

const InputWrapper = (
  {
    children,
    label,
    text
  }) => (
  <Form.Group>
    <label>{label}</label>
    {children}
    <Form.Text className="text-muted">
      {text}
    </Form.Text>
  </Form.Group>
)
export default InputWrapper
