import React, { useEffect, useState } from 'react'
import TopNav from '../../Components/TopNav/TopNav'
import SideBar from '../../Components/SideBar/SideBar'
import Table from './Components/Table/Table'
import Info from './Components/Employee Details/info'
import NewEmployee from './Components/NewEmployee/NewEmployee'
import './Employee.css'
import { useNavigate } from 'react-router-dom'

const Employee = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const token = localStorage.getItem('siteToken');
    const expiry = localStorage.getItem('siteExpiry')
    const navigate = useNavigate();

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
                const response = await fetch('https://hrbe.ragodevs.com/auth/employees', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });
                const data = await response.json();
                setEmployees(data);
                
                if (data.length > 0) {
                    const employee_id = data[0].employee_id
                    handleEmployeeClick(employee_id);
                }
            }
            catch (error) {
                console.error('Error fetching employees:', error);
            }
        }

        if (!checkExpiry()) {
            fetchEmployees();
        }

        // eslint-disable-next-line
    }, [token, expiry, navigate]);

    const handleEmployeeClick = (employee_id,) => {
        //fetching full details
        const fetchEmployeeDetails = fetch(`https://hrbe.ragodevs.com/auth/employees/${employee_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())

            .catch(error => console.error('error fetching details', error));

        const fetchContractDetails = fetch(`https://hrbe.ragodevs.com/auth/contracts/${employee_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching additional details:', error);
                throw error;
            });

        Promise.all([fetchEmployeeDetails, fetchContractDetails])
            .then(([employeeDetails, contractDetails]) => {

                const combinedData = {
                    ...employeeDetails,
                    ...contractDetails
                };
                console.log('Combined Data:', combinedData);
                setSelectedEmployee(combinedData);
            })
            .catch(error => console.error('Error fetching data:', error));

    };

    return (
        <div className='employee'>
            <div className="topnav">
                <TopNav />
            </div>
            <div className="sidenav">
                <SideBar />
            </div>
            <div className="employee-main">
                <div className="employeemain-area-one">
                    <div className="employee-table">
                        <Table employees={employees} onEmployeeClick={handleEmployeeClick} />
                    </div>
                </div>
                <div className="employeemain-area-two">
                    <div className="emply-main-header2">
                        <NewEmployee />
                    </div>
                    <div className="employee-info">
                        {selectedEmployee && <Info combinedData={selectedEmployee} />}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Employee;
