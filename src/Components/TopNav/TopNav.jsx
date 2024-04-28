import React from 'react'
import './TopNav.css';
import logo from '../../Assets/images/logo.png'
import exit from '../../Assets/images/exit.png'
function TopNav() {
    return (
        <div className='topnav'>
            <div className='topnav-logo'>
                <img src={logo} alt="logo" />
                <div className='topnav-logotext'>
                <h4>SJUI</h4>
                <h5>HR system</h5>
                </div>
            </div>
            <div className='topnav-logout'>
                <img src={exit} alt="logout icon" />
                <h5>LOGOUT</h5>
            </div>
        </div>
    )
}

export default TopNav
