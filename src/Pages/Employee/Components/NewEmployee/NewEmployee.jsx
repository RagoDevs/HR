import React, { useState } from 'react';
import './NewEmployee.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewEmployee() {

    const storedShowPopup = localStorage.getItem("showPopup");
    const [showPopup, setShowPopup] = useState(storedShowPopup === "true");

    const handleClick = () => {
        setShowPopup(true);
        localStorage.setItem("showPopup", "true");
    };

    const closePopup = () => {
        setShowPopup(false);
        localStorage.setItem("showPopup", "false");
    }

    const [form, setForm] = useState(() => {
        const storedFormData = localStorage.getItem('formData');
        return storedFormData ? JSON.parse(storedFormData) : {
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
        };
    });

    function handleChange(e) {
        const { name, value } = e.target;
        const isoDate = name === 'dob' || name === 'joining_date' ? new Date(value).toISOString().split('T')[0] : value
        const newFormData = {
            ...form,
            [name]: isoDate,
        };
        localStorage.setItem('formData', JSON.stringify(newFormData));
        setForm(newFormData);
    }


    let submit = async (e) => {

        try {
            const token = localStorage.getItem('siteToken');

            let res = await fetch("https://hrbe.eadevs.com/auth/employees", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(
                    form
                ),
            });
            if (res === 201) {
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
                localStorage.removeItem(FormData)
                toast.success("Created Succefuly!")
            } else {
                toast.error("Some Error Occurred!")
            }
        } catch (err) {
            console.log(err);
        }

    };

    return (
        <>
        <ToastContainer />
            <div className="new_emply">
                <h3>Employee Information</h3>
                <button onClick={handleClick}>Add New Employee</button>
                {showPopup ?
                    <div className="nwpopup_bg">
                        <div className="nwpopup_container">
                            <div className="closepopup">
                                <h2 onClick={closePopup}>X</h2>
                            </div>
                            <h3>Add New Employee</h3>
                            <div className="nwemply_form">
                                <form>
                                    <label>Employee Name</label>
                                    <input
                                        type="text"
                                        className='hhhh'
                                        name='name'
                                        value={form.name}
                                        onChange={handleChange}
                                    />
                                    <label>Date of Birth</label>
                                    <input
                                        type="date"
                                        className='hhhh'
                                        name='dob'
                                        value={form.dob}
                                        onChange={handleChange}
                                    />
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        className='hhhh'
                                        name='email'
                                        value={form.email}
                                        onChange={handleChange}
                                    />
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        className='hhhh'
                                        name='phone'
                                        value={form.phone}
                                        onChange={handleChange}
                                    />
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        className='hhhh'
                                        name='address'
                                        value={form.address}
                                        onChange={handleChange}
                                    />
                                    <div className="dropdowns">

                                        <select id="departments" name="department" onChange={handleChange}>
                                            <option value=''>Pick a Department</option>
                                            <option value='math'>Math</option>
                                            <option value='science'>Science</option>
                                            <option value='iT'>IT</option>
                                            <option value='accounts'>Accounts</option>
                                        </select>
                                        <select id="role" name="role" onChange={handleChange}>
                                            <option value=''>Pick a Role</option>
                                            <option value='administration'>Admin</option>
                                            <option value='hr'>Hr</option>
                                            <option value='staff'>Staff</option>
                                        </select>

                                    </div>

                                    <div className="dropdowns">

                                        <select id="job" name="job_title" onChange={handleChange}>
                                            <option value=''>Job Title</option>
                                            <option value='lecturer'>Lecturer</option>
                                            <option value='professor'>Professor</option>
                                            <option value='accountant'>Accountant</option>
                                            <option value='security'>Security</option>
                                        </select>
                                        <select id="gender" name="gender" onChange={handleChange}>
                                            <option value=''>Pick a Gender</option>
                                            <option value='male'>Male</option>
                                            <option value='female'>Female</option>

                                        </select>
                                    </div>
                                    <label>Joining Date</label>
                                    <input
                                        type="date"
                                        className='nwemply-date'
                                        name='joining_date'
                                        value={form.joining_date}
                                        onChange={handleChange}
                                    />
                                    <label>Password</label>
                                    <input
                                        type="text"
                                        className='hhhh'
                                        name='password'
                                        value={form.password}
                                        onChange={handleChange}
                                    />
                                    <button onClick={submit}>Submit</button>
                                </form>

                            </div>
                        </div>
                    </div>
                    : ""}
            </div>
        </>
    )
};

export default NewEmployee;
