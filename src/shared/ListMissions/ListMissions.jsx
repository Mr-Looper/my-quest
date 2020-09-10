import React, { useContext } from 'react'

import './ListMissions.css'
import { useDispatch } from 'react-redux'
import InfoMission from '../InfoMission/InfoMission'
import { FirebaseContext } from '../../services/firebaseService'

const ListMissions = (props) => {
  const { missions, filters } = props
  const { api } = useContext(FirebaseContext);
  const dispatch = useDispatch()
  let listMissions = missions.filter(mission => {
    let missionBool = true
    for(let filter in filters){
      if(filters[filter].toString() !== 'all' && filters[filter].toString() !== mission[filter].toString()){
        missionBool = false
      }
    }
    return missionBool
  })
  const handleShowDetails = (index) => {
    props.callbackShowDetails(index)
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
  let  list = ''
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
  return (
    <div className="missions">
      {list}
    </div>
  )

}
export default ListMissions