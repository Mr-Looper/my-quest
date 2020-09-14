import React, { useState, useContext } from 'react'

import { hideModal } from '../../actions'
import Modal from '../../shared/Modal/Modal'
import ColorSelector from '../../shared/ColorSelector/ColorSelector'
import { useDispatch, connect } from 'react-redux'
import { FirebaseContext } from '../../services/firebaseService'

const ModalNewClass = (props) => {
  const { app, api } = useContext(FirebaseContext);
  const { title, layer } = props
  const [newClass, setNewClass] = useState('')
  const [color, setColor] = useState('error')
  const handleSelectColor = (_color) => {
    setColor(_color)
  }
  const handleSaveNewClass = () => {
    const createClass = {
      name: newClass,
      color: color,
      level: 0,
      current_xp: 0
    }
    api.createClass(createClass)
    dispatch(hideModal('MODAL_NEW_CLASS'))
  }
  const dispatch = useDispatch()
  
  return (
    <div>
      <Modal title={title} layer={layer}
      callbackCloseModal={() => dispatch(hideModal('MODAL_NEW_CLASS'))}
      callbackSaveModal={() => handleSaveNewClass()}
      close="Close" save={props.save}>
        <div className="nes-field">
          <label htmlFor="name_field">Your name</label>
          <input type="text" id="name_field" className="nes-input" value={newClass} onChange={(e) => setNewClass(e.target.value)}></input>
          <div className="margin-top--15px">
            <ColorSelector color={color} callbackSelectColor={(color) => handleSelectColor(color)}></ColorSelector>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default connect(
  (state, ownProps) => ({
    // post: state.postsById[ownProps.postId]
  })
)(ModalNewClass)