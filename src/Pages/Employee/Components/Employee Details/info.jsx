import React from 'react'
import './info.css'
import person from '../../../../Assets/employee/person.jpg'

function Info() {

    return (
        <div className="employee-details">
            <div className="details-header">
                <img src={person} alt="" />
                <div className="employee-title">
                    <h2>John Doe</h2>
                    <p>Administrator</p>
                </div>
                <button>Send Email</button>
            </div>
            <div className="personal-details">
                <div className="psdetails-header">
                    <h4>General Details</h4>
                    <button>Edit</button>
                </div>
                <div className="psdetails-main">
                    <div className="psdetails-wrapper">
                        <div className="psdetails-item">
                            <h4>Full name</h4>
                            <h3>John Doe</h3>
                        </div>
                        <div className="psdetails-item">
                            <h4>Email</h4>
                            <h3>johndoe@email.com</h3>
                        </div>
                        <div className="psdetails-item">
                            <h4>Phone Number</h4>
                            <h3>0712345678</h3>
                        </div>
                    </div>
                    <div className="psdetails-wrapper">
                        <div className="psdetails-item">
                            <h4>Join Date</h4>
                            <h3>1-1-2024</h3>
                        </div>
                        <div className="psdetails-item">
                            <h4>Position Title</h4>
                            <h3>Administrator</h3>
                        </div>
                        <div className="psdetails-item">
                            <h4>Role</h4>
                            <h3>Employee</h3>
                        </div>
                    </div>
                    <div className="psdetails-wrapper">
                        <div className="psdetails-item">
                            <h4>Address</h4>
                            <h3>Kikuyu</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contract-info">
                <div className="psdetails-header">
                    <h4>Contract Information</h4>
                    <button>Edit</button>
                </div>
                <div className="contract-main">
                    <div className="contract-wrapper">
                        <div className="psdetails-item">
                            <h4>Contract Type</h4>
                            <h3>Fixed</h3>
                        </div>
                        <div className="psdetails-item">
                            <h4>Start Date</h4>
                            <h3>1-1-2024</h3>
                        </div>
                    </div>
                    <div className="contract-wrapper">
                        <div className="psdetails-item">
                            <h4>Period</h4>
                            <h3>2years</h3>
                        </div>
                        <div className="psdetails-item">
                            <h4>End Date</h4>
                            <h3>1-1-2026</h3>
                        </div>
                    </div>
                    <div className="contract-wrapper">
                        <div className="psdetails-item">
                            <h4>Attachment</h4>
                            <h3>Employement Contract pdf</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default Info
