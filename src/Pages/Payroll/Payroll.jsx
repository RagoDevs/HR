import React from 'react'
import './Payroll.css'
import TopNav from '../../Components/TopNav/TopNav'
import SideBar from '../../Components/SideBar/SideBar'
import comming from '../../Assets/images/coming.png'

function Payroll() {
    return (
        <div className="payroll">
            <div className="topnav">
                <TopNav />
            </div>
            <div className="sidenav">
                <SideBar />
            </div>
            <div className="payroll-main">
                <div className="comming-soon">
                    <img src={comming} alt="" />
                    <h2>Coming Soon</h2>
                </div>
            </div>
        </div>
    )
}

export default Payroll
