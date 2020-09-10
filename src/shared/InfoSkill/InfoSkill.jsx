import React, { useState } from 'react'

// import './InfoSkill.css'

// const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const InfoSkill = (props) => {
  const { skill } = props
  const [dataSkill, ] = useState(skill)
  return (
    <div className="info-skill">
      <p className={`nes-text-forced is-${dataSkill.class}`}>{dataSkill.name}</p>
      <div>
      {props.showFull? 
        <div className="description-skill">
          {dataSkill.description}
          <div className="separator-dashed"></div>
        </div> : ''}
      </div>
    </div>
  )
}

export default InfoSkill