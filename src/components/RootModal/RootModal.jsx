import React from 'react'
import { connect } from 'react-redux'
import ModalMyClass from '../../shared/ModalMyClass/ModalMyClass'
import ModalNewClass from '../../shared/ModalNewClass/ModalNewClass'
import ModalNewMission from '../../shared/ModalNewMission/ModalNewMission'
import ModalNewSkill from '../../shared/ModalNewSkill/ModalNewSkill'
import ModalMySkill from '../../shared/ModalMySkill/ModalMySkill'

const baseLayer = 1000;
const MODAL_COMPONENTS = {
  'MODAL_MY_CLASS': ModalMyClass,
  // 'MODAL_MISSION': ModalMission,
  'MODAL_NEW_CLASS': ModalNewClass,
  'MODAL_NEW_MISSION': ModalNewMission,
  'MODAL_NEW_SKILL': ModalNewSkill,
  'MODAL_MY_SKILL': ModalMySkill
}
let currentModals = []

const ModalRoot = ({ modalType, modalProps, action }) => {
  if(action === 'SHOW'){
    console.log(modalProps)
    modalProps.key = currentModals.length
    modalProps.layer = currentModals.length + baseLayer
    currentModals = currentModals.concat({ modalType, modalProps })
  }else{
    currentModals.pop()
  }

  const listModals = currentModals.map((modal, index) => {
    return React.createElement(MODAL_COMPONENTS[modal.modalType], {...modal.modalProps})
  })

  return (listModals)
}

export default connect(state => state.modal)(ModalRoot)