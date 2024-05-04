import React, {useState} from 'react'
import check from '../../../../Assets/leave/check.png'
import deny from '../../../../Assets/leave/delete.png'
import './Table.css'

function Table() {

    const [toggle, setToggle] = useState(1);

    function updateToggle(id) {
        setToggle(id)
    }
    return (
        <div className="leave-table">
            <h3>Employee Leaves</h3>
            <div className="leavetb-tabs">
                <ul>
                    <li className={toggle === 1 ? 'active-tabs' : 'tabs'} onClick={() => updateToggle(1)}>Request
                        <span className='notification'>2</span>
                    </li>
                    <li className={toggle === 2 ? 'active-tabs' : 'tabs'} onClick={() => updateToggle(2)}>History</li>
                </ul>
            </div>
            <div className="tb-table">
                <div className={toggle === 1 ? 'active-tbcontent' : 'tbcontent'}>
                    <div className="request-table">
                        <table>
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Employee Name</th>
                                <th>Department</th>
                                <th>Type</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>John Doe</td>
                                <td>Administration</td>
                                <td>Annual</td>
                                <td>1-1-2024</td>
                                <td>10-1-2024</td>
                                <td></td>
                                <td>
                                    <div className="status-icons">
                                        <img src={check} alt="" />
                                        <img src={deny} alt="" />
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={toggle === 2 ? 'active-tbcontent' : 'tbcontent'}>
                    <div className="history-table">
                        <table>
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Employee Name</th>
                                <th>Department</th>
                                <th>Type</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                                <th>Reviewed by</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>John Doe</td>
                                <td>Administration</td>
                                <td>Annual</td>
                                <td>1-1-2024</td>
                                <td>10-1-2024</td>
                                <td>Approved</td>
                                <td>
                                    Jane Doe
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
                    
                    
                

    
    )
}

export default Table
