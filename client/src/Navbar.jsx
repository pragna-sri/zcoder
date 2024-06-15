import React from 'react'
import { Link } from 'react-router-dom';
import { SiApacheflink } from "react-icons/si";
import { FaUserCircle } from "react-icons/fa";
const Navbar = () => {
  return (
    <nav className='nav'>
        <span className='logozz'>
            
            <SiApacheflink   />
        </span>
        
        <Link to="/" className='icon'>
            <span className='Z'>Z</span>CODER</Link>
        <ul>
            <li>
                <Link to="/Problems" className='pr'>Problems</Link>
            </li>
            <li>
                <Link to="/Calendar" className='pr'>Calendar</Link>
            </li>
            <li>
                <Link to="/public-problems" className='pr'>Dashboard</Link>
            </li>

            <li>
                
                <Link to="/Profile" className='prof'> 
                    <span className='proic'><FaUserCircle /></span> Profile</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar