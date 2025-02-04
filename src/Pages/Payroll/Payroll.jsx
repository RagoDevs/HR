import React from 'react'
import './Payroll.css'
import TopNav from '../../Components/TopNav/TopNav'
import SideBar from '../../Components/SideBar/SideBar'
import Payheader from './Components/Payheader/Payheader'
import PayTable from './Components/Paytable/PayTable'

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
                <Payheader />
                <PayTable />
            </div>
        </div>
    )
}

export default Payroll
