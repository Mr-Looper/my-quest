import React from 'react'

import { showModal } from '../../actions'
import { useDispatch } from 'react-redux';

// import './ListClasses.css'

const ListClasses = (props) => {
  const { myClasses, children } = props
  let modal = ''
  const dispatch = useDispatch()
  const listClasses = myClasses.map((myClass, key) =>
    <div className="my-class" key={key}>
      <button type="button" className={`nes-btn is-${myClass.color} btn-class`}
      onClick={() => dispatch(showModal('MODAL_MY_CLASS', {myClass}))}
      >{myClass.name}</button>
      {children? children : ''}
    </div>
  );
  return (
    <div className="my-classes-list">
      {listClasses}
      {modal}
    </div>
  )
}
export default ListClasses