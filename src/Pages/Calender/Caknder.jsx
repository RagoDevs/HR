import React from 'react'
import './Calender.css'
import TopNav from '../../Components/TopNav/TopNav'
import SideBar from '../../Components/SideBar/SideBar'
import comming from '../../Assets/images/coming.jpg'

function Calender() {
    return (
        <div className="calender">
            <div className="topnav">
                <TopNav />
            </div>
            <div className="sidenav">
                <SideBar />
            </div>
            <div className="calender-main">
                <div className="comming-soon">
                    <img src={comming} alt="" />
                    <h2>Comming Soon</h2>
                </div>
            </div>
        </div>
    )
}

export default Calender
