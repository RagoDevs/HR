import React from 'react'
import {  NavLink } from 'react-router-dom'
import './SideBar.css'
import dashboard from '../../Assets/dash img/dashboard.png'
import employee from '../../Assets/dash img/employee.png'
import leave from '../../Assets/dash img/leave.png'
import money from '../../Assets/dash img/money.png'
import calender from '../../Assets/dash img/calendar.png'
import report from '../../Assets/dash img/file.png'
import documents from '../../Assets/dash img/documents.png'

function SideBar() {
    return (
        <div className='sidebar'>
            <div className='sidebar-menu'>
            <NavLink  to='/dashboard' className={({ isActive }) => (isActive ? "active" : "inactive")}>
                <div className='menu-list'>
                    <img src={dashboard} alt="" />
                    <h4>Dashboard</h4>

                </div>
                </NavLink>
                <NavLink  to='/employee' className={({ isActive }) => (isActive ? "active" : "inactive")}>
                    <div className='menu-list'>

                        <img src={employee} alt="" />

                        <h4>Employee</h4>

                    </div>
                </NavLink>
                <NavLink to='/leave'>
                    <div className='menu-list'>
                        <img src={leave} alt="" />
                        <h4>Leave</h4>
                    </div>
                </NavLink>
                <NavLink to='/payroll'>
                <div className='menu-list'>
                    <img src={money} alt="" />
                    <h4>Payroll</h4>
                </div>
                </NavLink>
                <NavLink to='/calender'>
                <div className='menu-list'>
                    <img src={calender} alt="" />
                    <h4>Calender</h4>
                </div>
                </NavLink>
                <NavLink to='/documents'>
                <div className='menu-list'>
                    <img src={documents} alt="" />
                    <h4>Documents</h4>
                </div>
                </NavLink>
                <NavLink to='/report'>
                <div className='menu-list'>
                    <img src={report} alt="" />
                    <h4>Report</h4>
                </div>
                </NavLink>
            </div>
        </div>
    )
}

export default SideBar
