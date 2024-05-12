import React, { useState } from 'react'
import './AddContract.css'

const AddContract = ({ combinedData }) => {
    combinedData = combinedData || {}
    const employee_id = combinedData.employee_id


    const storedShowPopup = localStorage.getItem("showContractPopup");
    const [showContractPopup, setShowContractPopup] = useState(storedShowPopup === "true");

    const handleClick = () => {
        setShowContractPopup(true);
        localStorage.setItem("showContractPopup", "true");
    };

    const closePopup = () => {
        setShowContractPopup(false);
        localStorage.setItem("showContractPopup", "false");
    }

    const [form, setForm] = useState(() => {
        const storedFormData = localStorage.getItem('formData');
        return storedFormData ? JSON.parse(storedFormData) : {
            employee_id:  employee_id,
            contract_type: '',
            start_date: '',
            end_date: '',
        };
    });


    function handleChange(e) {
        const { name, value } = e.target;
        const isoDate = name === 'start_date' || name === 'end_date' ? new Date(value).toISOString() : value
        const newFormData = {
            ...form,
            [name]: isoDate,
        };
        // Store the updated form data in localStorage
        localStorage.setItem('formData', JSON.stringify(newFormData));
        setForm(newFormData);

    }

    const [message, setMessage] = useState('');

    let submit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('siteToken')

            let res = await fetch("https://hrbe.eadevs.com/auth/contracts", {
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
                setMessage("Form submitted successfully");
                setForm({
                    employee_id: '',
                    contract_type: '',
                    start_date: '',
                    end_date: '',
                });
            } else {
                setMessage("Some error occurred");
            }
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div className="add-contract">
            <div className="addcntrct-button">
                <button onClick={handleClick}>Create Contract</button>
            </div>
            {showContractPopup ?
                <div className="contract-popup-bg">
                    <div className="cntrctpopup-container">
                        <div className="closepopup">
                            <h2 onClick={closePopup}>X</h2>
                        </div>
                        <h3>Add New Employee</h3>
                        <div className="contract-form">
                            <form >
                                <input
                                    type="text"
                                    className='employeeid'
                                    name='email'
                                    value={form.employee_id}
                                    onChange={handleChange}
                                />
                                <select id="contract" name="contract_type" onChange={handleChange}>
                                    <option value=''>Pick a Gender</option>
                                    <option value='fixed-term'>Fixed</option>
                                    <option value='full-time'>Full Time</option>
                                    <option value='part-time'>Part Time</option>
                                    <option value='temporary'>Temporary</option>
                                    <option value='internship'>Internship</option>
                                </select>
                                <label>Starting Date</label>
                                <input
                                    type="date"
                                    className='gggg'
                                    name='start_date'
                                    value={form.start_date}
                                    onChange={handleChange}
                                />
                                <label >Ending Date</label>
                                <input
                                    type="date"
                                    className='gggg'
                                    name='end_date'
                                    value={form.end_date}
                                    onChange={handleChange}
                                />
                                <button onClick={submit}>Create</button>
                            </form>
                            <div className="contract-error">
                            {message && <p>{message}</p>}
                            </div>
                        </div>
                    </div>
                </div>
                : ''}
        </div>
    )
}

export default AddContract
