import React, { useState } from 'react'
import './ColorSelector.css'


const ColorSelector = (props) => {
  const colors = ['error','dark','success','warning','primary','default','orange','kalipso','blue','pink','violet','oxide']
  const [currentColor, setColor] = useState(props.color)
  const handleClickColor = (color) => {
    setColor(color)
    props.callbackSelectColor(color)
  }
  const listColors = colors.map((color, index) => 
    <div className={`color-selector is-${color}`} onClick={() => handleClickColor(color)} key={index}>
      {currentColor == color? <span className="selector-icon-right"></span> : ''}
    </div>
  )
  return(
    <div>
      <label>Color selector</label>
      <div className="list-color-selector">
        {listColors}
      </div>
    </div>
  )
}

export default ColorSelector