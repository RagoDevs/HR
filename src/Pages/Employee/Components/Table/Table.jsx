import React from 'react'
import './Table.css'
import person from '../../../../Assets/employee/person.jpg'

const Table = ({employees,  onEmployeeClick}) => {
    const getClassForPresence = (isPresent) => {
        return isPresent ? 'present' : 'absent';
    };
    return (
        <div className='emply-table'>
            <table>
                <thead>
                <tr>
                    <th>Employee</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => {
                        return (
                        <tr key={employee.employee_id} className={getClassForPresence(employee.is_present)} onClick={() => onEmployeeClick(employee.employee_id)}>
                    <td>
                        <img src={person} alt="" />
                        {employee.employee_name}</td>
                    <td><p>{employee.is_present ? 'Present': 'Absent'}</p></td>
                </tr>
                    )
                 })}
                </tbody>
            </table>
        </div>
    )
}

export default Table
