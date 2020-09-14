import React, { useState, useContext } from 'react'
import { useDispatch, connect } from 'react-redux'

import Modal from '../Modal/Modal'
import StepSelectionReward from './StepSelectionReward/StepSelectionReward'
import StepTextReward from './StepTextReward/StepTextReward'
import StepConfigurationMission from './StepConfigurationMission/StepConfigurationMission'
import StepSetConditions from './StepSetConditions/StepSetConditions'
import InfoMission from '../InfoMission/InfoMission'
import StepCheckElements from './StepCheckElements/StepCheckElements'

import { hideModal } from '../../actions'
import { FirebaseContext } from '../../services/firebaseService'
import './ModalNewMission.css'

const specialTitleInfo = 'When you create a "Special title", it will be repeatable by force and it will be lost when you don\'t complete the mission. You can always complete  and retrieve it if you don\'t end the mission.'

const ModalNewMission = (props) => {
  const { api } = useContext(FirebaseContext)
  const { mySkills, myClasses, typeMissions } = props.state
  const { title, layer, initialData } = props
  const [listSkills, ] = useState(mySkills? mySkills.map(_skill => { return { text: _skill.name, value: _skill.id, class: _skill.class, parentElement: [_skill.class_id] } }) : [])
  const [listClasses, setListClasses] = useState(myClasses? myClasses.map(_class => { return { text: _class.name, value: _class.id, color: _class.color } }) : [])
  const [steps, setSteps] = useState([initialData.startFrom])
  const [currentStep, setCurrentStep] = useState(initialData.startFrom)
  const [toStep, setToStep] = useState(initialData.type? initialData.type : '')
  const [dataMission, setDataMission] = useState(
    {
      status_id: 0,
      type: (initialData.type? initialData.type : ''),
      data: { name: '', description: '', color: 'error'},
      difficulty: (initialData.difficulty? initialData.difficulty : 5),
    ...initialData
  })
  const [enableNextStep, setEnableNextStep] = useState(initialData.type? initialData.type : '')

  const handleDefineMission = (data) => {
    let _dataMission = {...dataMission}
    _dataMission.difficulty = data.difficulty
    _dataMission.type = data.type
    _dataMission.data = data.data
    const booleanNextStep = _dataMission.data.name !== '' && _dataMission.data.description !== '' && _dataMission.type !== '' && _dataMission.data.color !== ''
    setDataMission(_dataMission)
    console.log(_dataMission)
    setEnableNextStep(booleanNextStep)
    if(booleanNextStep){
      setToStep(_dataMission.type)
    }
  }
  const handleSetDataText = (data, element) => {
    let _dataMission = {...dataMission}
    _dataMission[element] = data
    setDataMission(_dataMission)
    setEnableNextStep(_dataMission[element] && _dataMission[element].name && _dataMission[element].description && _dataMission[element].color)
    if(enableNextStep && _dataMission.type !== 'new_skill' && _dataMission.type !== 'title'){
      setToStep('config_mission')
    }else if(enableNextStep){
      setToStep('conditions')
    }
  }
  const handleSetGainXpClass = (list) => {
    let _dataMission = {...dataMission}
    _dataMission.class = {
      id: list.map(_class => (_class))
    }
    setDataMission(_dataMission)
    setEnableNextStep(list.length > 0)
    if(enableNextStep){
      setToStep('config_mission')
    }
  }
  const handleSetGainXpSkill = (list) => {
    let _dataMission = {...dataMission}
    _dataMission['skill'] = list.map(_skill => ({ id: _skill }))
    //Según las skills marcadas, busco las ids de clases padre
    const classes = [...new Set((list.map(_skill => {
      const currentSkill = listSkills.filter(_currentSkill => _currentSkill.value === _skill)[0]
      return myClasses.filter(_class =>{
          return currentSkill && currentSkill.parentElement && currentSkill.parentElement.findIndex(_subClass => _subClass === _class.id) !== -1
        }).map(_class => ({ text: _class.name, value: _class.id, color: _class.color }))
      })
    ).flat())]
    setListClasses(classes)
    setDataMission(_dataMission)
    setEnableNextStep(list.length > 0)
    if(enableNextStep){
      setToStep('config_mission')
    }
  }
  const handleSetSkillLevel = (data) => {
    let _dataMission = {...dataMission}
    _dataMission['skill_level'] = data
    setDataMission(_dataMission)
    setEnableNextStep(data && data.id.length > 0 && data.level > 0)
    if(enableNextStep){
      setToStep('conditions')
    }
  }
  const handleSetConfiguration = (data) => {
    let _dataMission = {...dataMission}
    _dataMission.configuration = data
    setDataMission(_dataMission)
    let boolean = false
    if(_dataMission.configuration && !_dataMission.configuration.repeat){
      boolean = true
    }else if(_dataMission.configuration && _dataMission.configuration.repeat && _dataMission.configuration.repeat_type){
      if(_dataMission.configuration.repeat_type === 'Special' && _dataMission.configuration.special && _dataMission.configuration.special.length > 0){
        boolean = true
      }else if(_dataMission.configuration.repeat_type !== 'Special'){
        boolean = true
      }
    }
    setEnableNextStep(boolean)
    if(enableNextStep){
      setToStep('conditions')
    }
  }
  const handleSetConditions = (conditions) => {
    let _dataMission = {...dataMission}
    _dataMission.conditions = conditions
    setDataMission(_dataMission)
    setToStep('resume')
  }
  const handlePrevStep = () => {
    let listSteps = [...steps]
    setCurrentStep(listSteps[listSteps.length - 2])
    setToStep(listSteps[listSteps.length - 1])
    setSteps(listSteps.slice(0, listSteps.length - 1))
    setEnableNextStep(true)
  }
  const handleNextStep = () => {
    let listSteps = [...steps]
    setCurrentStep(toStep)
    let _dataMission = {...dataMission}
    if(toStep === 'new_skill'){
      handleSetDataText((_dataMission.skill? _dataMission.skill : { name: '', description: '', color: 'error'}), 'skill')
    }
    if(toStep === 'title'){
      handleSetDataText((_dataMission.title? _dataMission.title : { name: '', description: '', color: 'error'}), 'title')
    }
    if(toStep === 'special_title'){
      handleSetDataText((_dataMission.special_title? _dataMission.special_title : { name: '', description: '', color: 'error'}), 'special_title')
    }
    if(toStep === 'config_mission'){
      handleSetConfiguration(_dataMission.configuration? 
        _dataMission.configuration : 
        { repeat: false, repeat_type: '',
        startDate: `${(new Date()).getDate()}/${(new Date()).getMonth()+1}/${(new Date()).getFullYear()}`
        }
      )
    }
    if(toStep === 'skill_level'){
      handleSetSkillLevel(_dataMission.skill? _dataMission.skill : { id: '', level: '' })
    }
    if(toStep === 'skill_xp'){
      handleSetGainXpSkill((_dataMission.skill? _dataMission.skill : []))
    }
    if(toStep === 'class_xp'){
      handleSetGainXpClass((_dataMission.classes_xp? _dataMission.classes_xp : [{ id: '' }]))
    }
    if(toStep === 'conditions'){
      handleSetConditions((_dataMission.conditions? _dataMission.conditions : [{text:'', withProgress: false, from: 0, to: 1}]))
    }
    if(listSteps.findIndex(_step => _step === toStep) === -1){
      listSteps.push(toStep)
    }
    setSteps(listSteps)
  }
  const handleCreateMission = () => {
    api.createMission(dataMission)
    dispatch(hideModal('MODAL_NEW_MISSION'))
  }
  const dispatch = useDispatch()
  return (
    <div>
      <Modal title={title} layer={layer}
      callbackCloseModal={() => dispatch(hideModal('MODAL_NEW_MISSION'))}
      >
      {currentStep === 'mission' && typeMissions && typeMissions.length > 0?
          <StepSelectionReward listRewards={typeMissions} callbackSelectOption={(data) => handleDefineMission(data)}
          defaultData={dataMission}></StepSelectionReward>
        : ''}
      
        {currentStep === 'new_skill'? 
          <StepTextReward text="Skill" callbackDataText={(data) => handleSetDataText(data, 'skill')}
          defaultData={dataMission.skill}>
          </StepTextReward> : '' }
        
        {currentStep === 'title'? 
          <StepTextReward text="Title" callbackDataText={(data) => handleSetDataText(data, 'title')}
          defaultData={dataMission.title}></StepTextReward> : '' }
      
        {currentStep === 'special_title'? 
          <StepTextReward text="Special title" callbackDataText={(data) => handleSetDataText(data, 'special_title')}
          aditionalInfo={specialTitleInfo}
          defaultData={dataMission.special_title}></StepTextReward> : '' }

        {currentStep === 'config_mission'? 
          <StepConfigurationMission callbackConfiguration={(data) => handleSetConfiguration(data)} type={dataMission.type}
          defaultData={dataMission.configuration}></StepConfigurationMission> : '' }

        {currentStep === 'skill_level' && listSkills? 
          <div>
            <div className="nes-field is-inline">
              <label htmlFor="skill_level" style={{maxWidth: '50px'}}>Gain</label>
              <input style={{maxWidth: '100px'}} type="number" min={0} max={10} id="skill_level" className="nes-input is-dark" value={dataMission.skill_level.level}
              onChange={(e) => handleSetSkillLevel({id: dataMission.skill_level.id, level: parseInt(e.target.value)})}></input>
              
              <label htmlFor="skill_level" style={{maxWidth: '100px'}}>{parseInt(dataMission.skill_level.level) > 1? 'levels' : 'level'}</label>
            </div>
            <StepCheckElements title="Select skill" list={listSkills} 
            selected={dataMission.skill_level? dataMission.skill_level.name : ''}
            callbackCheckElements={(data) => handleSetSkillLevel({id: data, level: dataMission.skill_level.level})}
            >
            </StepCheckElements>
          </div>
           : ''
        }
        
        {currentStep === 'skill_xp' && listSkills? 
          <div>
            <StepCheckElements typeSelector="radio" title="Skills list" list={listSkills} selected={dataMission.skill.id}
            // callbackCheckElements={(data) => handleSetSkillLevel({id: data, level: dataMission.skill_level.level})}
            callbackCheckElements={(skills) => handleSetGainXpSkill(skills)}
            >
            </StepCheckElements>
            Skill xp missions also give experience to the classes it belongs to.
          </div>
           : ''
        }
        {(currentStep === 'class_xp' && listClasses)?
          <StepCheckElements title="Classes list" list={listClasses} selected={dataMission.classes_xp}
          callbackCheckElements={(classes) => handleSetGainXpClass(classes)}>
          </StepCheckElements> : ''
        }
        {currentStep === 'conditions' ?
          <StepSetConditions conditions={dataMission.conditions? dataMission.conditions : []}
            callbackConditions={(list) => handleSetConditions(list)}
          ></StepSetConditions>
        : ''}
        {currentStep === 'resume'?
          <InfoMission mission={dataMission} showFull={true}></InfoMission>
        : ''
        }
        
        <div className="footer-modal">
          {currentStep !== initialData.startFrom? <button className="nes-btn is-default prev-step" onClick={() => handlePrevStep()}>Prev step</button> : ''}
          {currentStep !== 'resume' && enableNextStep? <button className="nes-btn is-default next-step" onClick={() => handleNextStep()}>Next step</button> : '' }
          {currentStep === 'resume' && enableNextStep? <button className="nes-btn is-success next-step" onClick={() => handleCreateMission()}>Create</button> : '' }
        </div>
      </Modal>
    </div>
  )
}

export default connect(
  (state) => {
    const { mySkills, myClasses, typeMissions } = state
    return {
      state: { mySkills, myClasses, typeMissions }
    }
  }
)(ModalNewMission)