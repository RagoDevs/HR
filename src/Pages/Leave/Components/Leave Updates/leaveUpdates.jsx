import React, { useState, useEffect } from 'react'
import './leaveUpdates.css'
import personal from '../../../../Assets/leave/user.png'
import { useNavigate } from 'react-router-dom';
import { base_url } from '../../constant'


function LeaveUpdates() {
    const token = localStorage.getItem('siteToken');
    const expiry = localStorage.getItem('siteExpiry')
    const [onLeave, setOnleave] = useState();
    const [upComing, setUpComing] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const checkExpiry = () => {
            if (Date.now() / 1000 > expiry) {
                navigate('/');
                return true;
            }
            return false;
        };
        const fetchOnLeave = async () => {
            try {
                const response = await fetch(`${base_url}/auth/leaves/onleave`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json()
                //console.log('fetched', data)
                setOnleave(data)
            }
            catch (error) {
                console.error('Error fetching employees:', error);
            }
}
if (!checkExpiry()) {
    fetchOnLeave();
}

}, [token, expiry, navigate]);

useEffect(() => {
    const checkExpiry = () => {
        if (Date.now() / 1000 > expiry) {
            navigate('/');
            return true;
        }
        return false;
    };
    const fetchUpcoming = async () => {
        try {
            const response = await fetch(`${base_url}/auth/leaves/upcoming`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            //console.log('fetched', data)
            setUpComing(data)
        }
        catch (error) {
            console.error('Error fetching employees:', error);
        }
}
if (!checkExpiry()) {
fetchUpcoming();
}
}, [token, expiry, navigate]);

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
                    {onLeave && onLeave.length > 0 ? (
                        onLeave.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <img src={personal} alt="" />
                                        {item.employee_name}</td>
                                    <td><p>{item.end_date.split('T')[0]}</p></td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr className="leave-no-data" >
                            <td  colSpan='2'>
                                No-One is on Leave
                            </td>
                        </tr>
                    )}
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
                    {upComing && upComing.length > 0 ? (
                        upComing.map((item, index) => {
                            return (
                                <tr>
                                    <td>
                                        <img src={personal} alt="" />
                                        Jane Doe</td>
                                    <td><p>May 09</p></td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr className="leave-no-data" >
                            <td  colSpan='2'>
                                No Upcoming Leave
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
)
}

export default LeaveUpdates
