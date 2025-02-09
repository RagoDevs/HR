import React, { useEffect, useState } from 'react';
import Table from 'antd/es/table';
import { createStyles } from 'antd-style';
import './Paytable.css';
import { base_url } from '../../../../constant'
import { useNavigate } from 'react-router-dom';


const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});
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
    width: 90,
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
    title: 'TIN',
    dataIndex: 'tin',
    key: 'tin',
  },
  {
    title: 'Bank A/C Number',
    dataIndex: 'bank_account',
    key: 'bank_account',
  },
  {
    title: 'Bank Name',
    dataIndex: 'bank_name',
    key: 'bank_name',
  },
  {
    title: 'Edit',
    key: 'operation',
    fixed: 'right',
    width: 70,
    render: (text, record) => {
      // Check if the row has data (you can customize this condition based on your data structure)
      if (record && Object.keys(record).length > 0) {
        return <a>action</a>;
      }
      return null;
    },
  },
];


const PayTable = () => {
  const { styles } = useStyle();

  const token = localStorage.getItem('siteToken');
const expiry = localStorage.getItem('siteExpiry')
const navigate = useNavigate();

const [dataSource, setDataSource] = useState([]);
const [loading, setLoading] = useState(true)

useEffect(() => {
  const checkExpiry = () => {
    if (Date.now() / 1000 > expiry) {
      navigate("/");
      return true;
    }
    return false;
  };

  const fetchPay = async () => {
    if (checkExpiry()) return; 

    try {
      const response = await fetch(`${base_url}/auth/payroll`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json(); 

      const formattedData = data.map((item, index) => ({
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
      }));

      setDataSource(formattedData);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchPay();
}, [base_url, token, expiry, navigate]); 

const tableHeight = 1100;
const rowHeight = 50;
const emptyRowCount = Math.max(0, Math.floor(tableHeight / rowHeight) - dataSource.length);

// Add empty rows to the data
const paddedData = [...dataSource, ...Array(emptyRowCount).fill({})];
  return (
    <div style={{ height: tableHeight }}>
      <Table
        className={styles.customTable}
        pagination={false}
        columns={columns}
        dataSource={paddedData}
        scroll={{
          x: 'max-content',
          y: tableHeight,
        }}
        loading={loading}
      />
    </div>
  );
};
export default PayTable;