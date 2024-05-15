import React, { useState, useEffect } from "react";
import "./Table.css";

function Table() {

    const [employees, setEmployees] = useState([]);
    const token = localStorage.getItem('siteToken');

    useEffect(() => {
        fetch('https://hrbe.eadevs.com/auth/employees', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setEmployees(data);
            })
            .catch(error => console.error('error fetching list:', error));
    }, [token]);

    return (
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
                    {employees.map((employee, index) => {
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
    );
};

export default Table;
