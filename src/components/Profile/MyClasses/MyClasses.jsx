
import React, { Component } from 'react';
import './MyClasses.css'

import ListClasses from '../../../shared/ListClasses/ListClasses';
import { useDispatch } from 'react-redux';

const MyClasses = (props) => {
  const handleClickViewMore = () => {
    console.log('ver mas')
  }
  const { myClasses } = props;
  const dispatch = useDispatch()
  return (
      <div className="profile-my-classes">
        <div className="nes-container is-dark with-title my-classes">
          <p className="title">My classes</p>
          {myClasses.length > 0? <ListClasses myClasses={myClasses}></ListClasses> : ''}
          <div className="container-add-button">
            {/* <button className="nes-btn is-default" onClick={handleClickViewMore}>View more</button> */}
            {/* <button type="button" className="nes-btn is-default" onClick={() => dispatch(showModal('MODAL_NEW_CLASS', {title}))}>{title}</button> */}
          </div>
        </div>
      </div>
  )
}
export default MyClasses;