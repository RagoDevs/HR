import React, { useState } from 'react';
import './Table.css';
import person from '../../../../Assets/employee/person.jpg';
import searchIcon from '../../../../Assets/employee/search.png';

const Table = ({ employees, onEmployeeClick }) => {
    const getClassForPresence = (isPresent) => {
        return isPresent ? 'present' : 'absent';
    };

    const [search, setSearch] = useState('');

    return (
        <>
            <div className="employee-table-header">
                <div className="emply-main-header">
                    <h3>Employees</h3>
                </div>
                <div className="search-component">
                <img src={searchIcon} alt='search' />
                    <input
                        type="search"
                        placeholder='Search Employee'
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    
                </div>
            </div>
            <div className='emply-table'>
                <table>
                    <thead>
                        <tr>
                            <th>Employee</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.filter((employee) => {
                            return search.toLowerCase() === ''
                                ? employee
                                : employee.employee_name.toLowerCase().includes(search.toLocaleLowerCase())
                        }).map((employee) => {
                            return (
                                <tr key={employee.employee_id} className={getClassForPresence(employee.is_present)} onClick={() => onEmployeeClick(employee.employee_id)} >
                                    <td>
                                        <img src={person} alt="" />
                                        {employee.employee_name}</td>
                                    <td><p>{employee.is_present ? 'Present' : 'Absent'}</p></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
};

export default Table;
