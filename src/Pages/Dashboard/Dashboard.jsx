import React from 'react'
import TopNav from '../../Components/TopNav/TopNav';
import SideBar from '../../Components/SideBar/SideBar';
import Card from '../Dashboard/Components/Cards/Card'
import ReqAnn from './Components/Announcement and Requests/Req_Ann';
import Chart from './Components/Chart/Chart';
import Table from './Components/Table/Table'
import activity from '../../Assets/dash img/activity.png'
import './Dashboard.css'


function Dashboard() {
    
    return (
        <div className='dashboard'>
            <div className="topnav">
                <TopNav />
            </div>

            <div className='sidenav'>
                <SideBar />
            </div>
            <div className="dashmain">
                <div className="dashmain-area-one">
                    <h3>Dashboard</h3>
                    <Card />
                    <ReqAnn />
                </div>
                <div className="dashmain-area-two">
                <h3>Job Vaccancy Summary</h3>
                    <Chart />
                </div>
                <div className="dashmain-area-three">
                    
                    <Table />
                </div>
                <div className="dashmain-area-four">
                    <div className="area-four-items">
                        <h3>Activity Section</h3>
                        <img src={activity} alt="activity Icon" />
                        <h4>Coming soon</h4>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Dashboard
