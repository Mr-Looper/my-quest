import React, { useContext, useState } from 'react'

import './ListMissions.css'
import { useDispatch } from 'react-redux'
import InfoMission from '../InfoMission/InfoMission'
import { FirebaseContext } from '../../services/firebaseService'
import { useEffect } from 'react'

const ListMissions = (props) => {
  const { missions, filters } = props
  const { api } = useContext(FirebaseContext);
  const dispatch = useDispatch()
  const [listMissions, setListMissions] = useState()
  const handleShowDetails = (index) => {
    // props.callbackShowDetails(index)
    let _list = [...listMissions]
    _list = _list.map((_mission, _index) => {
      if(_index !== index){
        _mission.showDetails = false
      }
      return _mission
    })
    _list[index].showDetails = !!!_list[index].showDetails
    setListMissions(_list)
  }
  const handleChangeStatusMission = (status, mission) => {
    api.updateMission(mission)
    if(mission.type === 'skill_level'){
    }
    if(mission.type === 'class_xp'){
      
    }
    if(mission.type === 'new_skill'){
      const skill = {
        color: mission.skill.color,
        name: mission.skill.name,
        description: mission.skill.description,
        current_xp: 0,
        level: 0,
        class_id: mission.skill_class_id
      }
      api.createSkill(mission)
    }
    if(mission.type === 'title'){
      
    }
    if(mission.type === 'special_title'){
      
    }
    
  }
  useEffect(() => {
    console.log(missions)
    
    setListMissions(missions)
  }, [missions, filters])
  let  list = ''
  if(listMissions && listMissions.length > 0){
    list = listMissions.map((mission, index) => 
    <div className="mission-container" key={index}>
      <div className="nes-container is-dark mission">
        <span className="mission-show-details" onClick={() => {handleShowDetails(index)}}>
          <span className={`icon-show-details ${mission.showDetails? 'open' : ''}`}>{'>'}</span>
        </span>
        <InfoMission mission={mission} showFull={mission.showDetails}></InfoMission>
        {mission.showDetails?
        <div className="mission-details-footer">
          {mission.repeat? 
            <button className="nes-btn is-warning"
            onClick={() => handleChangeStatusMission(2, mission)}>Finish</button>
          :
            <button className="nes-btn is-success"
            onClick={() => handleChangeStatusMission(1, mission)}>Done</button>
          }
          <button className="nes-btn is-error"
            onClick={() => handleChangeStatusMission(3, mission)}>Delete</button>
        </div>
        : ''}
      </div>
    </div>
    )
  }
  return (
    <div className="missions">
      {list}
    </div>
  )

}
export default ListMissions