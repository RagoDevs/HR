import React, { useState, useEffect } from 'react'
import './leaveHistory.css'
import check from '../../../../Assets/staff/check.png'

function LeaveHistory() {
    const token = localStorage.getItem('siteToken')
    const employeeId = localStorage.getItem('siteId')
    const [leaveHistory, setLeaveHistory] = useState([]);


    const storedShowPopup = localStorage.getItem("staffLvHistoryPopup");
    const [staffLvHistoryPopup, setStaffLvHistoryPopup] = useState(storedShowPopup === "true");

    const handleClick = () => {
        setStaffLvHistoryPopup(true);
        localStorage.setItem("staffLvHistoryPopup", "true");
    };

    const closePopup = () => {
        setStaffLvHistoryPopup(false);
        localStorage.setItem("staffLvHistoryPopup", "false");
    };


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
        <>
            <div className="leave-history-table">
                <table>
                    <tbody>
                        {approved && approved.length > 0 ? (
                            approved.map((item, index) =>
                            (
                                <tr key={index}>
                                    <td>
                                        <h5>{item.start_date} - {item.end_date}</h5>
                                        <p>{item.leave_type} leave</p>
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
            <div className="see-history">
                <h5 onClick={handleClick}>See full history</h5>
            </div>
            {
                staffLvHistoryPopup ?
                    <div className="stafflv-history-popup-bg">
                        <div className="staffllv-history-popup-container">
                            <div className="closepopup">
                                <h2 onClick={closePopup}>X</h2>
                            </div>
                            <h3>Full Leave History</h3>
                            <div className="full-history">
                                <table>
                                    <tbody>
                                        {approved && approved.length > 0 ? (
                                            approved.map((item, index) =>
                                            (
                                                <tr key={index}>
                                                    <td>
                                                        <h5>{item.start_date} - {item.end_date}</h5>
                                                        <p>{item.leave_type} leave</p>
                                                    </td>
                                                    <td>
                                                        <img src={check} alt="" />
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr >
                                                <td colSpan='2' className='stafflv-no-data'>
                                                    No data
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    : ''
            }
        </>
    )
}

export default LeaveHistory
