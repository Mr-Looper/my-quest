import React, { useState } from 'react'

import ColorSelector from '../../ColorSelector/ColorSelector'
const StepTextReward = (props) => {
  const [newText, setNewText] = useState(props.defaultData)
  const handleSetDataText = (element, value) => {
    let _newText = {...newText}
    _newText[element] = value
    setNewText(_newText)
    props.callbackDataText(_newText)
  }

  return (
    <div id="step-create-skill">
      {props.aditionalInfo? <p className="aditional-info">{props.aditionalInfo}</p> : ''}
      <div className="nes-field">
        <label htmlFor="skill_name">{props.text} name</label>
          <input type="text" id="name_field" className="nes-input is-dark" value={newText.name} onChange={(e) => handleSetDataText('name', e.target.value)}></input>
        </div>
        <div className="nes-field">
          <label htmlFor="skill_description">{props.text} description</label>
          <textarea id="skill_description" className="nes-textarea is-dark" value={newText.description} onChange={(e) => handleSetDataText('description', e.target.value)}></textarea>
        </div>
        {props.children}
        <div className="color-selector-container">
          <ColorSelector color={newText.color} callbackSelectColor={(color) => handleSetDataText('color', color)}></ColorSelector>
        </div>
    </div>
  )
}

export default StepTextReward