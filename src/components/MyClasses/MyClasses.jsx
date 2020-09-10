
import React from 'react'
import './MyClasses.css'
import ListClasses from '../../shared/ListClasses/ListClasses';
import { useDispatch, connect } from 'react-redux';
import { showModal } from '../../actions'

const MyClasses = ({ state }) => {
  const { myClasses } = state
  const title = 'New class'
  const dispatch = useDispatch()
  return (
    <div className="my-classes-card main-card">
      <div className="nes-container is-dark with-title my-classes">
        <p className="title">My classes</p>
        <div className="container-add-button">
          <button type="button" className="nes-btn is-default" onClick={() => dispatch(showModal('MODAL_NEW_CLASS', {title}))}>{title}</button>
        </div>
        {myClasses.length > 0? <ListClasses myClasses={myClasses}>
          <button type="button" className="nes-btn is-primary" onClick={() => console.log('ver skills')}>¬</button>
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