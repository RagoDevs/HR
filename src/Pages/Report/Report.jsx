import React from 'react'
import './Report.css'
import TopNav from '../../Components/TopNav/TopNav'
import SideBar from '../../Components/SideBar/SideBar'
import comming from '../../Assets/images/coming.png'

function Report() {
    return (
        <div className="report">
            <div className="topnav">
                <TopNav />
            </div>
            <div className="sidenav">
                <SideBar />
            </div>
            <div className="report-main">
                <div className="coming-soon">
                    <img src={comming} alt="" />
                    <h2>Comming Soon</h2>
                </div>
            </div>
        </div>
    )
}

export default Report
