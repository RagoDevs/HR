import React from 'react'
import './Table.css'
import person from '../../../../Assets/employee/person.jpg'

function Table() {
    return (
        <div className='emply-table'>
            <table>
                <tr>
                    <th>Employees Name</th>
                    <th>Status</th>
                </tr>
                <tr>
                    <td>
                        <img src={person} alt="" />
                        John Doe</td>
                    <td><p>Present</p></td>
                </tr>
            </table>
        </div>
    )
}

export default Table
