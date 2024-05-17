import React, { useState, useEffect } from 'react'
import check from '../../../../Assets/leave/check.png'
import deny from '../../../../Assets/leave/delete.png'
import './Table.css'
import classNames from 'classnames'

function Table() {

    const [toggle, setToggle] = useState(1);

    function updateToggle(id) {
        setToggle(id)
    }

    const [requests, setRequests] = useState([]);
    const [leaveHistory, setLeaveHistory] = useState([]);
    const token = localStorage.getItem('siteToken')
    const [unseenCount, setUnseenCount] = useState(0);

    //conevrting from iso
    
    

    useEffect(() => {
        fetch('https://hrbe.eadevs.com/auth/leaves', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                //console.log('fetched', data)
                setRequests(data);
            

        const initialStatuses = data.map(request => ({
            seen: request.seen,
            approved: request.approved,
            statusText: request.seen ? (request.approved ? "Approved" : "Denied"): 'Pending'
        }));
        setStatuses(initialStatuses);

        const initialUnseenCount = data.filter(request => !request.seen).length;
        setUnseenCount(initialUnseenCount);

    })

        .catch(error => console.error('error fetching details', error));

    }, [token]);

    const [statuses, setStatuses] = useState(Array(requests.length).fill(""));

    const updateRequestStatus = (id ,seen, approved) => {
        return fetch(`https://hrbe.eadevs.com/auth/leaves/response/${id}`, {
            method: 'PUT', 
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ seen, approved })
        }).then(response => response.json());
    };
    const handleApprove = (index) => {
        const requestId = requests[index].leave_id;
        updateRequestStatus(requestId, true, true).then(() => {
        const newStatuses = [...statuses];
        if (!newStatuses[index].seen)  {
            setUnseenCount(prevCount => prevCount - 1);
        }
        newStatuses[index] = {
            ...newStatuses[index],
            seen: true,
            approved: true,
            statusText: "Approved"
        };
        setStatuses(newStatuses);
    }).catch(error => console.error('Error updating status', error));
    };

    const handleDeny = (index) => {
        const requestId = requests[index].leave_id;
        updateRequestStatus(requestId, true, false).then(() => {
        const newStatuses = [...statuses];
        if (!newStatuses[index].seen) {
            setUnseenCount(prevCount => prevCount - 1);
        }
          newStatuses[index] = {
            ...newStatuses[index],
            seen: true,
            approved: false,
            statusText: "Denied"
        }
        setStatuses(newStatuses);
    }).catch(error => console.error('Error updating status', error));
    };

    useEffect(() => {
        fetch('https://hrbe.eadevs.com/auth/leaves/approved', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                //console.log('fetchedhistory', data)
                setLeaveHistory(data);
            })
            .catch(error => console.error('error fetching details', error));

            }, [token]);
    return (
        <div className="leave-table">
            <h3>Employee Leaves</h3>
            <div className="leavetb-tabs">
                <ul>
                    <li className={toggle === 1 ? 'active-tabs' : 'tabs'} onClick={() => updateToggle(1)}>Request
                    
                        <span className={classNames('notification', {hidden: unseenCount === 0})}>{unseenCount}</span>
                    
                    </li>
                    <li className={toggle === 2 ? 'active-tabs' : 'tabs'} onClick={() => updateToggle(2)}>History</li>
                </ul>
            </div>
            <div className="tb-table">
                <div className={toggle === 1 ? 'active-tbcontent' : 'tbcontent'}>
                    <div className="request-table">

                        <table>
                            <thead>
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
                            </thead>
                            <tbody>
                                {requests.map((request, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{request.employee_name}</td>
                                            <td>Administration</td>
                                            <td>Annual</td>
                                            <td>{request.start_date.split('T')[0]}</td>
                                            <td>{request.end_date.split('T')[0]}</td>
                                            <td>{statuses[index] ? statuses[index].statusText : "Pending"}</td>
                                            <td>
                                                {!statuses[index]?.seen ? (
                                                    <div className="status-icons">
                                                        <img src={check}
                                                            alt=''
                                                            onClick={() => handleApprove(index)}
                                                        />
                                                        <img
                                                            src={deny}
                                                            alt="Deny"
                                                            onClick={() => handleDeny(index)}
                                                        />
                                                    </div>
                                                ) : 'Checked'
                                                }
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={toggle === 2 ? 'active-tbcontent' : 'tbcontent'}>
                    <div className="history-table">
                        <table>
                            <thead>
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
                            </thead>
                            <tbody>
                            {leaveHistory.map((leaves, index) => {
                                    return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{leaves.employee_name}</td>
                                    <td>Administration</td>
                                    <td>Annual</td>
                                    <td>{leaves.start_date.split('T')[0]}</td>
                                    <td>{leaves.end_date.split('T')[0]}</td>
                                    <td>Approved</td>
                                    <td>
                                        Edit
                                    </td>
                                </tr>
                                    )
})}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>





    )
}

export default Table
