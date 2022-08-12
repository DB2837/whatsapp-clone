import styled from 'styled-components'
import { BsFillEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import { ThemeProps } from '../../../styles/themes'
import React, { useState } from 'react'

type TProps = {
  labelName: string
  labelHTMLFOR: string
  inputName: string
  inputType: string
  placeholder: string
  value: string
  isFocused?: boolean
  isValidInput?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
}

const setInputType = (inputType: string, showPassword: boolean) => {
  if (inputType !== 'password') return inputType

  return showPassword ? 'text' : 'password'
}

const InputBox = ({
  labelName,
  labelHTMLFOR,
  inputName,
  inputType,
  placeholder,
  value,
  isFocused,
  isValidInput,
  onChange,
  onFocus,
  onBlur,
}: TProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleIconClick = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <>
      <Label htmlFor={labelHTMLFOR}>{labelName}</Label>
      <InputWrapper>
        <Input
          type={setInputType(inputType, showPassword)}
          name={inputName}
          placeholder={placeholder}
          value={value}
          isFocused={Boolean(isFocused)}
          isValidInput={Boolean(isValidInput)}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          autoComplete="off"
        />

        {inputType === 'password' && showPassword && (
          <BsFillEyeFill
            onClick={handleIconClick}
            style={{
              cursor: 'pointer',
              position: 'absolute',
              marginLeft: 'auto',
              marginRight: '10px',
              left: 0,
              right: 0,
              textAlign: 'center',
              color: '#12aac5e6',
            }}
          />
        )}

        {inputType === 'password' && !showPassword && (
          <BsEyeSlashFill
            onClick={handleIconClick}
            style={{
              cursor: 'pointer',
              position: 'absolute',
              marginLeft: 'auto',
              marginRight: '10px',
              left: 0,
              right: 0,
              textAlign: 'center',
              color: '#12aac5e6',
            }}
          />
        )}
      </InputWrapper>
    </>
  )
}

export default InputBox

type InputThemeProps = {
  theme: ThemeProps
}

/* const IconsStyle = {
  cursor: 'pointer',
  position: 'absolute',
  marginLeft: 'auto',
  marginRight: '10px',
  left: 0,
  right: 0,
  textAlign: 'center',
} */

const Label = styled.label`
  display: none;
`

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const Input = styled.input<{ isFocused: boolean; isValidInput: boolean }>`
  font-size: inherit;
  width: 100%;
  height: 50px;
  padding: 20px 30px;
  border: none;
  border-radius: 4px;
  color: inherit;
  background-color: ${({ theme }: InputThemeProps) => theme.card};
  border-bottom: ${({ isFocused, isValidInput }) =>
    isFocused && (isValidInput ? '2px solid green' : '2px solid red')};

  &::placeholder {
    color: #8b8b8b;
  }
`
