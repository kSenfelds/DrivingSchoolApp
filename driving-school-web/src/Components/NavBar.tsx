import React from 'react'
import { NavLink } from 'react-router-dom';
import '../Styles/NavBar.scss';

export const NavBar = () => {
  return (
    <nav className='nav-bar'>
        <ul>
            <li key={"/"}><NavLink to={"/"}>Register</NavLink></li>
            <li key={'/students'}><NavLink to={"/students"}>Manage Students</NavLink></li>
        </ul>
    </nav>
  )
}

