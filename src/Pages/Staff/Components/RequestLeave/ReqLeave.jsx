import React, {useState} from 'react'
import './ReqLeave.css'

function ReqLeave() {

    const employee_id = localStorage.getItem('siteId');

    const ShowPopup = localStorage.getItem("showStaffLvRqPopup");
    const [showStaffLvRqPopup, setShowStaffLvRqPopup] = useState(ShowPopup === "true");

    const handleClick = () => {
        setShowStaffLvRqPopup(true);
        localStorage.setItem("showStaffLvRqPopup", "true");
    };

    const closePopup = () => {
        setShowStaffLvRqPopup(false);
        localStorage.setItem("showStaffLvRqPopup", "false");
    }

    const [form, setForm] = useState(() => {
        const storedFormData = localStorage.getItem('formData');
        return storedFormData ? JSON.parse(storedFormData) : {
            employee_id:  employee_id,
            start_date: '',
            end_date: '',
            description: '',
        };
    });

    function handleChange(e) {
        const { name, value } = e.target;
        const newFormData = {
            ...form,
            [name]: value,
        };
        localStorage.setItem('formData', JSON.stringify(newFormData));
        setForm(newFormData);

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

            let res = await fetch("https://hrbe.eadevs.com/auth/leaves", {
                method: "POST",
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
                    start_date: '',
                    end_date: '',
                    description: '',
                });
                localStorage.removeItem(FormData)
            } else {
                setMessage("Some error occurred");
            }
        } catch (err) {
            console.log(err);
        }

    };

    return (
        <div className="req-leave">
            <div className="staffRqLv-button">
                <button onClick={handleClick}>Request Leave</button>
            </div>
            {showStaffLvRqPopup ?
                <div className="staffRqLv-popup-bg">
                    <div className="staffRqLv-container">
                        <div className="closepopup">
                            <h2 onClick={closePopup}>X</h2>
                        </div>
                        <h3>Request Leave</h3>
                        <div className="staffRqLv-form">
                            <form >
                                <input
                                    type="text"
                                    className='employeeid'
                                    name='email'
                                    value={form.employee_id}
                                    onChange={handleChange}
                                />
                                <select id="contract" name="contract_type" onChange={handleChange}>
                                    <option value=''>To be Approved by</option>
                                    <option value='fixed-term'>Jane</option>
                                    <option value='full-time'>John</option>
                                    <option value='part-time'>Matt</option>
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
                                <textarea
                                    type="text"
                                    className='textarea'
                                    name='end_date'
                                    value={form.description}
                                    onChange={handleChange}
                                />
                                <button onClick={submit}>Request</button>
                            </form>
                            <div className="staffRqLv-error">
                            {message && <p>{message}</p>}
                            </div>
                        </div>
                    </div>
                </div>
                : ''}
        </div>


    )
}

export default ReqLeave
