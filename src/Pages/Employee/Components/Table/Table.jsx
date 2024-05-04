import React from 'react'
import './Table.css'
import person from '../../../../Assets/employee/person.jpg'

function Table() {
    return (
        <div className='emply-table'>
            <table>
                <thead>
                <tr>
                    <th>Employees Name</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <img src={person} alt="" />
                        John Doe</td>
                    <td><p>Present</p></td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Table
