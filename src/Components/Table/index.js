import React from 'react'
import styled from 'styled-components'

const Table = (props) => {
  return <TableStyle>{props.children}</TableStyle>
}

Table.Row = ({children}) => <RowStyle>{children}</RowStyle>
Table.HeaderCell = ({children}) => <TableHeaderStyle>{children}</TableHeaderStyle>
Table.Body = ({children}) => <tbody>{children}</tbody>
Table.Cell = ({children, style}) => <TableCellStyle><div style={style}>{children}</div></TableCellStyle>

const TableStyle = styled.div`
  width:100%;
`

const RowStyle = styled.div`
  display:flex;
  width:100%;
`

const TableHeaderStyle = styled.div`
  border:1px solid #c5c5c5;
  background-color:#f6f4f4;
  padding:8px 10px;
  text-align:left;
  font-size:11px;
  font-weight:600;
  flex:1;
  &:first-child {
    flex:0 0 35px;
    max-width:35px;
  }
  &:nth-child(2) {
    flex:0 0 350px;
    max-width:350px;
  }
`

const TableCellStyle = styled.div`
  flex:1;
  border-left:1px solid #c5c5c5;
  border-bottom:1px solid #c5c5c5;
  &:last-child {
    border-right:1px solid #c5c5c5;
  }
  padding:5px 10px;
  &:first-child {
    flex:0 0 35px;
    max-width:35px;
  }
  &:nth-child(2) {
    flex:0 0 350px;
    max-width:350px;
  }
  &:nth-child(3) {
    color:#0b45d1f0;
  }
`


export default Table;