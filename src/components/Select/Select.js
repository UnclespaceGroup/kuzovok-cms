import React, { useEffect } from 'react'
import ReactSelect from 'react-select'

const Select = ({ options, input = {} }) => {
  const value = options.find(item => item.value === input.value) || options[0]
  useEffect(() => {
    input.onChange(options[0].value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <ReactSelect
      options={options}
      value={value}
      onChange={({ value }) => {
        input.onChange(value)
      }}

    />
  )
}
export default Select
