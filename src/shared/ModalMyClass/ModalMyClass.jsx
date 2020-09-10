import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'
// import './Modal.css'

import { hideModal } from '../../actions'
import Modal from '../../shared/Modal/Modal'
import Progress from '../../shared/Progress/Progress'
import ListMissions from '../../shared/ListMissions/ListMissions'
import { useDispatch, connect } from 'react-redux';
import { useEffect } from 'react';

const ModalMyClass = (props) => {
  const { state } = props
  const { myMissions } = state
  const [listMissions, setListMissions] = useState()
  const handleClickViewMore = () => {
    props.history.push("/missions");
  }
  const { myClass, layer } = props;
  const dispatch = useDispatch()
  // const myCLassMisions = [
  //   { title: 'Complete React game', description: 'Create a personal game about improving different abilities', level: 5},
  //   { title: 'Do an horizontal 360°', description: 'Jump and do a whole turn around in my Y axis', level: 5}
  // ]
  useEffect(() => {
    if(myMissions && myMissions.length > 0){
      setListMissions(myMissions)
    }
  }, [myMissions])
  return (
    <div>
      <Modal title={myClass.name} layer={layer} callbackCloseModal={() => dispatch(hideModal('MODAL_MISSION'))} close="Close">
        <Progress info={myClass.progress}/>
        <div className="current-missions">
          {listMissions && listMissions.length > 0? <ListMissions missions={listMissions}></ListMissions> : '' }
          <button className="nes-btn is-default" onClick={() => handleClickViewMore()}>View more</button>
        </div>
      </Modal>
    </div>
  )
}

export default connect(
  (state, ownProps) => {
    const { myMissions } = state
    return {
      state: { myMissions }
    }
  }
    // ({ post: state.postsById[ownProps.postId] })
)(withRouter(ModalMyClass))