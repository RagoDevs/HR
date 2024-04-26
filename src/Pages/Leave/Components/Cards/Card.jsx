import React from 'react'
import './Card.css'
import sick from '../../../../Assets/leave/sick.png'
import personal from '../../../../Assets/leave/user.png'
import paid from '../../../../Assets/leave/pay.png'
import annual from '../../../../Assets/leave/annual.png'

function Card() {
    return (
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
        
    )
}

export default Card
