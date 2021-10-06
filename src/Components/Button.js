import React from 'react'
import styled from 'styled-components';

const Button = ({ children, type = "primary", disabled, onClick = () => {} }) => <ButtonStyle disabled={disabled} className={type} onClick={onClick}>{children}</ButtonStyle>

const ButtonStyle = styled.button`
  border:none;
  cursor:pointer;
  &.primary {
    background-color:#d18c8c;
    font-size:10px;
    padding:5px 15px;
    text-transform:uppercase;
    font-weight:bold;
    min-width:50px;
  }
  &.stripped {
    background-color:transparent;
  }
  &:disabled {
    background-color:#f3e8e8;
  }
`

export default Button;