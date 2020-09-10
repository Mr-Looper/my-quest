import React, { useContext } from 'react'
import './ModalNewSkill.css'
import { useDispatch, connect } from 'react-redux'
import { hideModal } from '../../actions'
import Modal from '../Modal/Modal'
import StepTextReward from '../ModalNewMission/StepTextReward/StepTextReward'
import { useState } from 'react'
import { FirebaseContext } from '../../services/firebaseService'
import SelectorNes from '../SelectorNes/SelectorNes'

const ModalNewSkill = (props) => {
  const { title, layer, skill, update } = props
  const { myClasses } = props.state
  const { api } = useContext(FirebaseContext)
  const [dataSkill, setDataSkill] = useState(skill? skill : { name: '', description: '', color: 'error'})
  const dispatch = useDispatch()
  const handleSetDataSkill = (data) => {
    const _data = {...dataSkill}
    _data.name = data.name
    _data.description = data.description
    _data.color = data.color
    setDataSkill(_data)
  }
  const handleSetDataElementSkill = (element, value) => {
    const _data = {...dataSkill}
    _data[element] = value
    setDataSkill(_data)
  }
  const handleSaveSkill = () => {
    if(update){
      api.updateSkill(dataSkill)
      dispatch(hideModal('MODAL_NEW_SKILL'))
    }else{
      api.createSkill({...dataSkill, current_xp: 0})
      dispatch(hideModal('MODAL_NEW_SKILL'))
    }
  }
  return (
    <div>
      <Modal title={title} layer={layer}
      callbackCloseModal={() => dispatch(hideModal('MODAL_NEW_SKILL'))}
      >
        <div className="body-modal-new-skill">
          <SelectorNes title="Class"
            preselection={dataSkill.class_id}
            callbackSelection={(class_id) => handleSetDataElementSkill('class_id', class_id)}
            options={[{ id: '', name: 'None'}].concat(myClasses)}></SelectorNes> 
          {dataSkill && dataSkill.class_id && 
            myClasses.filter(_class => _class.id === dataSkill.class_id)[0].specialization && 
            myClasses.filter(_class => _class.id === dataSkill.class_id)[0].specialization.length > 0?
            <SelectorNes title="Specialization"
              preselection={dataSkill.subclass_id}
              callbackSelection={(subclass_id) => handleSetDataElementSkill('subclass_id', subclass_id)}
              options={[{ id: '', name: 'None'}].concat(myClasses.filter(_class => _class.id === dataSkill.class_id)[0].specialization)}></SelectorNes>
          : '' }
          <div className="nes-field max-level">
            <label htmlFor="max_level">Max level</label>
            <input type="number" min="0" max="10" id="max_level" className="nes-input is-dark"
            value={dataSkill.max} onChange={(e) => handleSetDataElementSkill('max', e.target.value)}></input>
          </div>
          <div className="nes-field current-level">
            <label htmlFor="current_level">Current level</label>
            <input type="number" min="0" max="10" id="current_level" className="nes-input is-dark"
            value={dataSkill.level} onChange={(e) => handleSetDataElementSkill('level', e.target.value)}></input>
          </div>
          <StepTextReward text="Skill" callbackDataText={(data) => handleSetDataSkill({...data})}
            default
            aditionalInfo=""
            defaultData={dataSkill}>
          </StepTextReward>

        </div>
          <button className="nes-btn is-success next-step" onClick={() => handleSaveSkill()}>Save</button>

      </Modal>
    </div>
  )
}

export default connect(
  (state) => {
    const { myClasses} = state
    return {
      state: { myClasses}
    }
  }
)(ModalNewSkill)