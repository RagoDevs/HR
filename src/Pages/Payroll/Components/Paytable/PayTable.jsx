import React, { useEffect, useState } from 'react';
import Table from 'antd/es/table';
import './CustomTable.css';
import { base_url } from '../../../../constant'
import { useNavigate } from 'react-router-dom';


const columns = [
  {
    title: 'S/N',
    width: 60,
    dataIndex: 'key',
    rowScope: 'row',
    fixed: 'left'
  },
  {
    title: 'Employee',
    width: 160,
    dataIndex: 'employee_name',
    key: 'employee_name',
    fixed: 'left',
  },
  {
    title: 'Basic Salary',
    width: 150,
    dataIndex: 'basic_salary',
    key: 'basic_salary',
    fixed: 'left',
    sorter: true,
  },
  {
    title: 'Taxable Income',
    dataIndex: 'taxable_income',
    key: 'taxable_income',
    width: 150,
  },
  {
    title: 'Total',
    dataIndex: 'total_deductions',
    key: 'total_deductions',
    width: 120,
  },
  {
    title: 'NSSF Employee',
    dataIndex: 'nssf_employee',
    key: 'nssf_employee',
    width: 150,
  },
  {
    title: 'NHIF Employee',
    dataIndex: 'nhif_employee',
    key: 'nhif_employee',
    width: 150,
  },
  {
    title: 'PAYEE',
    dataIndex: 'paye',
    key: 'paye',
    width: 80,
  },
  {
    title: 'Staff Loan',
    dataIndex: 'loan',
    key: 'loan',
    width: 150,
  },
  {
    title: 'Department',
    dataIndex: 'department',
    key: 'department',
    width: 120,
  },
  {
    title: 'TIN',
    dataIndex: 'tin',
    key: 'tin',
    width: 100,
  },
  {
    title: 'Bank A/C Number',
    dataIndex: 'bank_account',
    key: 'bank_account',
    width: 150,
  },
  {
    title: 'Bank Name',
    dataIndex: 'bank_name',
    key: 'bank_name',
    width: 150,
  },
  {
    title: 'Edit',
    key: 'operation',
    fixed: 'right',
    width: 70,
    render: (text, record) => {

      if (record && Object.keys(record).length > 0) {
        return <a>action</a>;
      }
      return null;
    },
  },
];


const PayTable = () => {


  const token = localStorage.getItem('siteToken');
  const expiry = localStorage.getItem('siteExpiry')
  const navigate = useNavigate();

  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true)
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedBank, setSelectedBank] = useState('');




  useEffect(() => {
    const checkExpiry = () => {
      if (Date.now() / 1000 > expiry) {
        navigate("/");
        return true;
      }
      return false;
    };

    setLoading(true);

    const fetchPay = async () => {
      if (checkExpiry()) return;

      const queryParams = new URLSearchParams({
        page: 1,         
        pagesize: 20,               
        bank: selectedBank || "",  
        department: selectedDepartment || "", 
      });

      try {
        const response = await fetch(`${base_url}/auth/payroll?${queryParams.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        const formattedData = data.Payrolls.map((item, index) => ({
          key: index + 1,
          basic_salary: item.basic_salary,
          tin: item.tin,
          bank_name: item.bank_name,
          bank_account: item.bank_account,
          employee_name: item.employee_name,
          taxable_income: item.taxable_income,
          paye: item.paye,
          loan: item.loan,
          total_deductions: item.total_deductions,
          nssf_employee: item.nssf_employee,
          nhif_employee: item.nhif_employee,
          department: item.department,
        }));

        setDataSource(formattedData);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPay();
  }, [selectedBank, selectedDepartment]);

  {/* const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };**/}

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleBankChange = (event) => {
    setSelectedBank(event.target.value);
  };

  return (
    <>
      <div className="table-comp">

        <div className="form-container">
          <div className="select-opt">
            <select id="station" name="department" onChange={handleDepartmentChange} value={selectedDepartment}>
              <option value="" disabled >By Department</option>
              <option value="math">Math</option>
              <option value="english">Station 2</option>
              <option value="station3">Station 3</option>
              <option value="">All</option>
            </select>

            <select id="bank" name="Bank" onChange={handleBankChange} value={selectedBank}>
              <option value="" disabled>please select</option>
              <option value="period1">Payroll Period 1</option>
              <option value="period2">Payroll Period 2</option>
              <option value="period3">Payroll Period 3</option>
            </select>
          </div>

          <input type="text"  placeholder="Search Employee" />
        </div>

        <div style={{ boxShadow: 'rgba(0, 0, 0, 0.11) 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 0.5px 1.5px' }}>
          <Table
            className='custom-table'
            pagination={true}
            columns={columns}
            dataSource={dataSource}
            scroll={{
              x: 'max-content'
            }}
            loading={loading}

          />
        </div>
      </div>
    </>
  );
};
export default PayTable;
