
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './Missions.css'

import ListMissions from '../../../shared/ListMissions/ListMissions'

const Missions = (props) => {
  const { missions } = props;
  const handleClickViewMore = () => {
    props.history.push("/missions");
  }
  return (
    <div className="profile-missions">
      <div className="nes-container is-dark with-title">
        <p className="title">Missions</p>
        {missions.length > 0? <ListMissions missions={missions}></ListMissions> : ''}
        <div className="container-add-button">
          {/* <button className="nes-btn is-default" onClick={handleClickViewMore}>View more</button> */}
        </div>
      </div>
    </div>
  )
}
export default withRouter(Missions);