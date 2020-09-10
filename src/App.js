import React, { useEffect, useContext } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Profile from './components/Profile/Profile'
import MyMissions from './components/MyMissions/MyMissions'
import Menu from './components/Menu/Menu'
import MyClasses from './components/MyClasses/MyClasses'
import MySkills from './components/MySkills/MySkills'
import RootModal from './components/RootModal/RootModal'

import { FirebaseContext } from './services/firebaseService'

import './App.css'
import 'nes.css/css/nes.min.css'

function App({state}) {
  const { api } = useContext(FirebaseContext)
  useEffect(( ) => {
    api.getProfileUserdata(1)
    api.getClasses()
    api.getMissions()
    api.getSkills() 
  }, [api])
  const menu = <Menu></Menu>
  return (
    <div className="game-card">
      <BrowserRouter>
        <Switch>
          <Route path='/' exact>{menu}<Profile></Profile></Route>
          <Route path='/classes'>{menu}<MyClasses></MyClasses></Route>
          <Route path='/skills'>{menu}<MySkills></MySkills></Route>
          <Route path='/missions' exact>{menu}<MyMissions></MyMissions></Route>
        </Switch>
        <RootModal></RootModal>
      </BrowserRouter>
    </div>
  );
}

export default connect(
  (state) => {
    const { myData, myMissions, mySkills, myClasses } = state;
    return {
      state: { myData, myMissions, mySkills, myClasses }
    };
  }
)(App);
