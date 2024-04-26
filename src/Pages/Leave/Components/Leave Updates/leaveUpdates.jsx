import React from 'react'
import './leaveUpdates.css'
import personal from '../../../../Assets/leave/user.png'


function LeaveUpdates() {
    return (
        <div className="leave-updates">
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
    )
}

export default LeaveUpdates
