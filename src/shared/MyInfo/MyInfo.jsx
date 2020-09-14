import React from 'react';
import './MyInfo.css'
const MyInfo = ({ info, children }) => {
  return (
    <div className="my-info">
      <div className="avatar">
        <img 
          alt={info.username} src={info.srcAvatar}/>
      </div>
      <div className="profile">
        <h4 className="name">{info.username}</h4>
        <p>{info.mainClass}</p>
      </div>
      <div className="level">
        <h4 className="level-label">LVL</h4>
        <h1 className="level-number">28</h1>
      </div>
    </div>
  )
}

export default MyInfo;