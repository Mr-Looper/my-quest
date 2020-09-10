import isLogged from './isLogged'
import layerModal from './layerModal'
import modal from './modal'
import { myData, myClasses, myMissions, mySkills } from './myData'
import { statusMissions, typeMissions } from './configurations'
import { combineReducers } from 'redux'

const combinedReducers = combineReducers({
  isLogged: isLogged,
  layerModal: layerModal,
  modal: modal,
  myData: myData,
  myClasses: myClasses,
  myMissions: myMissions,
  mySkills: mySkills,
  statusMissions: statusMissions,
  typeMissions: typeMissions
})

export default combinedReducers