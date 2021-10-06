import React from 'react'
import styled from 'styled-components'

const Arrow = ({ rotate }) => <ArrowStyle style={{ transform: rotate ? `rotate(${rotate}deg)` : "rotate(-45deg)" }} />

const ArrowStyle = styled.i`
  border: solid #c5c5c5;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
`

export default Arrow