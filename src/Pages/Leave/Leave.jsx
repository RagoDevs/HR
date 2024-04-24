import React, { useState } from 'react'
import './leave.css'
import TopNav from '../../Components/TopNav/TopNav'
import SideBar from '../../Components/SideBar/SideBar'
import sick from '../../Assets/leave/sick.png'
import personal from '../../Assets/leave/user.png'
import paid from '../../Assets/leave/pay.png'
import annual from '../../Assets/leave/annual.png'
import check from '../../Assets/leave/check.png'
import deny from '../../Assets/leave/delete.png'

function Leave() {
 
    const [toggle, setToggle] = useState(1);

    function updateToggle(id) {
        setToggle(id)
    }
    return (
        <div className='leave'>
            <TopNav />
            <div className='leave-container'>
                <SideBar />
                <div className='leave-main'>
                    <div className="leave-header">
                    <h3>Leave</h3>
                    <button>Create Leave</button>
                    </div>
                    <div className='leave-wrappers'>
                        <div className="leave-wrapper-one">
                            <div className="leave-box-one">
                                <div className="leave-cards">
                                    <div className="leave-card">
                                        <img src={sick} alt="sick" />
                                        <div className="lvcard-text">
                                            <h3>3</h3>
                                            <h5>Sick Leave</h5>
                                        </div>
                                    </div>
                                    <div className="leave-card">
                                    <img src={personal} alt="person" />
                                        <div className="lvcard-text">
                                            <h3>1</h3>
                                            <h5>Personal Leave</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="onleave-table">
                                    <h4>Currently OnLeave</h4>
                                <table>
                                    <tr>
                                        <th>Employees Name</th>
                                        <th>End Date</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src={personal} alt="" />
                                            John Doe</td>
                                        <td><p>May 02</p></td>
                                    </tr>
                                </table>
                                </div>
                            </div>
                            <div className="leave-box-two">
                            <div className="leave-cards">
                                    <div className="leave-card">
                                    <img src={paid} alt="paid" />
                                        <div className="lvcard-text">
                                            <h3>13</h3>
                                            <h5>Paid Leave</h5>
                                        </div>
                                    </div>
                                    <div className="leave-card">
                                    <img src={annual} alt="annual" />
                                        <div className="lvcard-text">
                                            <h3>5</h3>
                                            <h5>Annual Leave</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="onleave-table">
                                    <h4>Upcoming leave</h4>
                                <table>
                                    <tr>
                                        <th>Employees Name</th>
                                        <th>Start Date</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src={personal} alt="" />
                                            Jane Doe</td>
                                        <td><p>May 09</p></td>
                                    </tr>
                                </table>
                                </div>
                            </div>
                        </div>
                        <div className="leave-wrapper-two">
                            <div className="leave-table">
                                <h3>Employee Leaves</h3>
                                <div className="leavetb-tabs">
                                    <ul>
                                        <li className={toggle=== 1 ? 'active-tabs' : 'tabs'} onClick={()=>updateToggle(1)}>Request
                                        <span className='notification'>2</span>
                                        </li>
                                        <li className={toggle=== 2 ? 'active-tabs' : 'tabs'} onClick={()=>updateToggle(2)}>History</li>
                                    </ul>
                                </div>
                                <div className="tb-table">
                                <div className={toggle=== 1 ? 'active-tbcontent' : 'tbcontent'}>
                                    <div className="request-table">
                                        <table>
                                            <tr>
                                                <th>No</th>
                                                <th>Employee Name</th>
                                                <th>Department</th>
                                                <th>Type</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>John Doe</td>
                                                <td>Administration</td>
                                                <td>Annual</td>
                                                <td>1-1-2024</td>
                                                <td>10-1-2024</td>
                                                <td></td>
                                                <td>
                                                    <div className="status-icons">
                                                    <img src={check} alt="" />
                                                    <img src={deny} alt="" />
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <div className={toggle=== 2 ? 'active-tbcontent' : 'tbcontent'}>
                                    <div className="history-table">
                                    <table>
                                            <tr>
                                                <th>No</th>
                                                <th>Employee Name</th>
                                                <th>Department</th>
                                                <th>Type</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th>Status</th>
                                                <th>Reviewed by</th>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>John Doe</td>
                                                <td>Administration</td>
                                                <td>Annual</td>
                                                <td>1-1-2024</td>
                                                <td>10-1-2024</td>
                                                <td>Approved</td>
                                                <td>
                                                    Jane Doe
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Leave
