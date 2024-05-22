import React, { useState, useEffect } from 'react'
import './Req_Ann.css'

function ReqAnn() {
    const token = localStorage.getItem('siteToken')
    const [request, setRequest] = useState([]);
    const [popup, setPopup] = useState(false)

    const handleClick = () => {
        setPopup(!popup);
    }

    const closePopup = () => {
        setPopup(false);
    }
    const [form, setForm] = useState({
        title: '',
        message: '',
    })

    function handleChange(e) {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    function submit(e) {
        e.preventDefault();


    }


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
                const unseenRequests = data.filter(item => item.seen === false);
                setRequest(unseenRequests)
            })

            .catch(error => console.error('error fetching details', error));

    }, [token]);
    return (
        <div className='rq-ann-container'>
            <div className='req-wrapper'>
                <h3>New Leave Requests</h3>
                <div className="req-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                    {request && request.length > 0 ? (
                    request.map((item, index) => {
                        return (
                        <tr key={index}>
                            <td>{item.employee_name}</td>
                            <td>{item.created_at.split('T')[0]}</td>
                        </tr>
                        )})
                    ) : (
                        <tr className="dash-no-data" >
                        <td  >                    
                        No Requests
                        </td>
                    </tr>
                    )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="ann-wrapper">
                <h3>Announcements</h3>
                <div className="announce-list">
                    <h4>Board Meeting has been postponed</h4>
                    <p>2.2.2024</p>
                </div>
                <div className="announce-list">
                    <h4>Graduation will be on 17th</h4>
                    <p>2.2.2024</p>
                </div>
                <div className="create-announce">
                    <button onClick={handleClick}>Create Announcement</button>
                </div>
                {popup ?
                    <div className="announce-popup">
                        <div className="announce-box">
                        <div className="closepopup">
                            <h2 onClick={closePopup}>X</h2>
                        </div>
                            <h3>Create An Announcement</h3>
                            <div className="announce-form">
                                <form>
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        className='ann-title'
                                        name='title'
                                        value={form.title}
                                        onChange={handleChange}
                                    />
                                    <label>Description</label>
                                    <textarea
                                        type="text"
                                        className='ann-message'
                                        name='message'
                                        value={form.message}
                                        onChange={handleChange}
                                    />
                                </form>
                            </div>
                            <div className="ann-submit">
                            <button onClick={submit}>Submit</button>
                            </div>
                        </div>
                    </div>
                    : ""}
            </div>
        </div>
    )
}

export default ReqAnn
