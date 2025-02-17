import React from 'react'
import './Calender.css'
import TopNav from '../../Components/TopNav/TopNav'
import SideBar from '../../Components/SideBar/SideBar'
import CalendarAntD from './Components/CalendarAntD'

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
                <div className="cal--body">
                        <CalendarAntD />
                </div>
            </div>
        </div>
    )
}

export default Calender
