
import React, { useState, useEffect, useContext } from 'react'
import './MySkills.css'
import { useDispatch, connect } from 'react-redux';
import { showModal } from '../../actions'
import ListSkills from '../../shared/ListSkills/ListSkills';
import SelectorNes from '../../shared/SelectorNes/SelectorNes';
import { FirebaseContext } from '../../services/firebaseService';

const MySkills = ({ state }) => {
  const { mySkills, myClasses } = state
  const title = 'New skill'
  const { api } = useContext(FirebaseContext)
  const dispatch = useDispatch()
  let [listSkills, setListSkills] = useState([])
  let [showFilters, setShowFilters] = useState(false)
  const dataModal = { title: 'New skill'}
  const [filters, setFilters] = useState({
    class: 'all'
  })
  const handleSelectFilter = (type, value) => {
    let _filters = {...filters}
    _filters[type] = value
    setFilters(_filters)
  }
  const handleFilterMissions = (booleanFilter) => {
    const list = mySkills.filter(mission => {
      let missionBool = true
      for(let filter in filters){
        if(filters[filter].toString() !== 'all' && filters[filter].toString() !== mission[filter].toString() && booleanFilter){
          missionBool = false
        }
      }
      return missionBool
    }).map(mission => {
      mission.showDetails = false
      return mission
    })
    setListSkills(list)
    if(!booleanFilter){
      // handleSelectFilter('class', 'all')
      handleSelectFilter('class_id', 'all')
    }
  }
  const handleReloadSkills = () => {
    api.getSkills()
  }
  const handleModifySome = () => {
    let _list = [...mySkills]
    _list = _list.map(_e => {
      _e.color = 'violet'
      return _e
    })
    setListSkills(_list)
  }

  useEffect(() => {
    if (mySkills && mySkills.length > 0) {
      setListSkills([])
      setTimeout(() => setListSkills(mySkills), 0)
    }
  }, [mySkills])
  
  return (
    <div className="my-skills-card main-card">
      <div className="nes-container is-dark with-title my-skills">
        <p className="title">My skills</p>
        <div className="container-skill-buttons">
          <button type="button" className="nes-btn is-default btn-show-filters"
          onClick={() => setShowFilters(!showFilters)}>{!showFilters? 'Show':'Hide'} filters</button>
          <button type="button" className="nes-btn is-default btn-add-skill"
          onClick={() => handleReloadSkills()}>R</button>
          <button type="button" className="nes-btn is-default btn-add-skill"
          onClick={() => handleModifySome()}>S</button>
          <button type="button" className="nes-btn is-default btn-add-skill"
          onClick={() => dispatch(showModal('MODAL_NEW_SKILL', {...dataModal}))}>{title}</button>
        </div>
        <div className={`my-skills-filter ${!showFilters? 'hide-filter' : ''}`}>
          {myClasses && myClasses.length > 0?
            <SelectorNes title="Status"
            preselection={filters.class_id}
            callbackSelection={(idClass) => handleSelectFilter('class_id', idClass)}
            options={[{name: 'All', id: 'all'}].concat(myClasses)}></SelectorNes> : '' }
          <div className="my-skills-filter-buttons">
            <button className="nes-btn is-warning" onClick={() => handleFilterMissions(false)}>Clear</button>
            <button className="nes-btn is-success" onClick={() => handleFilterMissions(true)}>Filter</button>
          </div>
        </div>
        {listSkills.length > 0? 
          <ListSkills skills={listSkills} enableShowModal={true} enableModifySkill={true}>
          </ListSkills>
          : ''}
      </div>
    </div>
  )
}
export default connect(
  (state) => {
    const { mySkills, myClasses } = state;
    return {
      state: { mySkills, myClasses }
    };
  },
)(MySkills);