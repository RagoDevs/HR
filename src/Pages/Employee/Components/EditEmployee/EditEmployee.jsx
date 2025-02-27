import React, { useState, useEffect } from 'react'
import './EditEmployee.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import eyeIcon from '../../../../Assets/login/watch.png'
import eyeSlashIcon from '../../../../Assets/login/hidden.png'
import { base_url } from '../../../../constant';

const EditEmployee = ({ combinedData }) => {
    combinedData = combinedData || {};

    const storedEdEShowPopup = localStorage.getItem("EdEshowPopup");
    const [EdEshowPopup, setEdEShowPopup] = useState(storedEdEShowPopup === "true");

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    
    const handleClick = () => {  
        setEdEShowPopup(true);
        localStorage.setItem("EdEshowPopup", "true");
    };

    const closePopup = () => {
        setEdEShowPopup(false);
        localStorage.setItem("EdEshowPopup", "false");
    }

    const [form, setForm] = useState({
        name: '',
        dob: '',
        email: '',
        phone: '',
        address: '',
        department: '',
        role: '',
        job_title: '',
        gender: '',
        joining_date: '',
        password: '',

    });

    
    useEffect(() => {
        if (combinedData) {
        setForm({
            name: combinedData.employee_name,
            dob: combinedData.dob.split('T')[0],
            email: combinedData.email,
            phone: combinedData.phone,
            address: combinedData.address,
            department: combinedData.department,
            role: combinedData.role_name,
            job_title: combinedData.job_title,
            gender: combinedData.gender,
            joining_date: combinedData.joining_date.split('T')[0],
            password: combinedData.password,
        });
        
    }
    }, [combinedData]);


    function handleChange(e) {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })

    }

    let submit = async (e) => {
        e.preventDefault();
        setEdEShowPopup(false);

        try {
            const token = localStorage.getItem('siteToken')

            const isoForm = {
                ...form,
                dob: new Date(form.dob).toISOString(),
                joining_date: new Date(form.joining_date).toISOString(),
            }

            let res = await fetch(`${base_url}/auth/employees/${combinedData.employee_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(
                    isoForm
                ),
            });
            if (res.status === 201) {
                
                setForm({
                    name: '',
                    dob: '',
                    email: '',
                    phone: '',
                    address: '',
                    department: '',
                    role: '',
                    job_title: '',
                    gender: '',
                    joining_date: '',
                    password: '',
                });
                toast.success("Edited Succefuly!")
            } else {
                toast.error("Some Error Occurred!")
            }
        } catch (err) {
            console.log(err);
        }
        localStorage.setItem("EdEshowPopup", "false");
        window.location.reload();

    }
    return (
    <>
    <ToastContainer />
        <div className="edit_emply">
            <button onClick={handleClick}>Edit</button>
            {EdEshowPopup ?
                <div className="edpopup_bg">
                    <div className="edpopup_container">
                        <div className="closepopup">
                            <h2 onClick={closePopup}>X</h2>
                        </div>
                        <h3>Edit Employee Details</h3>
                        <div className="edemply_form">
                            <form>
                            <div className="input-split">
                            <div className="name-input">
                                <label>Employee Name</label>
                                <input
                                    type="text"
                                    className='hhhh'
                                    name='name'
                                    value={form.name}
                                    onChange={handleChange}
                                />
                                </div>
                                <div className="date-input">
                                <label>Date of Birth</label>
                                <input
                                    type="date"
                                    className='hhhhd'
                                    name='dob'
                                    value={form.dob}
                                    onChange={handleChange}
                                />
                                </div>
                                </div>
                                <div className="input-split">
                                <div className="email-input">
                                <label>Email</label>
                                <input
                                    type="text"
                                    className='hhhh'
                                    name='email'
                                    value={form.email}
                                    onChange={handleChange}
                                />
                                </div>
                                <div className="number-input">
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    className='hhhh'
                                    name='phone'
                                    value={form.phone}
                                    onChange={handleChange}
                                />
                                </div>
                                </div>
                                <label>Address</label>
                                <input
                                    type="text"
                                    className='hhhh'
                                    name='address'
                                    value={form.address}
                                    onChange={handleChange}
                                />
                                <div className="dropdowns">

                                    <select id="departments" name="department" onChange={handleChange} value={form.department}>
                                        <option value=''>Pick a Department</option>
                                        <option value='math'>Math</option>
                                        <option value='science'>Science</option>
                                        <option value='iT'>IT</option>
                                        <option value='accounts'>Accounts</option>
                                    </select>
                                    <select id="role" name="role" onChange={handleChange} value={form.role}>
                                        <option value=''>Pick a Role</option>
                                        <option value='administration'>Admin</option>
                                        <option value='hr'>Hr</option>
                                        <option value='staff'>Staff</option>
                                    </select>

                                </div>

                                <div className="dropdowns">

                                    <select id="job" name="job_title" onChange={handleChange} value={form.job}>
                                        <option value=''>Job Title</option>
                                        <option value='lecturer'>Lecturer</option>
                                        <option value='professor'>Professor</option>
                                        <option value='accountant'>Accountant</option>
                                        <option value='security'>Security</option>
                                    </select>
                                    <select id="gender" name="gender" onChange={handleChange} value={form.gender}>
                                        <option value=''>Pick a Gender</option>
                                        <option value='male'>Male</option>
                                        <option value='female'>Female</option>

                                    </select>
                                </div>
                                <div className="input-split">
                                <div className="join-input">
                                <label>Joining Date</label>
                                <input
                                    type="date"
                                    className='edemply-date'
                                    name='joining_date'
                                    value={form.joining_date}
                                    onChange={handleChange}
                                />
                                </div>
                                <div className="password-input">
                                <label>Password</label>
                                
                                 <div className="password-wrapper">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                className='hhhh'
                
                                                name='password'
                                                value={form.password}
                                                onChange={handleChange}
                                            
                                                required
                                            />
                                            <img
                                                src={showPassword ? eyeSlashIcon : eyeIcon}
                                                alt="Toggle Password Visibility"
                                                className="eye-icon"
                                                onClick={togglePasswordVisibility}
                                            />
                                        </div>
                                </div>
                                </div>
                                <button onClick={submit}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                : ""}
        </div>
        </>
    )
}

export default EditEmployee;
