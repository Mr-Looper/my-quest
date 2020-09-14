import React, { useContext, useEffect } from 'react'
import './Profile.css';

import Userdata from './Userdata/Userdata'
import { connect, useDispatch } from 'react-redux';
import ListSkills from '../../shared/ListSkills/ListSkills';
import { useState } from 'react';

let sections = {
  titles : [],
  specializedTitles : [],
  activeMissions : [],
  repeatableMissions : [],
}
const Profile = ({ state }) => {
  const { myData, myTitles, myMissions, mySkills, myClasses } = state
  const [user, setUser] = useState(myData)
  const [skills, setSkills] = useState([])
  const listSections = [
    { title: 'Titles', prop: 'titles', class: '', modal: 'MODAL_TITLE' },
    { title: 'Specialized titles', prop: 'specializedTitles', class: '', modal: 'MODAL_TITLE' },
    { title: 'Active missions', prop: 'activeMissions', class: '', modal: 'MODAL_MISSION' },
    { title: 'Repeatable missions', prop: 'repeatableMissions', class: '', modal: 'MODAL_MISSION' }
  ]
  const dispatch = useDispatch()
  useEffect(() => {
    if(myData){
      setUser({})
      setSkills([])
      setUser(myData)
      if(mySkills && mySkills.length > 0){
        setTimeout(() => { 
          const list = mySkills.filter(_skills => {
            return myData.class_id === _skills.class_id
          })
          setSkills(list)
        }, 0)
      }
    }
    // if(myMissions && myMissions.length > 0){
    //   sections.activeMissions = myMissions.filter(mission => parseInt(mission.status_id) === 0 && !mission.repeat)
    //   sections.repeatableMissions = myMissions.filter(mission => parseInt(mission.status_id) === 0 && mission.repeat && parseInt(mission.repeat_status_id) === 0)
    // }
    // if(myTitles && myTitles.length > 0){
    //   sections.titles = myTitles.filter(title => title.permanent)
    //   sections.specializedTitles = myTitles.filter(title => !title.permanent)
    // }
  }, [myData, myMissions, mySkills])
  return (
    <div className="profile-card is-dark main-card">
      <div className="nes-container is-dark with-title">
        <p className="title">User data</p>
        <Userdata userdata={user}></Userdata>
        <div className="profile-main-class">
        {skills && skills.length > 0 ? 
          (<ListSkills skills={skills} mainClass={user.class_id} enableShowModal={true}
            // callbackShowDetails={(position) => handleShowDetails(position)}
            >
          </ListSkills>) : ''
        }
        </div>
        {/* {listSections.map((section, index) => 
          sections[`${section.prop}`] && sections[`${section.prop}`].length > 0 ?
            <div className={`lists list-container ${section.class}`} key={index}>
            <p>{section.title}</p>
            <ul className="nes-list is-circle is-dark">
              {sections[`${section.prop}`].map((item, subindex) =>
                <li key={subindex} onClick={() => dispatch(showModal(section.modal, {infoModal: item}))}>{item.data.name}</li>
              )}
            </ul>
          </div>
          : ''
        )} */}
      </div>
    </div>
  )
}
export default connect(
  (state) => {
    const { myData, myMissions, myTitles, mySkills } = state;
    return {
      state: { myData, myMissions, myTitles, mySkills }
    };
  },
  
  // (dispatch) => {
  //   return {
  //     actions: bindActionCreators({...instagramActions, facebookActions}, dispatch)
  //   };
  // }
)(Profile);