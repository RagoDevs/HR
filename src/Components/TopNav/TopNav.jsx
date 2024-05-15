import React, { useState } from 'react'
import './TopNav.css';
import logo from '../../Assets/images/logo.png'
import exit from '../../Assets/images/exit.png'
import bar from '../../Assets/images/bar.png'
import Sidebar from '../SideBar/SideBar'
import { useAuth } from '../../RoutesAuth/AuthProvider';


function TopNav() {

    const [isVisible, setIsVisible] = useState(false);

    const handleClick = () => {
        setIsVisible(!isVisible)
    }

    let auth = useAuth();

    const handleSignout = async () => {
        try {
          await auth.signout(); 
        } catch (error) {
          console.error('Error signing out:', error);
        }
    }; 

    return (
        <div className='topnav'>
            <div className='topnav-logo'>
                <div className="menu-bar">
                    <img src={bar} alt="" 
                    onClick={handleClick}
                    />
                    {isVisible ? <Sidebar /> : ''}
                </div>
                <img src={logo} alt="logo" />
                <div className='topnav-logotext'>
                    <h4>SJUT</h4>
                    <h5>HR system</h5>
                </div>
            </div>
            <div className='topnav-logout' onClick={handleSignout}>
                <img src={exit} alt="logout icon" />
                <h5>LOGOUT</h5>
            </div>
        </div>
    )
}

export default TopNav
