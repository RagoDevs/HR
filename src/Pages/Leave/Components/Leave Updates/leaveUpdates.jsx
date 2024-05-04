import React from 'react'
import './leaveUpdates.css'
import personal from '../../../../Assets/leave/user.png'


function LeaveUpdates() {
    return (
        <div className="leave-updates">
            <div className="onleave-table">
                <h4>Currently OnLeave</h4>
                <table>
                    <thead>
                    <tr>
                        <th>Employees Name</th>
                        <th>End Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <img src={personal} alt="" />
                            John Doe</td>
                        <td><p>May 02</p></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="onleave-table">
                <h4>Upcoming leave</h4>
                <table>
                    <thead>
                    <tr>
                        <th>Employees Name</th>
                        <th>Start Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <img src={personal} alt="" />
                            Jane Doe</td>
                        <td><p>May 09</p></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LeaveUpdates
