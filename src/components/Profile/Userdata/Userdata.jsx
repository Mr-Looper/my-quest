import React from 'react'

import MyInfo from '../../../shared/MyInfo/MyInfo'
import Progress from '../../../shared/Progress/Progress'

const Userdata = (props) => {
  const { userdata } = props
  return (
    <div className="profile-userdata">
      <MyInfo info={userdata}></MyInfo>
      {userdata.progress? <Progress info={userdata.progress}/> : ''}
    </div>
  )
}

export default Userdata