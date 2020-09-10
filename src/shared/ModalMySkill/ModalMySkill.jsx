import React, { useState, useEffect } from 'react'
import Modal from '../Modal/Modal'
import { useDispatch, connect } from 'react-redux'
import { hideModal, showModal } from '../../actions'
import ListMissions from '../ListMissions/ListMissions'

const _showClassById = (id, list) => {
  const index = list.findIndex(_class => _class.id === id)
  return index !== -1 ?
    <span className={`nes-text is-${list[index].color}`}>{list[index].name}</span> :
    <span className={`nes-text is-default`}>Not assigned</span>
}

const _showSubclassById = (idClass, idSubclass, list) => {
  const indexClass = list.findIndex(_class => _class.id === idClass)
  if(indexClass !== -1){
    const indexSubclass = list[indexClass].specialization.findIndex(_spec => _spec.id === idSubclass)
    return indexSubclass !== -1 ?
    <span className={`nes-text is-${list[indexClass].specialization[indexSubclass].color}`}>{list[indexClass].specialization[indexSubclass].name}</span> :
    <span className={`nes-text is-default`}>Not assigned</span>
  }else{
    return <span className={`nes-text is-default`}>Not assigned</span>
  }
}
const ModalMySkill = (props) => {
  const { layer, skill, state } = props
  const { myClasses, myMissions } = state
  let [listMissions, setListMissions] = useState([])
  const dispatch = useDispatch()
  const handleModifySkill = () => {
    dispatch(hideModal('MODAL_MY_SKILL'))
    setTimeout(() => dispatch(showModal('MODAL_NEW_SKILL', { skill: skill, title: 'Modify skill', update: true })), 0)
  }
  const handleShowDetails = (position) => {
    const list = listMissions.filter((mission, index) => {
      if(index !== position){
        mission.showDetails = false
      }
      return mission
    })
    list[position].showDetails = !list[position].showDetails
    setListMissions(list)
  }
  useEffect(() => {
    if (myMissions) {
      const list = myMissions.filter(_mission => {
        return !!_mission.skill && _mission.skill.id.findIndex(_skillId => {
          return _skillId === skill.id
        }) !== -1
      })
      setListMissions(list)
    }
  }, [myMissions, skill.id])
  
  return (
    <div>
      <Modal  layer={layer}
      callbackCloseModal={() => dispatch(hideModal('MODAL_MY_SKILL'))}>
        <p className={`nes-text-forced is-${skill.color}`}>{skill.name} (Lvl. {skill.level}/{skill.max})</p>
        <div>
          <div>{skill.description || 'No description'}</div><br></br>
          <div>Class: { _showClassById(skill.class_id, myClasses) }</div>
          <div>Specialization: { _showSubclassById(skill.class_id, skill.subclass_id, myClasses) }</div>
          
          <button className="nes-btn is-primary next-step" onClick={() => handleModifySkill()}>Modify</button>
            {listMissions && listMissions.length > 0?
            <div>
              <div className="separator-dashed"></div>
              <p className="title">Current missions</p>
              <ListMissions missions={listMissions} callbackShowDetails={(position) => handleShowDetails(position)}/>
            </div>
            : ''}
        </div>
      </Modal>
    </div>
  )
}

export default connect(
  (state) => {
    const { myClasses, myMissions } = state;
    return {
      state: { myClasses, myMissions }
    };
  },
)(ModalMySkill)