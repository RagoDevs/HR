import React from 'react'
import TopNav from '../../Components/TopNav/TopNav'
import SideBar from '../../Components/SideBar/SideBar'
import Table from './Components/Table/Table'
import Info from './Components/Employee Details/info'
import './Employee.css'

function Employee() {
    return (
        <div className='employee'>
            <div className="topnav">
                <TopNav />
            </div>
            <div className="sidenav">
                <SideBar />
            </div>
            <div className="employee-main">
                <div className="employeemain-area-one">
                    <div className="emply-main-header">
                        <h3>Employees</h3>
                    </div>
                    <div className="employee-table">
                        <Table />
                    </div>
                </div>
                <div className="employeemain-area-two">
                <div className="emply-main-header">
                        <h3>Employee Information</h3>
                    </div>
                    <div className="employee-info">
                        <Info />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Employee
