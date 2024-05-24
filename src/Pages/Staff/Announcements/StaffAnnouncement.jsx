import React, { useState, useEffect } from 'react'
import './StaffAnnouncement.css'
import { useNavigate } from 'react-router-dom'
import user from '../../../Assets/staff/user.png'

function StaffAnnouncement() {
    const token = localStorage.getItem('siteToken')
    const expiry = localStorage.getItem('siteExpiry')
    const navigate = useNavigate();
    const [staffAnnouncement, setStaffAnnouncements] = useState([]);

    const checkExpiry = () => {
        if (Date.now() / 1000 > expiry) {
            navigate('/');
            return true;
        }
        return false;
    }

    useEffect(() => {
       
        const fetchAnnouncement = async () => {
            try {
                const response = await fetch(`https://hrbe.eadevs.com/auth/announcements/${new Date().toISOString()}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json()
                //console.log('fetched', data)
                setStaffAnnouncements(data)
            }
            catch (error) {
                console.error('Error fetching employees:', error);
            }
    }
    if (!checkExpiry()) {
    fetchAnnouncement();
   
    }
     // eslint-disable-next-line 
    }, [token, expiry, navigate]);

    return (
        <>
            <div className="staff-announcements">
            <div className="staffannouncements-container">
                        {staffAnnouncement.length === 0 ? (
                            <div><h3>No data available</h3></div>
                        ) : (
                            staffAnnouncement.map((item, index) => (
                                <div className="staffannounce-list" key={index}>
                                    <div className="announcer-header">
                                        <img src={user} alt="" />
                                    <h5>{item.created_by}</h5>
                                    </div>
                                    <h3>{item.description}</h3>
                                    <p>{item.announcement_date.split('T')[0]}</p>
                                </div>
                            ))
                        )}
                    </div>
            </div>
        </>
    )
}

export default StaffAnnouncement
