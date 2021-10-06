import React from 'react'
import styled from 'styled-components'

const TextField = ({ label, name, type, onChange, value }) => {
  return <FormColumnStyle>
    <LabelStyle>{label}</LabelStyle>
    <InputStyle
      type={type}
      value={value}
      name={name}
      onChange={onChange} />
  </FormColumnStyle>
}

const FormColumnStyle = styled.div`
  margin-bottom:10px;
`

const InputStyle = styled.input`
  width:100%;
  padding:8px 10px;
  border:1px solid #c9b6b6;
`

const LabelStyle = styled.label`
  padding-bottom:5px;
  display:block
`

TextField.defaultProps = {
  onChange: () => {},
  type:"text",
  value:"",
  name:"",
  label:""
}

export default TextField;