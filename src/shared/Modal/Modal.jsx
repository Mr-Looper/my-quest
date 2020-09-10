import React from 'react';
import { useDispatch } from 'react-redux'
import { hideModal } from '../../actions'
import './Modal.css'


const Modal = (props) => {
  const { title, save, close, cancel, layer } = props;
  const style = { zIndex: layer }
  let footer = '', btnSave = '', btnCancel = '', btnClose = ''
  const dispatch = useDispatch()
  const handleClickSave = (e) => {
    props.callbackSaveModal()
  }
  const handleClickCancel = (e) => {
    // props.callbackCloseModal()
  }
  
  if(save){
    btnSave = <button className="nes-btn is-success" onClick={handleClickSave.bind(this)}>{save}</button>
  }
  if(close){
    btnClose = <button className="nes-btn is-default" onClick={() => dispatch(hideModal())}>{close}</button>
  }
  if(cancel){
    btnCancel = <button className="nes-btn is-default" onClick={handleClickCancel.bind(this)}>{cancel}</button>
  }
  if(save || close || cancel){
    footer = <div className="dialog-footer">
      {btnSave}{btnCancel}{btnClose}
    </div>
  }
  return (
    <div className="modal-container open-modal" style={style}>
      <dialog className="nes-dialog is-dark">
        <div className="dialog">
          <p className="title">{title}</p>
          <span className="close-modal" onClick={() => dispatch(hideModal())}><i className="nes-icon close is-small"></i></span>
        </div>
        <div className="dialog-body">
          {props.children}
        </div>
        {footer}
      </dialog>
      </div>
  )
}
export default Modal;