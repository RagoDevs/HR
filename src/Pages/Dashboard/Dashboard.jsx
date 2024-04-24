import React from 'react'
import TopNav from '../../Components/TopNav/TopNav';
import SideBar from '../../Components/SideBar/SideBar';
import './Dashboard.css'
import Total from '../../Assets/dash img/total em.png'
import present from '../../Assets/dash img/present.png'
import onleave from '../../Assets/dash img/onleave.png'
import { PieChart } from '@mui/x-charts/PieChart';
function Dashboard() {
    return (
        <div className='dashboard'>
            <TopNav />
            <div className='dash-container'>
                <SideBar />
                <div className='dash-main'>
                    <h3>Dashboard</h3>
                    <div className='dash-wrapper'>
                        <div className='container-one'>
                            <div className='dash-cards'>
                                <div className='dashcard'>
                                    <div className="dashcard-text">
                                        <h4>
                                            Total <br />
                                            Employees
                                        </h4>
                                        <h3>200</h3>
                                    </div>
                                    <div className="dashcard-icon">
                                        <img src={Total} alt="" />
                                    </div>
                                </div>
                                <div className='dashcard'>
                                    <div className="dashcard-text">
                                        <h4>
                                            Present <br />
                                            Employees
                                        </h4>
                                        <h3>150</h3>
                                    </div>
                                    <div className="dashcard-icon">
                                        <img src={present} alt="" />
                                    </div>
                                </div>
                                <div className='dashcard'>
                                    <div className="dashcard-text">
                                        <h4>
                                            Employee <br />
                                            Onleave
                                        </h4>
                                        <h3>10</h3>
                                    </div>
                                    <div className="dashcard-icon">
                                        <img src={onleave} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className='dash-boxes'>
                                <div className='dashbox-one'>
                                    <h4>announcement</h4>
                                </div>
                                <div className='dashbox-one'>
                                    <h4>leave request</h4>
                                </div>
                            </div>

                        </div>
                        <div className='dash-graph'>
                            <h3>Job Vaccancy Summary</h3>
                            <div className="dash-chart">
                                <PieChart
                                    colors={['#4e79a7', 'blue', '#f28e2c', '#e15759', '#76b7b2', '#59a14f',]}
                                    series={[
                                        {
                                            data: [
                                                { id: 0, value: 2, label: 'Accounting' },
                                                { id: 1, value: 25, label: 'Educators' },
                                                { id: 2, value: 3, label: 'Management' },
                                                { id: 3, value: 5, label: 'Security' },
                                            ],
                                            innerRadius: 30,
                                            outerRadius: 90,
                                            paddingAngle: 2,
                                            cornerRadius: 5,
                                            startAngle: -90,
                                            endAngle: 360,
                                            cx: 150,
                                            cy: 110,
                                            highlightScope: { faded: 'global', highlighted: 'item' },
                                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                        },

                                    ]

                                    }
                                    width={300}
                                    height={300}
                                    slotProps={{
                                        legend: {
                                            direction: 'row',
                                            position: { vertical: 'bottom', horizontal: 'middle' },
                                            padding: 9,
                                        },
                                    }}
                                />
                            </div>
                        </div>

                    </div>
                    <div className='dash-wrapper'>
                        <div className='dash-table'>
                            <h3>All Employees</h3>
                            <table>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Job Title</th>
                                    <th>Department</th>
                                    <th>Status</th>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>John Doe</td>
                                    <td>Administrator</td>
                                    <td><h4>Administration</h4></td>
                                    <td>Present</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>John Doe</td>
                                    <td>Administrator</td>
                                    <td><h4>Administration</h4></td>
                                    <td>Present</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>John Doe</td>
                                    <td>Administrator</td>
                                    <td><h4>Administration</h4></td>
                                    <td>Present</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>John Doe</td>
                                    <td>Administrator</td>
                                    <td><h4>Administration</h4></td>
                                    <td>Present</td>
                                </tr>

                            </table>
                        </div>
                        <div className='dash-updates'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
