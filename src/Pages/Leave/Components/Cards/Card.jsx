import React, { useState, useEffect } from 'react'
import './Card.css'
import sick from '../../../../Assets/leave/sick.png'
import personal from '../../../../Assets/leave/user.png'
import paid from '../../../../Assets/leave/pay.png'
import annual from '../../../../Assets/leave/annual.png'
import { useNavigate } from 'react-router-dom'
import { base_url } from '../../../../constant'

function Card() {
    const token = localStorage.getItem('siteToken');
    const expiry = localStorage.getItem('siteExpiry');
    const [leaveCount, setLeaveCount] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const checkExpiry = () => {
            if (Date.now() / 1000 > expiry) {
                navigate('/');
                return true;
            }
            return false;
        };

        const fetchEmployees = async () => {
            try {
                const response = await fetch(`${base_url}/auth/leaves/counts`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json();
                setLeaveCount(data);

            }
            catch (error) {
                console.error('Error fetching employees:', error);
            }
        }

        if (!checkExpiry()) {
            fetchEmployees();
        }
    }, [token, expiry, navigate]);

    return (
        <div className="leave-cards">
            
            <div className="leave-card">
                <img src={sick} alt="sick" />
                <div className="lvcard-text">
                    <h3>{leaveCount.sick}</h3>
                    <h5>Sick Leave</h5>
                </div>
            </div>
            <div className="leave-card">
                <img src={personal} alt="person" />
                <div className="lvcard-text">
                    <h3>{leaveCount.personal}</h3>
                    <h5>Personal Leave</h5>
                </div>
            </div>    
            <div className="leave-card">
                    <img src={paid} alt="paid" />
                    <div className="lvcard-text">
                        <h3>{leaveCount.paid}</h3>
                        <h5>Paid Leave</h5>
                    </div>
             </div>
                
            <div className="leave-card">
                    <img src={annual} alt="annual" />
                    <div className="lvcard-text">
                        <h3>{leaveCount.annual}</h3>
                        <h5>Annual Leave</h5>
                    </div>
            </div>

        </div>
        
    )
}

export default Card
