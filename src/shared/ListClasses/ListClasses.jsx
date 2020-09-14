import React, { useContext } from 'react'

import { showModal } from '../../actions'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { FirebaseContext } from '../../services/firebaseService';

const ListClasses = (props) => {
  const { myClasses } = props
  const [listClasses, setListClasses] = useState(myClasses)
  const [currentSpec, setCurrentSpec] = useState('')
  const [disableAdd, setDisableAdd] = useState(false)
  const { api } = useContext(FirebaseContext)
  let modal = ''
  const dispatch = useDispatch()
  const handleShowSpecializations = (index) => {
    const _list = [...listClasses]
    _list[index].showSpecializations = !!!_list[index].showSpecializations
    setListClasses(_list)
  }
  const handleAddSpecialization = (indexClass, value) => {
    const _list = [...listClasses]
    _list[indexClass].specialization = (_list[indexClass].specialization || []).concat(
      {
        name: value,
        editSpec: true
      }
    )
    setCurrentSpec(value)
    setDisableAdd(true)
    setListClasses(_list)
  }
  const handleSetSpecialization = (value) => {
    setCurrentSpec(value)
  }
  const handleSaveSpecialization = (class_id, subclass_id) => {
    const _list = [...listClasses]
    const indexClass = _list.findIndex(_class => _class.id === class_id)
    const indexSpec = _list[indexClass].specialization.findIndex(_subclass => _subclass.id === subclass_id)
    delete _list[indexClass].specialization[indexSpec].editSpec
    _list[indexClass].specialization[indexSpec].name = currentSpec
    if(_list[indexClass].specialization[indexSpec].id){
      api.updateSpecializationClass(class_id, subclass_id, {..._list[indexClass].specialization[indexSpec], name: currentSpec})
    }else{
      api.createSpecializationClass(class_id, {..._list[indexClass].specialization[indexSpec], name: currentSpec})
    }
    // setListClasses(_list)
    setCurrentSpec('')
    setDisableAdd(false)
  }
  const handleEditSpecialization = (indexClass, indexSpec) => {
    const _list = [...listClasses]
    _list[indexClass].specialization[indexSpec].editSpec = !!!_list[indexClass].specialization[indexSpec].editSpec
    setCurrentSpec(_list[indexClass].specialization[indexSpec].name)
    setListClasses(_list)
    setDisableAdd(true)
  }
  const handleRemoveSpecialization = (class_id, subclassid) => {
    api.deleteSpecializationClass(class_id, subclassid)
  }

  // useEffect(() => {
  //   setListClasses(myClasses)
  // }, myClasses)
  console.log(listClasses)
  return (
    <div className="my-classes-list">
      {listClasses && listClasses.length > 0? 
        listClasses.map((_myClass, key) =>
        <div className="container-specialization" key={key}>
          <div className="my-class">
            <button type="button" className={`nes-btn is-${_myClass.color} btn-class`}
            onClick={() => dispatch(showModal('MODAL_MY_CLASS', {myClass: _myClass}))}
            >{_myClass.name}</button>
            <button type="button" className="nes-btn is-primary" onClick={() => handleShowSpecializations(key)}>¬</button>
          </div>
          {_myClass.showSpecializations? 
          <div className="my-class-specializations lists">
            {_myClass.specialization? 
            <div className="container-list">
              <ul className="list-classes nes-list is-circle is-dark">
                {_myClass.specialization.map((_spec, index) => 
                  <li key={index}>
                    {_spec.editSpec? 
                      <div className="nes-field is-inline">
                        <input type="text" className="nes-input is-dark" value={currentSpec} onChange={(e) => handleSetSpecialization(e.target.value)}/>
                      </div> 
                      :
                      <span className="section-text">{_spec.name}</span>
                    }
                    {_spec.editSpec?
                      <span className="section-buttons">
                        <span className="cursor--pointer nes-text-forced is-success font-size--25px edit-text"
                        onClick={() => handleSaveSpecialization(_myClass.id, _spec.id)}
                        >✔</span>
                      </span>
                      : 
                      <span className="section-buttons">
                        <span className="cursor--pointer nes-text-forced is-success font-size--25px edit-text"
                        onClick={() => handleEditSpecialization(key, index)}
                        >✎</span>
                        <span className="cursor--pointer"
                        onClick={() => handleRemoveSpecialization(_myClass.id, _spec.id)}
                        ><i className="nes-icon close icon-red is-small-1_5"></i></span>
                      </span>
                      }
                  </li>
                )}
              </ul>
              {!disableAdd?
                <button className="nes-btn is-success" onClick={() => handleAddSpecialization(key, '')}>Add</button>
                : <button className="nes-btn is-disabled">Add</button>
              }
            </div>
            : '' }
          </div>
          : ''}
        </div>
      ) : ''}
      {modal}
    </div>
  )
}
export default ListClasses