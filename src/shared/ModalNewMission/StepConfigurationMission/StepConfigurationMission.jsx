import React, { useState } from 'react'
import DatePicker from "react-datepicker"
 
import "react-datepicker/dist/react-datepicker.css"
import ListCheckbox from '../../ListCheckbox/ListCheckbox'

const StepConfigurationMission = (props) => {
  const [config, setConfig] = useState(
    {...props.defaultData, 
      repeat: props.type === 'special_title'? 'true' : props.defaultData.repeat,
      repeat_type: props.type === 'special_title' && !props.defaultData.repeat_type? 'Daily' : props.defaultData.repeat_type
    })
  const [enableFinishDate, setEnableFinishDate] = useState(!!props.defaultData.finishDate)
  const handleSetOption = (option, element) => {
    let _config = {...config}
    _config[element] = option
    if((element === 'repeat_type' || element === 'startDate') && enableFinishDate){
      _config['finishDate'] = getMiniumFinishDate(_config['startDate'], _config.repeat_type)
    }
    setConfig(_config)
    props.callbackConfiguration(_config)
  }
  const handleFinishDate = (value) => {
    let _config = {...config}
    if(!value){
      delete config.finishDate
    }else{
      _config['finishDate'] = getMiniumFinishDate(_config['startDate'], _config.repeat_type)
    }
    setConfig(_config)
    setEnableFinishDate(value)
  }
  const getMiniumFinishDate = (date, type) => {
    let minimumDate = new Date(`${date.split('/')[1]}/${date.split('/')[0]}/${date.split('/')[2]}`)
    if(type === 'Daily'){
      minimumDate.setDate(minimumDate.getDate() + 1)
    }else if(type === 'Weekly'){
      minimumDate.setDate(minimumDate.getDate() + 7)
    }else if(type === 'Monthly'){
      minimumDate.setMonth(minimumDate.getMonth() + 1)
    }else if(type === 'Annually'){
      minimumDate.setFullYear(minimumDate.getFullYear() + 1)
    }else if(type === 'Special'){
      minimumDate.setDate(minimumDate.getDate() + 14)
    }
    return `${minimumDate.getDate()}/${minimumDate.getMonth()+1}/${minimumDate.getFullYear()}`
  }
  const loops = [
    { value: 'Daily', text: 'Daily'},
    { value: 'Weekly', text: 'Weekly'},
    { value: 'Monthly', text: 'Monthly'},
    { value: 'Annually', text: 'Annually'},
    { value: 'Special', text: 'Days at week'}
  ]
  const special = [
    { value: '1', text: 'Mon'},
    { value: '2', text: 'Tue'},
    { value: '3', text: 'Wed'},
    { value: '4', text: 'Thu'},
    { value: '5', text: 'Fri'},
    { value: '6', text: 'Sat'},
    { value: '0', text: 'Sun'},
  ]
  return (
    <div id="step-configuration-mission" >
      {props.type !== 'special_title'?
      <div>
        <p className="nes-title">Repeatable</p>
        {config.repeat}
        <label className="radio-selection">
          <input type="radio" className="nes-radio is-dark" name="repeat" onClick={(e) => handleSetOption(true, 'repeat')} defaultChecked={config.repeat === true}/>
          <span>Yes</span>
        </label>
        <label className="radio-selection">
          <input type="radio" className="nes-radio is-dark" name="repeat" onClick={(e) => handleSetOption(false, 'repeat')} defaultChecked={config.repeat === false}/>
          <span>No</span>
        </label>
      </div> : ''}
      {config.repeat?
        <div>
          <div className="radio-column">
            <p className="nes-title">Loop</p>
            { loops.map((radio, index) => 
              <label className="radio-selection" key={index}>
                <input type="radio" className="nes-radio is-dark" name="repeat_type" value={radio.value}
                onClick={(e) => handleSetOption(e.target.value, e.target.name)}
                defaultChecked={config.repeat_type === radio.value}/>
                <span>{radio.text}</span>
                </label>
            )}
          </div>
          {config.repeat_type && config.repeat_type === 'Special'?
            <ListCheckbox typeSelector="checkbox" mainClass="days-selection" list={special}
            callbackSelectOption={(options) => handleSetOption(options.sort(), 'special')}
            prechecked={config.special}></ListCheckbox>
          : ''}
        </div>
      : '' }
      {config.repeat_type && config.repeat?
        <div>
          <div className="config-date">
            <p>Start date</p>
            <DatePicker selected={new Date(`${config.startDate.split('/')[1]}/${config.startDate.split('/')[0]}/${config.startDate.split('/')[2]}`)}
            onChange={date => handleSetOption(`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`, 'startDate')} 
            minDate={new Date()}
            popperPlacement="top"
            dateFormat="MMMM d, yyyy"
            customInput={<input className="nes-input is-dark"></input>}></DatePicker>
          </div>
          <div className="config-date">
            <label>
              <input type="checkbox" className="nes-checkbox is-dark"
              onClick={() => handleFinishDate(!enableFinishDate)}
              defaultChecked={enableFinishDate}/>
              <span>Finish date (Optional)</span>
            </label>
            {enableFinishDate? 
            <DatePicker selected={new Date(`${config.finishDate.split('/')[1]}/${config.finishDate.split('/')[0]}/${config.finishDate.split('/')[2]}`)}
            onChange={date => handleSetOption(`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`, 'finishDate')} 
            minDate={new Date(`${config.startDate.split('/')[1]}/${config.startDate.split('/')[0]}/${config.startDate.split('/')[2]}`)}
            popperPlacement="top"
            dateFormat="MMMM d, yyyy"
            customInput={<input className="nes-input is-dark"></input>}></DatePicker>
            : ''}
          </div>
        </div>
      : ''}
    </div>
  )
}

export default StepConfigurationMission