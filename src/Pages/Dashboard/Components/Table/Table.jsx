import React, { useState, useEffect } from "react";
import "./Table.css";
import { useNavigate } from "react-router-dom";
import searchIcon from '../../../../Assets/dash img/search.png'

function Table() {

    const [employees, setEmployees] = useState([]);
    const token = localStorage.getItem('siteToken');
    const expiry = localStorage.getItem('siteExpiry')
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

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

    return (
        <>
        <div className="dash-table-header">
            <h3>Employee Leaves</h3>
            <div className="dashsearch-component">
                <img src={searchIcon} alt='search' />
                    <input
                        type="search"
                        placeholder='Search'
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    
                </div>
            </div>
        <div className="dash-table">
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Job Title</th>
                        <th>Department</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {employees.filter((employee) => {
                            return search.toLowerCase() === ''
                                ? employee
                                : employee.employee_name.toLowerCase().includes(search.toLocaleLowerCase())
                        }).map((employee, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{employee.employee_name}</td>
                                <td>{employee.job_title}</td>
                                <td>
                                    {employee.department}
                                </td>
                                <td>{employee.is_present ? 'Present' : 'Absent'}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
        </>
    );
};

export default Table;
