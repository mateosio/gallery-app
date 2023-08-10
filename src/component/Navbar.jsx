import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import "../component/Navbar.css"
import logo from '../images/icon1.png';




export function Navbar (){
    
  const navigate = useNavigate();
  const handleClick = ()=>{
    navigate("/")
  };

    return (
      <div className='nav_container'>
        
        <div className='nav_icon' onClick={handleClick}>
          <img src={logo} alt="Logo de la app"/>
          <span>Gally Photos</span>
        </div>

        <div className='nav_links'>
          <NavLink className="NavLink" to="/">Home</NavLink>
          <NavLink className="NavLink" to="/search">Search</NavLink>
          <NavLink className="NavLink" to="/myPhotos">My Photos</NavLink>
       

        </div>

      </div>
    )
}