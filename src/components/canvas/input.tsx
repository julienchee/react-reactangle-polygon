import React, { FC, InputHTMLAttributes } from 'react'

interface  InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
}

const ColorInput: FC<InputProps> = ({name, label, onChange}) => {
  return (
    <div className='input-wrapper'>
      <label htmlFor={name}>{label}</label>
      <input id={name} onChange={onChange} />
    </div>
  )
}

export default ColorInput
