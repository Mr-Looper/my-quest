import React, { useContext, useEffect, useState } from 'react';
import './MyMissions.css'

import ListMissions from '../../shared/ListMissions/ListMissions';
import SelectorNes from '../../shared/SelectorNes/SelectorNes';
import { useDispatch, connect } from 'react-redux';
import { showModal } from '../../actions'
import { FirebaseContext } from '../../services/firebaseService';

const MyMissions = ({ state }) => {
  useEffect(( ) => {
    api.getStatusMissions()
    api.getTypeMissions()
  }, [])
  const { myMissions, statusMissions, typeMissions } = state
  const { api } = useContext(FirebaseContext)
  const dataModal = { title: 'New mission', initialData: { startFrom: 'mission' } }
  const dispatch = useDispatch()
  let [listMissions, setListMissions] = useState(myMissions)
  let [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    type: 'all',
    status_id: 'all'
  })
  const handleSelectFilter = (type, value) => {
    // console.log(type, value)
    let _filters = {...filters}
    _filters[type] = value
    setFilters(_filters)
  }
  const handleFilterMissions = (booleanFilter) => {
    const list = myMissions.filter(mission => {
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
    setListMissions(list)
    if(!booleanFilter){
      handleSelectFilter('type', 'all')
      handleSelectFilter('status_id', 'all')
    }
  }
  useEffect(() => {
    if (myMissions) {
      setListMissions(myMissions)
    }
  }, [myMissions])
  return (
    <div className="my-missions-card is-dark main-card">
      <div className="nes-container is-dark with-title">
        <p className="title">My Missions</p>
        <div className="container-mission-buttons">
          <button type="button" className="nes-btn is-default btn-show-filters"
          onClick={() => setShowFilters(!showFilters)}>{!showFilters? 'Show':'Hide'} filters</button>

          <button type="button" className="nes-btn is-default btn-add-mission"
          onClick={() => dispatch(showModal('MODAL_NEW_MISSION', {...dataModal}))}>New mission</button>
        </div>
        <div className={`my-missions-filter ${!showFilters? 'hide-filter' : ''}`}>
          {typeMissions && typeMissions.length > 0? 
            <SelectorNes title="Types"
            preselection={filters.type}
            callbackSelection={(type) => handleSelectFilter('type', type)}
            options={[{name: 'All', id: 'all'}].concat(typeMissions)}></SelectorNes> : ''}
          {statusMissions && statusMissions.length > 0?
            <SelectorNes title="Status"
            preselection={filters.status_id}
            callbackSelection={(idStatus) => handleSelectFilter('status_id', idStatus)}
            options={[{name: 'All', id: 'all'}].concat(statusMissions)}></SelectorNes> : '' }
          <div className="my-missions-filter-buttons">
            <button className="nes-btn is-warning" onClick={() => handleFilterMissions(false)}>Clear</button>
            <button className="nes-btn is-success" onClick={() => handleFilterMissions(true)}>Filter</button>
          </div>
        </div>
        {listMissions.length > 0?
          <ListMissions missions={listMissions}/>
        : ''}
      </div>
    </div>
  )
}

export default connect(
  (state) => {
    const { myMissions, statusMissions, typeMissions } = state;
    return {
      state: { myMissions, statusMissions, typeMissions }
    };
  },
)(MyMissions);