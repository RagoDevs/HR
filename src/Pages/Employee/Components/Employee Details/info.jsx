import React from 'react'
import './info.css'
import person from '../../../../Assets/employee/person.jpg'
import attach from '../../../../Assets/employee/attach.png'
import AddContract from '../Contract/AddContract'
import EditEmployee from '../EditEmployee/EditEmployee'
import EditContract from '../EditContract/EditContract'

const Info = ({ combinedData }) => {
    combinedData = combinedData || {}
    const contractDetails = combinedData[0] || {}

    const emailHandleClick = () => {
        const toEmail = combinedData.email
        const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${toEmail}`
        window.location.href = mailtoLink;
    }
    const openAttachment = () => {
        window.open(contractDetails.attachment, '_blank')
    };

    return (
        <div className="employee-details">
            <div className="details-header">
                <img src={person} alt="" />
                <div className="employee-title">
                    <h2>{combinedData.employee_name}</h2>
                    <p>{combinedData.job_title}</p>
                </div>
                <div className="email-contrct">
                    <button onClick={emailHandleClick}>Send Email</button>
                    <AddContract combinedData={combinedData} />
                </div>
            </div>
            <div className="personal-details">
                <div className="psdetails-header">
                    <h4>General Details</h4>
                    <EditEmployee combinedData={combinedData} />
                </div>
                <div className="psdetails-main">
                    <div className="psdetails-wrapper">
                        <div className="psdetails-item">
                            <h4>Full name</h4>
                            <h3>{combinedData.employee_name}</h3>
                        </div>
                        <div className="psdetails-item">
                            <h4>Email</h4>
                            <h3>{combinedData.email}</h3>
                        </div>
                        <div className="psdetails-item">
                            <h4>Phone Number</h4>
                            <h3>{combinedData.phone}</h3>
                        </div>
                    </div>
                    <div className="psdetails-wrapper">
                        <div className="psdetails-item">
                            <h4>Join Date</h4>
                            <h3>{combinedData.joining_date.split('T')[0] || ''}</h3>
                        </div>
                        <div className="psdetails-item">
                            <h4>Position Title</h4>
                            <h3>{combinedData.job_title}</h3>
                        </div>
                        <div className="psdetails-item">
                            <h4>Role</h4>
                            <h3>{combinedData.role_name}</h3>
                        </div>
                    </div>
                    <div className="psdetails-wrapper">
                        <div className="psdetails-item">
                            <h4>Department</h4>
                            <h3>{combinedData.department}</h3>
                        </div>
                        <div className="psdetails-item">
                            <h4>Address</h4>
                            <h3>{combinedData.address}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contract-info">
                <div className="psdetails-header">
                    <h4>Contract Information</h4>
                    <EditContract combinedData={combinedData} />
                </div>
                <div className="contract-main">
                    <div className="contract-wrapper">
                        <div className="psdetails-item">
                            <h4>Contract Type</h4>
                            <h3>{contractDetails.contract_type}</h3>
                        </div>
                        <div className="psdetails-item">
                            <h4>Start Date</h4>
                            <h3>{contractDetails?.start_date?.split('T')[0] || ''}</h3>
                        </div>
                    </div>
                    <div className="contract-wrapper">
                        <div className="psdetails-item">
                            <h4>Period</h4>
                            <h3>{contractDetails.period}</h3>
                        </div>
                        <div className="psdetails-item">
                            <h4>End Date</h4>
                            <h3>{contractDetails?.end_date?.split('T')[0] || ''}</h3>
                        </div>
                    </div>
                    <div className="contract-wrapper">
                        <div className="psdetails-item">
                            <h4>Attachment</h4>
                            <div className="attach-box"  onClick={openAttachment}>
                                <img src={attach} alt="" />
                            <h3>Contract </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
};

export default Info;
