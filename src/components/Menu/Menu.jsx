import React from 'react';
import './Menu.css'
import { Link, withRouter } from 'react-router-dom'

const Menu = (props) => {
  const menu = [
    { route: '/', text: 'Profile', icon: 'nes-squirtle' },
    { route: '/classes', text: 'Classes', icon: 'nes-icon trophy is-medium' },
    { route: '/skills', text: 'Skills', icon: 'nes-icon star is-medium' },
    { route: '/missions', text: 'Missions', icon: 'nes-icon coin is-medium' },
  ]

  const listMenu = menu.map((item, index) => 
    <Link className={`item-menu ${props.location.pathname === item.route? 'active' : ''}`} key={index} to={item.route}>
      <div className="icon-item-menu"><i className={item.icon}></i></div>
      <div className="text-item-menu"><label htmlFor="">{item.text}</label></div>
    </Link>
  )
  
  return (
    <div className="menu-game is-dark">
      <div className="nes-container is-dark">
        {listMenu}
      </div>
    </div>
  )
}

export default withRouter(Menu)