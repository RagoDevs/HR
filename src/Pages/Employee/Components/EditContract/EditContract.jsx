import React, { useState, useEffect, useMemo } from 'react';
import './EditContract.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditContract = ({ combinedData }) => {

    combinedData = combinedData || {};


    const employee_id = combinedData.employee_id;
    const contractDetails = useMemo(() => combinedData[0] || {}, [combinedData]);



    const storedShowPopup = localStorage.getItem("showEdPopup");
    const [showEdPopup, setShowEdPopup] = useState(storedShowPopup === "true");

    const handleClick = () => {
        setShowEdPopup(true);
        localStorage.setItem("showEdPopup", "true");
    };

    const closePopup = () => {
        setShowEdPopup(false);
        localStorage.setItem("showEdPopup", "false");
    };

    const [form, setForm] = useState({
        employee_id: '',
        contract_type: '',
        start_date: '',
        end_date: '',

    });

    useEffect(() => {
        if (contractDetails) {

            setForm({
                employee_id: employee_id,
                contract_type: contractDetails.contract_type,
                start_date: contractDetails.start_date?.split('T')[0],
                end_date: contractDetails.end_date?.split('T')[0],
            });

        }
    }, [contractDetails, employee_id]);


    function handleChange(e) {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }


    let submit = async () => {

        try {
            const token = localStorage.getItem('siteToken');

            const isoForm = {
                ...form,
                start_date: new Date(form.start_date).toISOString(),
                end_date: new Date(form.end_date).toISOString(),
            };

            let res = await fetch(`https://hrbe.eadevs.com/auth/contracts/${contractDetails.contract_id}`, {
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
                    employee_id: '',
                    contract_type: '',
                    start_date: '',
                    end_date: '',
                });
                localStorage.removeItem('formData')
                toast.success("Contract Edited Succefuly!")
            } else {
                toast.success("Some error occurred!")
            }
        } catch (err) {
            console.log(err);
        }
        localStorage.setItem("showEdPopup", "false");
    };

    return (
        <>
            <ToastContainer />
            <div className="edit-contract">
                <div className="edcntrct-button">
                    <button onClick={handleClick}>Edit</button>
                </div>
                {showEdPopup ?
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
                                    <select id="contract" name="contract_type" onChange={handleChange} value={form.contract_type}>
                                        <option value=''>Contract Type</option>
                                        <option value='permanent'>Permanent</option>
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

                                </div>
                            </div>
                        </div>
                    </div>
                    : ''}
            </div>
        </>
    )

};

export default EditContract;
