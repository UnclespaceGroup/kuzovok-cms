import React from 'react'

const InputFile = ({ input }) => {
  const onChange = (e) => {
    const file = e.target.files[0]
    input.onChange(file)
  }
  return (
    <input
      type={'file'}
      onChange={onChange}
    />
  )
}
export default InputFile
