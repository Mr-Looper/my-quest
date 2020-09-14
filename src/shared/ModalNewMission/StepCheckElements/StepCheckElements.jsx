import React, { useState } from 'react'
import ListCheckbox from '../../ListCheckbox/ListCheckbox'

const StepCheckElements = (props) => {
  const [list, setList] = useState(props.list)
  console.log(props.list)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(props.selected)
  const handleSetOption = (options) => {
    setSelected(options)
    props.callbackCheckElements(options)
  }
  const handleSearchElement = (value) => {
    let _list = [...props.list]
    _list = _list.filter(el => {
      return (el.text.toLowerCase()).indexOf(value.toLowerCase()) !== -1
    })
    setList(_list)
    setSearch(value)
  }
  return (
    <div>
      <div className="nes-field">
        <label htmlFor="skill_name">Search</label>
        <input type="text" className="nes-input is-dark"
          value={search} onChange={(e) => handleSearchElement(e.target.value)}></input>
      </div>
      <p className="title">{props.title}</p>
      <ListCheckbox typeSelector={props.typeSelector || 'checkbox'} mainClass="days-selection" list={list}
        callbackSelectOption={(options) => handleSetOption(options.sort())}
        prechecked={selected}>
        {props.children}
      </ListCheckbox>
    </div>
  )
}

export default StepCheckElements