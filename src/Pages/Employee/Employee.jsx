import React, { useEffect, useState } from 'react'
import TopNav from '../../Components/TopNav/TopNav'
import SideBar from '../../Components/SideBar/SideBar'
import Table from './Components/Table/Table'
import Info from './Components/Employee Details/info'
import './Employee.css'

const Employee = () => {
    const [employees, setEmployees] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const token = localStorage.getItem('siteToken');
    

    //fetching list of employees
    useEffect (() => {
        fetch('https://hrbe.eadevs.com/auth/employees', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then (response => response.json())
        .then(data => {
            setEmployees(data);
            if (data.length > 0) {
                const employee_id = data[0].employee_id
                handleEmployeeClick(employee_id);
            }
        })
        .catch(error => console.error('error fetching list:', error));
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const handleEmployeeClick = (employee_id,) => {
        //fetching full details
       const fetchEmployeeDetails =  fetch(`https://hrbe.eadevs.com/auth/employees/${employee_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        
        .catch(error => console.error('error fetching details', error));

        const fetchContractDetails = fetch(`https://hrbe.eadevs.com/auth/contracts/${employee_id}`, {
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
                    <div className="emply-main-header">
                        <h3>Employees</h3>
                    </div>
                    <div className="employee-table">
                        <Table employees={employees}  onEmployeeClick={handleEmployeeClick}/>
                    </div>
                </div>
                <div className="employeemain-area-two">
                <div className="emply-main-header">
                        <h3>Employee Information</h3>
                    </div>
                    <div className="employee-info">
                        {selectedEmployee && <Info combinedData={selectedEmployee}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Employee
