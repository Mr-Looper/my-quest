import React from 'react';
import './SelectoNes.css'

const SelectorNes = (props) => {
  const handleSelectOption = (value) => {
    props.callbackSelection(value)
  }
  const { options, title, preselection } = props
  let listOptions = ''
  if(options){
    listOptions = options.map((option, index) =>
      <option key={index} value={option.id}>{option.name}</option>
    )
  }
  return (
    <div className="selector-nes">
      <label htmlFor="dark_select" style={{color: '#fff'}}>{title}</label>
      <div className="nes-select is-dark">
        <select required id="dark_select" value={preselection} onChange={(e) => handleSelectOption(e.target.value)}>
          {listOptions}
        </select>
      </div>
    </div>
  )
}

export default SelectorNes;