import React from 'react'
import './Payroll.css'
import TopNav from '../../Components/TopNav/TopNav'
import SideBar from '../../Components/SideBar/SideBar'
import comming from '../../Assets/images/coming.jpg'

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
                    <h2>Comming Soon</h2>
                </div>
            </div>
        </div>
    )
}

export default Payroll
