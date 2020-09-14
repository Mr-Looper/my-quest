import React, { useState } from 'react'

const ListCheckbox = (props) => {
  const [options, setOptions] = useState([].concat(props.prechecked))
  const handleSetOption = (value, name) => {
    let _options = options? [...options] : []
    if(props.typeSelector === 'checkbox'){
      _options = value !== '1'? _options.concat([name]) : _options.filter(_opt => _opt !== name)
    }
    if(props.typeSelector === 'radio'){
      _options = [value]
    }
    setOptions(_options)
    props.callbackSelectOption(_options)
  }
  return (
    <div className={props.mainClass}>
      { props.list.map((checkbox, index) => 
        <label key={index} className={`nes-text-forced is-${checkbox.color}`}>
          <input type={props.typeSelector} className={`nes-${props.typeSelector} is-dark`} 
          value={
            props.typeSelector === 'checkbox'? 
            ((options && options.findIndex(value => value === checkbox.value) !== -1)? 1 : 0)
          : checkbox.value }
          name={ props.typeSelector === 'checkbox'? checkbox.value : props.mainClass}
          onClick={(e) => handleSetOption(e.target.value, e.target.name)}
          defaultChecked={options && options.findIndex(value => value === checkbox.value) !== -1}
          />
          <span>{checkbox.text} </span>
        </label>
      )}
    </div>
  )
}

export default ListCheckbox