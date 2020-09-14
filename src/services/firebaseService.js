import React, { createContext } from 'react'
import firebaseConfig from './firebaseConfig'
import app from 'firebase/app'
import 'firebase/database'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { setData, showModal } from '../actions'

// we create a React Context, for this to be accessible
// from a component later
const FirebaseContext = createContext(null)
export { FirebaseContext }

export default ({ children }) => {
  let firebase = {
    app: null,
    database: null
  }
  const dispatch = useDispatch()
  // check if firebase app has been initialized previously
  // if not, initialize with the config we saved earlier
  if (!app.apps.length) {
    app.initializeApp(firebaseConfig)
    firebase = {
      app: app,
      database: app.database(),

      api: {
        createClass,
        createSkill,
        createMission,
        getClasses,
        getSkills,
        getMissions,
        getProfileUserdata,
        getClass,
        getMission,
        getSkill,
        getStatusMissions,
        getTypeMissions,
        updateSkill,
        createSpecializationClass,
        updateSpecializationClass,
        deleteSpecializationClass
      }
    }
  }
  function getProfileUserdata(id){
    axios
      .get(`${firebaseConfig.databaseURL}/profile/${id}.json`)
      .then(response => {
        dispatch(setData(response.data, 'GET_DATA_USER'))
      })
      .catch(err => console.error(err))
  }
  function getClasses(){
    axios
      .get(`${firebaseConfig.databaseURL}/class.json`)
      .then(response => {
        dispatch(setData(response.data, 'GET_DATA_CLASSES'))
      })
      .catch(err => console.error(err))
  }
  function getSkills(){
    axios
      .get(`${firebaseConfig.databaseURL}/skill.json`)
      .then(response => {
        dispatch(setData(response.data, 'GET_DATA_SKILLS'))
      })
      .catch(err => console.error(err))
  }
  function getMissions(){
    axios
      .get(`${firebaseConfig.databaseURL}/mission.json`)
      .then(response => {
        dispatch(setData(response.data, 'GET_DATA_MISSIONS'))
      })
      .catch(err => console.error(err))
  }
  
  function getClass(id){
    axios
      .get(`${firebaseConfig.databaseURL}/class/${id}.json`)
      .then(response => {
        dispatch(setData({classes: response.data }))
      })
      .catch(err => console.error(err))
  }
  function getSkill(id){
    axios
      .get(`${firebaseConfig.databaseURL}/skill/${id}.json`)
      .then(response => {
        dispatch(setData({skills: response.data }))
      })
      .catch(err => console.error(err))
  }
  function getMission(id){
    axios
      .get(`${firebaseConfig.databaseURL}/mission/${id}.json`)
      .then(response => {
        dispatch(setData({missions: response.data }))
      })
      .catch(err => console.error(err))
  }

  function createClass(newClass){
    axios
      .post(`${firebaseConfig.databaseURL}/class.json`, newClass)
      .then(response => {
        dispatch(setData({ classes: response.data }))
      })
      .catch(err => console.error(err))
  }
  function createSkill(data){
    axios
      .post(`${firebaseConfig.databaseURL}/skill.json`, data)
      .then(response => {
      })
      .catch(err => console.error(err))
  }
  function createMission(newMission){
    axios
      .post(`${firebaseConfig.databaseURL}/mission.json`, newMission)
      .then(response => {
      })
      .catch(err => console.error(err))
  }

  function updateSkill(data){
    axios
      .put(`${firebaseConfig.databaseURL}/skill/${data.id}.json`, data)
      .then(response => {
        dispatch(setData(([{...response.data}]), 'UPDATE_DATA_SKILLS'))
        // getSkills()
        dispatch(showModal('MODAL_MY_SKILL', { skill: {...response.data} }))
      })
      .catch(err => console.error(err))
  }

  function createSpecializationClass(class_id, data){
    axios
      .post(`${firebaseConfig.databaseURL}/class/${class_id}/specialization.json`, data)
      .then(response => {
        console.log(response.data)
        // getClasses()
        dispatch(setData(({list: [{...data, id: response.data.name}], class_id: class_id}), 'UPDATE_SPECIALIZATION_CLASS'))
      })
      .catch(err => console.error(err))
  }
  function updateSpecializationClass(class_id, subclass_id, data){
    axios
      .put(`${firebaseConfig.databaseURL}/class/${class_id}/specialization/${subclass_id}.json`, data)
      .then(response => {
        console.log(response.data)
        // getClasses()
        dispatch(setData(({list: [{...response.data}], class_id: class_id}), 'UPDATE_SPECIALIZATION_CLASS'))
      })
      .catch(err => console.error(err))
  }
  function deleteSpecializationClass(class_id, subclass_id){
    
    axios
      .delete(`${firebaseConfig.databaseURL}/class/${class_id}/specialization/${subclass_id}.json`)
      .then(response => {
        console.log(response.data)
        // getClasses()
        dispatch(setData(({subclass_id, class_id}), 'DELETE_SPECIALIZATION_CLASS'))
      })
      .catch(err => console.error(err))
  }
  function getStatusMissions(){
    axios
      .get(`${firebaseConfig.databaseURL}/configurations/status_mission.json`)
      .then(response => {
        dispatch(setData(response.data, 'GET_STATUS_MISSIONS'))
      })
      .catch(err => console.error(err))
  }
  
  function getTypeMissions(){
    axios
      .get(`${firebaseConfig.databaseURL}/configurations/type_mission.json`)
      .then(response => {
        dispatch(setData(response.data, 'GET_TYPE_MISSIONS'))
      })
      .catch(err => console.error(err))
  }

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  )
}