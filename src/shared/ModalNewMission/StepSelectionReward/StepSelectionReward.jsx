import React, { useState } from 'react'
import SliderRangeNes from '../../SliderRangeNes/SliderRangeNes'
import StepTextReward from '../StepTextReward/StepTextReward'

const StepSelectionReward = (props) => {
  const [data, setData] = useState(
    {
      type: props.defaultData.type, 
      difficulty: props.defaultData.difficulty? props.defaultData.difficulty : 1,
      data: props.defaultData.data
    })
  const handleSetOption = (value, element) => {
    let _data = {...data}
    _data[element] = value
    setData(_data)
    props.callbackSelectOption(_data)
  }
  const rewards = props.listRewards.map(reward => ({ value: reward.id, text: reward.name }))
  //  [
  //   { value: 'skill_xp', text: 'Skill XP' },
  //   { value: 'class_xp', text: 'Class XP' },
  //   { value: 'new_skill', text: 'New skill' },
  //   { value: 'title', text: 'Title' },
  //   { value: 'special_title', text: 'Special title' },
  // ]
  const colors = [
    {color: '#92cc41', limit: (4/10)},
    {color: '#f7d51d', limit: (7/10)},
    {color: '#e76e55', limit: 1}
  ]
  return (
    <div id="step-selection-reward" className="radio-column">
      <StepTextReward text="Mission" callbackDataText={(data) => handleSetOption(data, 'data')}
      defaultData={data.data}></StepTextReward>
      <p className="nes-title">Select reward</p>
      { rewards.map((reward, index) => 
        <label key={index} className="radio-selection">
          <input type="radio" className="nes-radio is-dark" name="answer-dark"
            value={reward.value} onClick={(e) => handleSetOption(e.target.value, 'type')}
            defaultChecked={data.type === reward.value}/>
          <span>{reward.text}</span>
        </label>
      )}
      <SliderRangeNes title="Difficulty" min="0" max="10" colors={colors}
      callbackValue={(value) => handleSetOption(value, 'difficulty')} defaultValue={data.difficulty}></SliderRangeNes>
    </div>
  )
}

export default StepSelectionReward