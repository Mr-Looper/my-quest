import React, { useState } from 'react';
import './SliderRangeNes.css'
const SliderRangeNes = (props) => {
  const getColor = (value) => {
    const limit = props.colors.filter(color => {
      return color.limit*100 >= value
    })
    return limit[0].color
  }

  const getCurrentPercent = (curr, min, max) => {
    return (100*(curr-min))/(max-min)
  }
  const [valueSlider, setValueSlider] = useState(props.defaultValue)
  
  const [style, setStyle] = useState({background: `linear-gradient(to right, ${getColor(getCurrentPercent(props.defaultValue, props.min, props.max))} 0%, ${getColor(getCurrentPercent(props.defaultValue, props.min, props.max))} ${getCurrentPercent(props.defaultValue, props.min, props.max)}%, transparent ${getCurrentPercent(props.defaultValue, props.min, props.max)}%, transparent 100%)`})
  const handleChangevalue = (value) => {
    setValueSlider(value)
    setStyle({background: `linear-gradient(to right, ${getColor(getCurrentPercent(value, props.min, props.max))} 0%, ${getColor(getCurrentPercent(value, props.min, props.max))} ${getCurrentPercent(value, props.min, props.max)}%, transparent ${getCurrentPercent(value, props.min, props.max)}%, transparent 100%)`})
    props.callbackValue(value)
  }
  return (
    <div className="progress-bar">
      <span className="next">{props.title}</span>
      <div className="container-range">
        <input type="range" min={parseFloat(props.min)} max={parseFloat(props.max)}
        style={style}
        defaultValue={valueSlider} className="slider nes-progress"
        onChange={(e) => handleChangevalue(e.target.value)}></input>
      </div>
    </div>
  );
}

export default SliderRangeNes;