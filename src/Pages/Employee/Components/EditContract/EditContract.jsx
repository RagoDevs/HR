import React, { useState, useEffect } from 'react';
import './EditContract.css';

const EditContract = ({ combinedData }) => {

    combinedData = combinedData || {};


    const employee_id = combinedData.employee_id;
    const contractDetails = combinedData[0] || {};

    const startDate = contractDetails.start_date?.split('T')[0];
    const endDate = contractDetails.end_date?.split('T')[0];

    const storedShowPopup = localStorage.getItem("showEdCPopup");
    const [showEdCPopup, setShowContractPopup] = useState(storedShowPopup === "true");

    const handleClick = () => {
        setShowContractPopup(true);
        localStorage.setItem("showEdCPopup", "true");
    };

    const closePopup = () => {
        setShowContractPopup(false);
        localStorage.setItem("showEdCPopup", "false");
    };

    useEffect(() => {
        setForm(combinedData || {});
    }, [combinedData]);

    const [form, setForm] = useState({
        employee_id: employee_id,
        contract_type: contractDetails.contract_type,
        start_date: startDate,
        end_date: endDate,

    });


    function handleChange(e) {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    const [message, setMessage] = useState('');

    let submit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('siteToken');

            const isoForm = {
                ...form,
                start_date: new Date(form.start_date).toISOString(),
                end_date: new Date(form.end_date).toISOString(),
            };

            let res = await fetch("https://hrbe.eadevs.com/auth/contracts", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(
                    isoForm
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
                localStorage.removeItem('formData')
            } else {
                setMessage("Some error occurred");
            }
        } catch (err) {
            console.log(err);
        }

    };

    return (
        <div className="edit-contract">
            <div className="edcntrct-button">
                <button onClick={handleClick}>Edit</button>
            </div>
            {showEdCPopup ?
                <div className="contract-popup-bg">
                    <div className="cntrctpopup-container">
                        <div className="closepopup">
                            <h2 onClick={closePopup}>X</h2>
                        </div>
                        <h3>Edit Contract</h3>
                        <div className="edcontract-form">
                            <form >
                                <input
                                    type="text"
                                    className='employeeid'
                                    name='email'
                                    value={form.employee_id}
                                    onChange={handleChange}
                                />
                                <select id="contract" name="contract_type" onChange={handleChange}>
                                    <option value=''>Contract Type</option>
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
                                <button onClick={submit}>Submit</button>
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

};

export default EditContract;
