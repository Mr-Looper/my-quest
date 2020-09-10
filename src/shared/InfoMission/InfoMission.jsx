import React, { useState } from 'react'

import './InfoMission.css'
import { connect } from 'react-redux'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const _showNameColoredByListIds = (listIds, list) => {
  const newList = list.filter(_skill => listIds.findIndex(_id => _id === _skill.id) !== -1)
  return newList.length > 0? newList.map((_skill, index) => 
    <span key={index} className={`nes-text-forced is-${_skill.color}`}>[{_skill.name}]</span>
  ) : <span className={`nes-text is-default`}>Not assigned</span>
}

const InfoMission = (props) => {
  const { mission, state } = props
  const { myClasses, mySkills } = state
  const [dataMission, ] = useState(mission)
  return (
    <div className="info-mission">
      <p className={`nes-text-forced is-${dataMission.data.color}`}>{dataMission.data.name}</p>
      <div>
      {props.showFull? 
        <div className="description-mission">
          {dataMission.data.description}
          <div className="separator-dashed"></div>
        </div> : ''}
      {dataMission.conditions.length > 0? 
      <div className="condition-mission">
        <p>Conditions</p>
        {dataMission.configuration && dataMission.configuration.repeat?
          <div>
            <p>
              {dataMission.configuration.repeat_type === 'Special'?
                `${dataMission.configuration.special.map(day => days[day]).join(', ')}.`
                : `${dataMission.configuration.repeat_type}.`
              }
            {` Start from ${dataMission.configuration.startDate}`}
            {dataMission.configuration.finishDate? ` to ${dataMission.configuration.finishDate}.` : '.'}
            </p>
          </div>
          : ''
        }
        <ul className="nes-list is-circle is-dark">
          {dataMission.conditions.map((condition, index) => {
            return <li key={index}>{condition.text}</li>
          })}
        </ul>
        
      </div> : ''
      }
      {props.showFull?
      <div className="reward-mission">
        <div className="separator-dashed"></div>
        <p>Reward</p>
        <ul className="nes-list is-circle is-dark"><li>
          {dataMission.type === 'skill_xp' && dataMission.skill? 
            <span>Skill XP: <span>{_showNameColoredByListIds([].concat(dataMission.skill.id), mySkills)}</span></span>
            : ''}
          {dataMission.type === 'class_xp' && dataMission.classes_xp? 
            <span>Class XP: <span>{_showNameColoredByListIds([].concat(dataMission.classes_xp), myClasses)}</span></span>
            : ''}
          {dataMission.type === 'new_skill' && dataMission.skill? 
            <span>Skill "<span className={`nes-text-forced is-${dataMission.skill.color}`}>{dataMission.skill.name}</span>". {dataMission.skill.description}</span>
            : '' }
          {dataMission.type === 'title' && dataMission.title? 
            <span>Title "<span className={`nes-text-forced is-${dataMission.title.color}`}>{dataMission.title.name}</span>". {dataMission.title.description}</span>
            : '' }
          {dataMission.type === 'special_title' && dataMission.special_title? 
          <span>Title "<span className={`nes-text-forced is-${dataMission.special_title.color}`}>{dataMission.special_title.name}</span>". {dataMission.special_title.description}</span>
            : '' }
          {dataMission.type === 'skill_level' && dataMission.skill? 
          <span>Level up: (+{dataMission.skill.level}) {_showNameColoredByListIds([].concat(dataMission.skill.id), mySkills)} </span>
            : '' }
        </li></ul>
      </div> : ''}
      </div>
    </div>
  )
}

export default connect(
  (state) => {
    const { myClasses, mySkills } = state
    return {
      state: { myClasses, mySkills }
    }
  },
)(InfoMission)