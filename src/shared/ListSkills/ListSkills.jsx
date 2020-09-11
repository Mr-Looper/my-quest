import React, { useContext } from 'react'
import { showModal } from '../../actions'

import './ListSkills.css'
import { useDispatch, connect } from 'react-redux'
import InfoSkill from '../InfoSkill/InfoSkill'
import { FirebaseContext } from '../../services/firebaseService'
import IndicatorLevel from '../IndicatorLevel/IndicatorLevel'
import { useEffect } from 'react'
import { useState } from 'react'

const ListSkills = (props) => {
  const { skills, state, enableShowModal, enableModifySkill } = props
  const { myClasses } = state
  const [listSkills, setListSkills] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if(myClasses && myClasses.length > 0){
      console.log(skills)
      let skillTree = [{id: 'na', name: 'No class', total: 0, specialization: [ {id: 'na', name: 'Other', total: 0, skills: []}] }]
      skills.filter(_skill => {
        const myClassIndex = myClasses.findIndex(_class => _class.id === _skill.class_id)
        let _currentFirstLevel = 0
        let _currentSecondLevel = 0
        if(_skill.class_id && myClassIndex !== -1){
          //Si tiene clase asignada y la clase existe
          _currentFirstLevel = skillTree.findIndex(firstLevel => firstLevel.id === _skill.class_id)
          if(_currentFirstLevel === -1){
            skillTree.push({
              id: myClasses[myClassIndex].id,
              name: myClasses[myClassIndex].name,
              color: myClasses[myClassIndex].color,
              total: 0,
              specialization: [ {id: 'na', name: 'Other', total: 0, skills: []}].concat(
                myClasses[myClassIndex].specialization.map(_spec => ({..._spec, total: 0, skills: []}))
              )
            })
            _currentFirstLevel = skillTree.length - 1
          }
          _currentSecondLevel = skillTree[_currentFirstLevel].specialization.findIndex(_spec => _spec.id === _skill.subclass_id)
          _currentSecondLevel = _currentSecondLevel !== -1? _currentSecondLevel : 0
          
        }
        skillTree[_currentFirstLevel].total++
        skillTree[_currentFirstLevel].specialization[_currentSecondLevel].total++
        skillTree[_currentFirstLevel].specialization[_currentSecondLevel].skills.push(_skill)
      })
      skillTree = skillTree.filter(_class => _class.total !== 0)
        .map(_class => {
          _class.specialization = _class.specialization.filter(_spec => _spec.total !== 0)
          return _class
        })
      setListSkills(skillTree)
    }
  }, [myClasses])
  const list = listSkills.map((currentClass, classIndex) =>
    <div key={`class-${classIndex}`}>
      <p className={`nes-text-forced is-${currentClass.color || 'default'}`}>
        {props.mainClass === currentClass.id? 'Main class: ' : ''}{currentClass.name}
        </p>
      <ul className="list-main-skill">
        {currentClass.specialization.map((_spec, specializationIndex) => 
          <li key={`specialization-${classIndex}-${specializationIndex}`} className="element-main-skill">
            <div>
              <div className="info-main-skill">
                <span htmlFor={`indicator-${classIndex}-${specializationIndex}`}>{_spec.name}</span>
                <span id={`indicator-${classIndex}-${specializationIndex}`}><IndicatorLevel max={_spec.max} level={_spec.level}></IndicatorLevel></span>
              </div>
              {_spec.skills && _spec.skills.length > 0?
                <ul className="container-sub-skill nes-list is-circle is-dark">
                  {_spec.skills.map((_skill, skillIndex) =>
                    <li key={`skill-${classIndex}-${specializationIndex}-${skillIndex}`} className={`element-sub-skill ${enableShowModal? 'cursor--pointer' : ''}`}
                    onClick={enableShowModal? 
                      () => dispatch(showModal('MODAL_MY_SKILL', {skill: _skill, enableModifySkill: enableModifySkill })) :
                      () => false}
                    >
                      <div className="info-sub-skill">
                        <span htmlFor={`indicator-${classIndex}-${specializationIndex}-${skillIndex}`}
                        className={`nes-text-forced is-${_skill.color}`}>{_skill.name}</span>
                        <span id={`indicator-${classIndex}-${specializationIndex}-${skillIndex}`}><IndicatorLevel max={_skill.max} level={_skill.level}></IndicatorLevel></span>
                      </div>
                    </li>
                  )}
                </ul>
                : '' }
            </div>
          </li>
        )}
      </ul>
    </div>
  )
  return (
    <div className="skill-container">
      {list}
    </div>
  )

}
export default connect(
  (state) => {
    const { myClasses } = state;
    return {
      state: { myClasses }
    };
  },
)(ListSkills)