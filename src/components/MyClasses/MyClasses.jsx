
import React, { useEffect } from 'react'
import './MyClasses.css'
import ListClasses from '../../shared/ListClasses/ListClasses';
import { useDispatch, connect } from 'react-redux';
import { showModal } from '../../actions'
import { useState } from 'react';

const MyClasses = ({ state }) => {
  const { myClasses } = state
  const title = 'New class'
  const dispatch = useDispatch()
  const [listClasses, setListClasses] = useState()
  useEffect(() => {
    if(myClasses && myClasses.length > 0){
      console.table(myClasses[0].specialization)
      setListClasses([])
      setTimeout(() => setListClasses(myClasses), 0)
    }
  }, [myClasses])
  return (
    <div className="my-classes-card main-card">
      <div className="nes-container is-dark with-title my-classes">
        <p className="title">My classes</p>
        <div className="container-add-button">
          <button type="button" className="nes-btn is-default" onClick={() => dispatch(showModal('MODAL_NEW_CLASS', {title}))}>{title}</button>
        </div>
        {listClasses && listClasses.length > 0? <ListClasses myClasses={listClasses}>
        </ListClasses> : ''}
      </div>
    </div>
  )
}
export default connect(
  (state) => {
    const { myClasses } = state;
    return {
      state: { myClasses }
    };
  },
)(MyClasses);