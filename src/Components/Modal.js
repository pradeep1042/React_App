import React from 'react'
import styled from 'styled-components';
import Button from './Button';

const Modal = (props) => {
  return <ModalContainer>
    <ModalContent>
      <ModalHeader>
        <Button onClick={props.handleClose}>Close</Button>
      </ModalHeader>
      <ModalContentInner>
        {props.children}
      </ModalContentInner>
    </ModalContent>
  </ModalContainer>
}

const ModalContainer = styled.div`
  position:fixed;
  background-color:rgba(0, 0, 0, 0.1);
  left:0;
  top:0;
  right:0;
  bottom:0;
  padding:20px;
`

const ModalContent = styled.div`
  background-color:white;
  width:600px;
  margin:0 auto;
`
const ModalContentInner = styled.div`
  padding:20px;
`
const ModalHeader = styled.div`
  padding:10px 20px;
  border-bottom:1px solid #e9e2e2;
  width:100%;
  display:flex;
  justify-content:flex-end;
`

export default Modal;