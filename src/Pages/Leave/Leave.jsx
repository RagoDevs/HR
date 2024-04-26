
import './leave.css'
import TopNav from '../../Components/TopNav/TopNav'
import SideBar from '../../Components/SideBar/SideBar'
import LeaveHeader from './Components/Leave header/LeaveHeader'
import Card from './Components/Cards/Card'
import LeaveUpdates from './Components/Leave Updates/leaveUpdates'
import Table from './Components/Table/Table'



function Leave() {

    return (
        <div className='leave'>
            <div className="topnav">
                <TopNav />
            </div>
            <div className='sidenav'>
                <SideBar />
            </div>
            <div className="leave-main">
                <div className="lv-header-cards">
                    <LeaveHeader />
                    <Card />
                </div>
                <div className="lv-updates">
                    <LeaveUpdates />
                </div>
                <div className="lv-table">
                    <Table />
                </div>
            </div>
        </div>
    )
}

export default Leave
