import React, { useState, useEffect } from 'react'
import './LeaveHeader.css'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function LeaveHeader() {

    const employeeId = localStorage.getItem('siteId')
    const token = localStorage.getItem('siteToken');
    const expiry = localStorage.getItem('siteExpiry')
    const navigate = useNavigate();
    const storedShowPopup = localStorage.getItem("showCreateLeavePopup");
    const [showCreateLeavePopup, setShowCreateLeavePopup] = useState(storedShowPopup === "true");
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);



    useEffect(() => {
        const checkExpiry = () => {
            if (Date.now() / 1000 > expiry) {
                navigate('/');
                return true;
            }
            return false;
        };

        const fetchEmployees = async () => {
            try {
                const response = await fetch('https://hrbe.eadevs.com/auth/employees', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json();
                setEmployees(data);

            }
            catch (error) {
                console.error('Error fetching employees:', error);
            }
        }

        if (!checkExpiry()) {
            fetchEmployees();
        }
    }, [token, expiry, navigate]);

    const handleClick = () => {
        setShowCreateLeavePopup(true);
        localStorage.setItem("showCreateLeavePopup", "true");
    };

    const closePopup = () => {
        setShowCreateLeavePopup(false);
        localStorage.setItem("showCreateLeavePopup", "false");
        localStorage.removeItem(FormData)
    }

    const [form, setForm] = useState(() => {
        const storedFormData = localStorage.getItem('formData');
        return storedFormData ? JSON.parse(storedFormData) : {
            employee_id: '',
            approved_by_id: employeeId,
            leave_type: '',
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
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setSelectedEmployee(null);
    };

    const handleEmployeeSelect = (employee) => {
        setSelectedEmployee(employee);
        setSearchTerm(employee.name);
        setForm({
            ...form,
            employee_id: employee.employee_id
        });
    };

    const filteredEmployees = employees.filter(employee =>
        employee?.employee_name?.toLowerCase().includes(searchTerm)
    );


    let submit = async (e) => {
        e.preventDefault();
        setShowCreateLeavePopup(false);

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
            if (res.status === 201) {
                toast.success("Leave Created Succefuly!")
                setForm({
                    employee_id: '',
                    approved_by_id: '',
                    leave_type: '',
                    start_date: '',
                    end_date: '',
                    description: '',
                });

            } else {

            }
        } catch (err) {
            console.log(err);
        }
        localStorage.removeItem(FormData)
        localStorage.setItem("showCreateLeavePopup", "false");

    };



    return (
        <>
            <ToastContainer />
            <div className="leave-header">
                <h3>Leave</h3>
                <button onClick={handleClick}>Create Leave</button>
            </div>
            {showCreateLeavePopup ?
                <div className="contract-popup-bg">
                    <div className="creatalv-popup-container">
                        <div className="closepopup">
                            <h2 onClick={closePopup}>X</h2>
                        </div>
                        <h3>Create Leave</h3>
                        <div className="createLv-form">
                            <form >
                                <input
                                    type="text"
                                    className='employeeid'
                                    name='approved_by_id'
                                    value={form.approved_by_id}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    className='gggg1'
                                    name='employee_id'
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    placeholder='Type employee name'
                                />
                                <div className="form-group" style={{ position: 'relative' }}>
                                    {searchTerm && !selectedEmployee && (
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, border: '1px solid #ccc', maxHeight: '100px', overflowY: 'auto', position: 'absolute', backgroundColor: '#fff', width: '18rem', zIndex: 1 }}>
                                            {filteredEmployees.map((employee, index) => (
                                                <li
                                                    key={index}
                                                    style={{ padding: '5px', cursor: 'pointer' }}
                                                    onClick={() => handleEmployeeSelect(employee)}
                                                >
                                                    {employee.employee_name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {selectedEmployee && (
                                        <div style={{ padding: '5px', border: '1px solid #ccc', backgroundColor: '#fff' }}>
                                            {selectedEmployee.employee_name}
                                        </div>
                                    )}
                                </div>

                                <select id="leave-type" name="leave_type" onChange={handleChange}>
                                    <option value=''>Leave Type</option>
                                    <option value='annual'>Annual</option>
                                    <option value='paid'>Paid</option>
                                    <option value='sick'>Sick</option>
                                    <option value='personal'>Personal</option>
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
                                <label>Reason</label>
                                <textarea
                                    type="text"
                                    className='textarea1'
                                    name='description'
                                    value={form.description}
                                    onChange={handleChange}
                                />
                                <button onClick={submit}>Create</button>
                            </form>
                            <div className="contract-error">

                            </div>
                        </div>
                    </div>
                </div>
                : ''}
        </>
    )
}

export default LeaveHeader
