import React from 'react'
import './Payroll.css'
import TopNav from '../../Components/TopNav/TopNav'
import SideBar from '../../Components/SideBar/SideBar'
import PayTable from './Components/Paytable/PayTable'
import Createpay from './Components/Createpay/Createpay'

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
                <Createpay />
                <div className="payroll-table">
                    <PayTable />
                </div>
            </div>
        </div>
    )
}

export default Payroll
