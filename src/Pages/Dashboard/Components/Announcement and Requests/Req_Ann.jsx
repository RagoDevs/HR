import React, { useState, useEffect } from 'react'
import './Req_Ann.css'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ReqAnn() {
    const token = localStorage.getItem('siteToken')
    const expiry = localStorage.getItem('siteExpiry')
    const employeeId = localStorage.getItem('siteId')
    const [request, setRequest] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [announcePopup, setannouncePopup] = useState(false)
    const navigate = useNavigate();

    const handleClick = () => {
        setannouncePopup(!announcePopup);
    }

    const closePopup = () => {
        setannouncePopup(false);
        localStorage.removeItem('formData');
    }

    const checkExpiry = () => {
        if (Date.now() / 1000 > expiry) {
            navigate('/');
            return true;
        }
        return false;
    }

    useEffect(() => {

        const fetchLeaveRequest = async () => {
            try {
                const response = await fetch('https://hrbe.eadevs.com/auth/leaves', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json()
                //console.log('fetched', data)
                const unseenRequests = data.filter(item => item.seen === false);
                setRequest(unseenRequests)

            }
            catch (error) {
                console.error('Error fetching requests:', error);
            }
        }
        if (!checkExpiry()) {
            fetchLeaveRequest();

        }
        // eslint-disable-next-line 
    }, [token, expiry, navigate]);

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
                setAnnouncements(data)
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


    const [form, setForm] = useState(() => {
        const storedFormData = localStorage.getItem('formData');
        return storedFormData ? JSON.parse(storedFormData) : {
            createdby_id: employeeId,
            description: '',
            date: '',

        };
    });

    function handleChange(e) {
        const { name, value } = e.target;
        const isoDate = name === 'date' ? new Date(value).toISOString().split('T')[0] : value
        const newFormData = {
            ...form,
            [name]: isoDate,
        };
        localStorage.setItem('formData', JSON.stringify(newFormData));
        setForm(newFormData);
    }


    let submit = async () => {

        if (checkExpiry()) {
            return;
        }

        try {
            const token = localStorage.getItem('siteToken');
            const currentDate = new Date().toISOString();

            const updatedForm = {
                ...form,
                date: currentDate,
            };

            let res = await fetch("https://hrbe.eadevs.com/auth/announcements", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(
                    updatedForm
                ),
            });
            if (res.status === 201) {
                setForm({
                    createdby_id: '',
                    description: '',
                    date: '',
                });
                localStorage.removeItem(FormData)
                toast.success("Created Succefuly!")
            } else {
                toast.error("Some Error Occurred!")
            }
        } catch (err) {
            console.log(err);
        }
        setannouncePopup(false);

    };
    return (
        <>
            <ToastContainer />
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
                                        )
                                    })
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
                    <div className="announcements-container">
                        {announcements.length === 0 ? (
                            <div><h3>No data available</h3></div>
                        ) : (
                            announcements.map((item, index) => (
                                <div className="announce-list" key={index}>
                                    <h4>{item.description}</h4>
                                    <p>{item.announcement_date.split('T')[0]}</p>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="create-announce">
                        <button onClick={handleClick}>Create Announcement</button>
                    </div>
                    {announcePopup ?
                        <div className="announce-popup">
                            <div className="announce-box">
                                <div className="closepopup">
                                    <h2 onClick={closePopup}>X</h2>
                                </div>
                                <h3>Create An Announcement</h3>
                                <div className="announce-form">
                                    <form>
                                    <label>Announcement Date</label>
                                        <input
                                            type="date"
                                            className='ann-date'
                                            name='date'
                                            value={form.date}
                                            onChange={handleChange}
                                        />
                                        <label>Description</label>
                                        <textarea
                                            type="text"
                                            className='ann-message'
                                            name='description'
                                            value={form.description}
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
        </>
    )
}

export default ReqAnn
