import React, { useState } from 'react'
import './DynamicInput.css'

const DynamicInput = (props) => {
  const { title } = props
  const [inputList, setInputList] = useState(props.inputs)
  const handleNewInput = () => {
    setInputList([...inputList, { text: '' }])
    props.callbackDynamicInput(inputList)
  }
  const handleInputChange = (index, element, value) => {
    const list = [...inputList]
    list[index][element] = value
    if(element === 'to' || element === 'from'){
      const arr = [parseFloat(list[index].from), parseFloat(list[index].to)].sort()
      list[index].from = arr[0]
      list[index].to = arr[1]
    }
    setInputList(list)
    props.callbackDynamicInput(inputList)
  }
  const handleRemoveInput = (index) => {
    const list = [...inputList]
    list.splice(index, 1)
    setInputList(list)
    props.callbackDynamicInput(inputList)
  }
  return (
    <div>
      <div className="nes-field">
        <label htmlFor="skill_condition">{title}</label>
        {inputList.map((_condition, index) =>
          <div key={index} className={`${inputList.length > 1? 'with-button' : ''}`}>
            <div className="dynamic-input">
              <input id={`skill_condition_${index}`} className="nes-input is-dark"
                value={_condition.text}
                onChange={(e) => handleInputChange(index, 'text', e.target.value)}></input>
              {inputList.length > 1?
                <div onClick={() => handleRemoveInput(index)}><i className="nes-icon close icon-red"></i></div>
                : ''}
            </div>
              <label>
                <input type="checkbox" className="nes-checkbox is-dark"
                name="add_range"
                defaultChecked={_condition.withProgress}
                onClick={(e) => handleInputChange(index, 'withProgress', !_condition.withProgress)}/>
                <span>With progress selector</span>
              </label>
              {_condition.withProgress?
              <div className="condition-progress">
                <div className="nes-field condition-progress-from">
                  <label htmlFor="condition_from">From</label>
                  <input type="number" onChange={(e) => handleInputChange(index, 'from', e.target.value)}
                    value={_condition.from} className="nes-input is-dark"/>
                </div>
                <div className="nes-field condition-progress-to">
                  <label htmlFor="condition_to">To</label>
                  <input type="number" onChange={(e) => handleInputChange(index, 'to', e.target.value)}
                    value={_condition.to} className="nes-input is-dark"/>
                </div>
              </div> : ''}
          </div>
        )}
        <button className="nes-btn is-success" onClick={() => handleNewInput()}>Add</button>
      </div>
    </div>
  )
}

export default DynamicInput