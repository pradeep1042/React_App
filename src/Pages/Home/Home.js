import React, { useState } from 'react'
import Table from '../../Components/Table';
import CheckBox from '../../Components/Checkbox';
import { v4 as uuidv4 } from 'uuid';
import Arrow from '../../Components/Arrow';
import Button from '../../Components/Button';
import { useTable } from '../../reducer';
import styled from 'styled-components';
import { DELETE_TABLE_DATA, SET_ACTIVE, UPDATE_TABLE_DATA } from '../../Utils/types';
import Modal from '../../Components/Modal';
import TextField from '../../Components/input';

const treeArray = (items, id = null) =>
  items
    .filter(item => item["parentId"] === id)
    .map(item => ({ ...item, children: treeArray(items, item.id) }));


const ParentNode = ({ row, handlerToggle, handlerCheck, selectedRow, paddingValue }) => {
  const padding = paddingValue || 0
  return row.map(column => <div className="test" key={uuidv4()}>
    <ChildNode column={column} paddingValue={padding} handlerToggle={handlerToggle} handlerCheck={handlerCheck} selectedRow={selectedRow} />
  </div>)
}

const ChildNode = ({ column, paddingValue, handlerToggle, handlerCheck, selectedRow }) => {
  return <>
    <Table.Row>
      <Table.Cell>{column.account && <CheckBox checked={selectedRow === column.id} onChange={() => handlerCheck(column)} />}</Table.Cell>
      <Table.Cell style={{ paddingLeft: paddingValue,Width:'30%' }}>{column.children.length > 0 && <Button type={"stripped"} onClick={() => handlerToggle(column.id, column.isOpened)}><Arrow rotate={45} /></Button>}{column.description}</Table.Cell>
      <Table.Cell>{column.account}</Table.Cell>
      <Table.Cell>{column.createdOn}</Table.Cell>
      <Table.Cell>{column.createdBy}</Table.Cell>
      <Table.Cell>{column.currency}</Table.Cell>
    </Table.Row>
    {(column.children && column.children.length > 0) && column.isOpened === 1 && <ParentNode row={column.children} paddingValue={paddingValue + 20} handlerToggle={handlerToggle} handlerCheck={handlerCheck} selectedRow={selectedRow} />}
  </>
}

function Home() {
  const { store, dispatch } = useTable()
  const [selectedRowData, setSelectedRowData] = useState({})
  const [open, setOpen] = useState(false);
  const [inputFields, setInputFields] = useState({
    name: "",
    account: "",
    createdOn: "",
    createdBy: "",
    currency: ""
  })

  const [columns] = useState([
    { name: 'Description' },
    { name: 'Account' },
    { name: 'Created On' },
    { name: 'Created By' },
    { name: 'Currency' },
  ])

  const handlerCheck = (data) => {
    if (selectedRowData.id === data.id) {
      setSelectedRowData({})
    } else {
      setSelectedRowData(data)
    }
  }

  const handlerToggle = (id, status) => {
    dispatch({ type: SET_ACTIVE, id, status: (!status || status === 0) ? 1 : 0 })
  }

  const handlerDelete = () => {
    dispatch({ type: DELETE_TABLE_DATA, id: selectedRowData })
  }

  const handlerUpdate = () => {
    setInputFields(selectedRowData)
    setOpen(true)
  }

  const handlerInputChange = (e) => {
    setInputFields({
      ...inputFields,
      [e.target.name]: e.target.value
    })
  }

  const handlerSubmit = () => {
    dispatch({ type: UPDATE_TABLE_DATA, data: inputFields, id: selectedRowData.id })
    setOpen(false)
  }

  return (
    <>
      <PageStyle>
        <ButtonListStyle>
          <Button disabled={Object.keys(selectedRowData).length === 0} onClick={() => handlerUpdate()}>Update</Button>
          <Button disabled={Object.keys(selectedRowData).length === 0} onClick={() => handlerDelete()}>Delete</Button>
        </ButtonListStyle>
        <Table>
          <Table.Row>
            <Table.HeaderCell />
            {columns.map((column) => <Table.HeaderCell key={uuidv4()}>{column.name}</Table.HeaderCell>)}
          </Table.Row>
          <ParentNode
            row={treeArray(store)}
            handlerCheck={handlerCheck}
            handlerToggle={handlerToggle}
            selectedRow={selectedRowData.id} />
        </Table>
      </PageStyle>
      {open &&
        <Modal handleClose={() => setOpen(false)}>
          <ColumnStyle>
            <TextField label={"Description"} value={inputFields.description} onChange={handlerInputChange} name="description" />
            <TextField label={"Account"} value={inputFields.account} onChange={handlerInputChange} name="account" />
            <TextField label={"Created on"} value={inputFields.createdOn} onChange={handlerInputChange} name="createdOn" type="date" />
            <TextField label={"Created by"} value={inputFields.createdBy} onChange={handlerInputChange} name="createdBy" />
            <TextField label={"Currency"} value={inputFields.currency} onChange={handlerInputChange} name="currency" />
          </ColumnStyle>
          <Button onClick={handlerSubmit}>Submit</Button>
        </Modal>}
    </>
  );
}

const PageStyle = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 30px;  
`;

const ColumnStyle = styled.div`
  padding-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  margin:0 -5px;
  > div {
    flex:0 0 50%;
    max-width:50%;
    padding:0 5px;
  }
`

const ButtonListStyle = styled.div`
  display:flex;
  width: 100%;
  justify-content: flex-end;
  margin-bottom:10px;
  button {
    margin-left:10px;
  }
`

export default Home;
