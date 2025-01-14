import React, { useState, useEffect } from 'react'
import check from '../../../../Assets/leave/check.png'
import deny from '../../../../Assets/leave/delete.png'
import edit from '../../../../Assets/leave/edit.png'
import searchIcon from '../../../../Assets/leave/search.png'
import infoIcon from '../../../../Assets/leave/info.png'
import './Table.css'
import classNames from 'classnames'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { base_url } from '../../constant'

function Table() {

    const [toggle, setToggle] = useState(1);
    const [search, setSearch] = useState('');

    function updateToggle(id) {
        setToggle(id)
    }

    const [requests, setRequests] = useState([]);
    const [leaveHistory, setLeaveHistory] = useState([]);
    const token = localStorage.getItem('siteToken')
    const [unseenCount, setUnseenCount] = useState(0);
    const [hoveredRow, setHoveredRow] = useState(null);
    const [hoverPosition, setHoverPosition] = useState({ top: 0, left: 0 });
    const [isEditing, setIsEditing] = useState(false);
    const [editFormData, setEditFormData] = useState({
        employee_name: '',
        start_date: '',
        end_date: ''
    });

    const [editIndex, setEditIndex] = useState(null);



    useEffect(() => {
        fetch(`${base_url}/auth/leaves`, {
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
                    statusText: request.seen ? (request.approved ? "Approved" : "Denied") : 'Pending'
                }));
                setStatuses(initialStatuses);

                const initialUnseenCount = data.filter(request => !request.seen).length;
                setUnseenCount(initialUnseenCount);

            })

            .catch(error => console.error('error fetching details', error));

    }, [token]);

    const [statuses, setStatuses] = useState(Array(requests.length).fill(""));

    const updateRequestStatus = (id, seen, approved) => {
        return fetch(`${base_url}/auth/leaves/response/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ seen, approved })
        })
            .then(response => response.json())
            .then(data => {
                toast.success("Leave status updated successfully!");
                return data;
            })
            .catch(error => {
                toast.error("Failed to update leave status");
                console.error('There was a problem with the fetch operation:', error);
            });

    };
    const handleApprove = (index) => {
        const requestId = requests[index].leave_id;
        updateRequestStatus(requestId, true, true).then(() => {
            const newStatuses = [...statuses];
            if (!newStatuses[index].seen) {
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
        toast.error("Error Occured!")
    };

    useEffect(() => {
        fetch(`${base_url}/auth/leaves/approved`, {
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

    const handleRowClick = (index, e) => {
        if (!e.target.closest('.status-icons')) {
            const rect = e.target.getBoundingClientRect();
            setHoveredRow(index);
            setHoverPosition({
                top: rect.top,
                left: rect.left
            });
        }
    };

    const handleMouseLeave = () => {
        setHoveredRow(null);
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditFormData({
            employee_name: requests[index].employee_name,
            start_date: requests[index].start_date.split('T')[0],
            end_date: requests[index].end_date.split('T')[0]
        });
        setIsEditing(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleEditSubmit = () => {

        const requestId = requests[editIndex].leave_id;
        fetch(`${base_url}/auth/leaves/${requestId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editFormData)
        })
            .then(response => response.json())
            .then(data => {
                const newRequests = [...requests];
                newRequests[editIndex] = {
                    ...newRequests[editIndex],
                    ...editFormData
                };
                setRequests(newRequests);
                setIsEditing(false);
                setEditIndex(null);
                toast.success("Leave Edited Succefuly!")
            })
            .catch(error => console.error('Error updating leave', error));
        toast.error("Error editing leave!")

        setIsEditing(false);
    };

    return (
        <>
            <ToastContainer />
            <div className="leave-table">
                <div className="leave-table-header">
                    <h3>Employee Leaves</h3>
                    <div className="lvsearch-component">
                        <img src={searchIcon} alt='search' />
                        <input
                            type="search"
                            placeholder='Search '
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>
                </div>

                <div className="leavetb-tabs">
                    <ul>
                        <li className={toggle === 1 ? 'active-tabs' : 'tabs'} onClick={() => updateToggle(1)}>Request

                            <span className={classNames('notification', { hidden: unseenCount === 0 })}>{unseenCount}</span>

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
                                        <th className='status-column'>Status</th>
                                        <th className='action_column'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests && requests.length > 0 ? (
                                    requests.filter((request) => {
                                        return search.toLowerCase() === ''
                                            ? request
                                            : request.employee_name.toLowerCase().includes(search.toLocaleLowerCase());
                                    }).map((request, index) => (
                                            <tr key={index}

                                                onMouseLeave={handleMouseLeave}
                                            >
                                                <td>{index + 1}</td>
                                                <td><div className="name-desc">
                                                    {request.employee_name}
                                                    <img
                                                        src={infoIcon}
                                                        alt=""
                                                        onClick={(e) => handleRowClick(index, e)}
                                                    />
                                                </div></td>
                                                <td>{request.department}</td>
                                                <td>{request.leave_type}</td>
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
                                                            <img
                                                                src={edit}
                                                                alt="Edit"
                                                                onClick={() => handleEdit(index)}
                                                            />
                                                        </div>
                                                    ) : (
                                                        statuses[index]?.statusText === 'Approved' || statuses[index]?.statusText === "Denied" ? (
                                                        'Checked'
                                                    ) : (
                                                        "Edited"
                                                    )
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                        <td colSpan='8' className='no-data'>
                                            No data
                                        </td>
                                    </tr>
                                    
                                    )}
                                </tbody>
                            </table>
                            {hoveredRow !== null && (
                                <div
                                    className="description"
                                    style={{
                                        position: 'absolute',
                                        top: hoverPosition.top + 10,
                                        left: hoverPosition.left + 10,
                                        backgroundColor: 'white',
                                        border: '1px solid #ccc',
                                        padding: '10px',
                                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                                        zIndex: 10,
                                    }}>
                                    {requests[hoveredRow].description}
                                </div>)}
                        </div>
                    </div>
                    {isEditing && (
                        <div className="edit-popup-bg">

                            <div className="edit-popup">
                                <div className="closeEdit-popup">
                                    <h2 onClick={() => setIsEditing(false)}>X</h2>
                                </div>
                                <h2>Edit Leave Request</h2>
                                <form onSubmit={handleEditSubmit}>
                                    <label>
                                        Employee Name:
                                    </label>
                                    <input
                                        type="text"
                                        name="employee_name"
                                        value={editFormData.employee_name}
                                        onChange={handleEditChange}
                                        readOnly
                                    />

                                    <label>
                                        Start Date:
                                    </label>
                                    <input
                                        type="date"
                                        name="start_date"
                                        value={editFormData.start_date}
                                        onChange={handleEditChange}
                                    />

                                    <label>
                                        End Date:
                                    </label>
                                    <input
                                        type="date"
                                        name="end_date"
                                        value={editFormData.end_date}
                                        onChange={handleEditChange}
                                    />

                                    <button type="submit">Save</button>

                                </form>
                            </div>
                        </div>
                    )}
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

                                    </tr>
                                </thead>
                                <tbody>
                                    {leaveHistory && leaveHistory.length > 0 ? (
                                    leaveHistory.filter((leaves) => {
                                        return search.toLowerCase() === ''
                                            ? true 
                                            : leaves.employee_name.toLowerCase().includes(search.toLocaleLowerCase());
                                    }).map((leaves, index) => (
                                            <tr key={index}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                <td>{index + 1}</td>
                                                <td>{<div className="name-desc">
                                                {leaves.employee_name}
                                                    <img
                                                        src={infoIcon}
                                                        alt=""
                                                        onClick={(e) => handleRowClick(index, e)}
                                                       />                              
                                                        </div>}                                                   
                                                </td>
                                                <td>{leaves.department}</td>
                                                <td>{leaves.leave_type}</td>
                                                <td>{leaves.start_date.split('T')[0]}</td>
                                                <td>{leaves.end_date.split('T')[0]}</td>
                                                <td>Approved</td>
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
                        {hoveredRow !== null && (
                            <div
                                className="description"
                                style={{
                                    position: 'absolute',
                                    top: hoverPosition.top + 10,
                                    left: hoverPosition.left + 10,
                                    backgroundColor: 'white',
                                    border: '1px solid #ccc',
                                    padding: '10px',
                                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                                    zIndex: 10,
                                }}>
                                {requests[hoveredRow].description}
                            </div>)}
                    </div>
                </div>
            </div>
        </div >
        </>
    )
}

export default Table
