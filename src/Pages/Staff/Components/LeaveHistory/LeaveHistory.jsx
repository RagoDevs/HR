import React, { useState, useEffect } from 'react'
import './leaveHistory.css'
import check from '../../../../Assets/staff/check.png'

function LeaveHistory() {
    const token = localStorage.getItem('siteToken')
    const employeeId = localStorage.getItem('siteId')
    const [leaveHistory, setLeaveHistory] = useState()

    useEffect(() => {
        fetch(`https://hrbe.eadevs.com/auth/leaves/employee/${employeeId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                //console.log('fetched', data)
                setLeaveHistory(data);

            })

            .catch(error => console.error('error fetching details', error));

    }, [token, employeeId]);

    const approved = leaveHistory?.filter(item => item.approve === true);
    return (
        <div className="leave-history-table">
            <table>
                <tbody>
                {approved && approved.length > 0 ? (
                     approved.map((item, index) => 
                        (
              <tr key={index}>
                <td>
                  <h5>Jun 1, 2023 - Jun 3, 2023</h5>
                  <p>Annual leave</p>
                </td>
                <td>
                  <img src={check} alt="" />
                </td>
              </tr>
                        ))
                ) : (
                    <tr >
                    <td colSpan='2' className='no-data'>
                    No data
                    </td>
                </tr>
                )}
              </tbody>
            </table>
        </div>
    )
}

export default LeaveHistory
