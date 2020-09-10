import React from 'react';
import { hideModal } from '../../actions'
import './ModalMission.css'

import Modal from '../Modal/Modal'
import { useDispatch } from 'react-redux';
import InfoMission from '../InfoMission/InfoMission';

const ModalMission = (props) => {
  const handleClickSave = (e) => {
    // props.callbackCloseModal()
  }
  const { infoModal, layer } = props;
  const dispatch = useDispatch()
  return (
    <div>
      <Modal layer={layer}>
        <InfoMission mission={infoModal} showFull={true}></InfoMission>
        <div className="dialog-footer">
          {infoModal.configuration && infoModal.configuration.repeat? 
            <button className="nes-btn is-warning"
            onClick={() => handleClickSave()}>Finish</button>
          :
            <button className="nes-btn is-success"
            onClick={() => handleClickSave()}>Done</button>
          }
          <button className="nes-btn is-error"
            onClick={() => handleClickSave()}>Delete</button>
          <button className="nes-btn"
            onClick={() => dispatch(hideModal('MODAL_MISSION'))}>X</button>
        </div>
      </Modal>
    </div>
  )
}
export default ModalMission;