import React from 'react'
import './IndicatorLevel.css'

const IndicatorLevel = (props) => {
  const colors = [
    {color: '#92cc41', limit: (4/10)},
    {color: '#f7d51d', limit: (7/10)},
    {color: '#e76e55', limit: 1}
  ]
  let listIndicator = []
  if(props.max !== 0){
    for (let index = 0; index < props.level; index++) {
      const _color = colors.filter(color => {
        return (color.limit * 10) >= index
      })
      listIndicator.push({
        background: _color[0].color,
        width: `${(props.max / 10) * 20}px`
      })
    }
  }else{
    listIndicator = [{
      background: '#209cee',
      width: '218px'
    }]
  }
  return (
    <div className="indicator-level">
      {listIndicator.map((color, index) =>
        <span className="indicator" style={color} key={index}></span>
      )}
    </div>
  )
}

export default IndicatorLevel