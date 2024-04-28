import React, { useState } from 'react'
import './Req_Ann.css'

function ReqAnn() {

    const [form, setForm] = useState({
        title: '',
        message: '',
    })

    function handleChange (e) {
        const {name, value} = e.target
        setForm({...form, [name]: value})
    }

    function submit (e) {
        e.preventDefault();
        const announceData = {
            title: form.title,
            message: form.message,
        }
        
    }

    const [popup, setPopup] = useState(false)
    const handleClick = () => {
        setPopup(!popup);
    } 
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
                        <tr>
                            <td>John Doe</td>
                            <td>2-2-2024</td>
                        </tr>
                        <tr>
                            <td>Jane Doe</td>
                            <td>2-2-2024</td>
                        </tr>
                        <tr>
                            <td>Jane Doe</td>
                            <td>2-2-2024</td>
                        </tr>
                         <tr>
                            <td>Jane Doe</td>
                            <td>2-2-2024</td>
                        </tr>
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
                        <h3>Create An Announcement</h3>
                        <div className="announce-form">
                            <form>
                                <label>Title</label>
                                <input 
                                type="text" 
                                className='ann-form'
                                name='title'
                                value={form.title}
                                onChange={handleChange}
                                />
                            </form>
                        </div>
                        <button onClick={submit}>Submit</button>
                    </div>
                </div>
                : ""}
            </div>
        </div>
    )
}

export default ReqAnn
