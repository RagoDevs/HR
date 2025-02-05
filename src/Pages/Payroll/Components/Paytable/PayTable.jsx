import React from 'react';
import Table from 'antd/es/table';
import { createStyles } from 'antd-style';
import './Paytable.css';
import dataSource from './datasource';
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
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Basic Salary',
    width: 150,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
    sorter: true,
  },
  {
    title: 'Taxable Income',
    dataIndex: 'address',
    key: '1',
  },
  {
    title: 'Total',
    dataIndex: 'address',
    key: '2',
  },
  {
    title: 'NSSF Employee',
    dataIndex: 'address',
    key: '3',
  },
  {
    title: 'NSSF Employer',
    dataIndex: 'address',
    key: '4',
  },
  {
    title: 'NHIF Employee',
    dataIndex: 'address',
    key: '5',
  },
  {
    title: 'NHIF Employer',
    dataIndex: 'address',
    key: '6',
  },
  {
    title: 'PAYEE',
    dataIndex: 'address',
    key: '7',
  },
  {
    title: 'Food Allowance',
    dataIndex: 'address',
    key: '8',
  },
  {
    title: 'Advance',
    dataIndex: 'address',
    key: '9',
  },
  {
    title: 'Short',
    dataIndex: 'address',
    key: '10',
  },
  {
    title: 'Staff Loan',
    dataIndex: 'address',
    key: '11',
  },
  {
    title: 'SDL',
    dataIndex: 'address',
    key: '12',
  },
  {
    title: 'WCF',
    dataIndex: 'address',
    key: '13',
  },
  {
    title: 'Total',
    dataIndex: 'address',
    key: '14',
  },
  {
    title: 'Net Pay',
    dataIndex: 'address',
    key: '15',
  },
  {
    title: 'NHIF Number',
    dataIndex: 'address',
    key: '16',
  },
  {
    title: 'NSSF Number',
    dataIndex: 'address',
    key: '17',
  },
  {
    title: 'TIN',
    dataIndex: 'address',
    key: '18',
  },
  {
    title: 'Bank A/C Number',
    dataIndex: 'address',
    key: '19',
  },
  {
    title: 'Bank Name',
    dataIndex: 'address',
    key: '20',
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
      // Return null if the row has no data
      return null;
    },
  },
];

const tableHeight = 1000;
const rowHeight = 50;
const emptyRowCount = Math.max(0, Math.floor(tableHeight / rowHeight) - dataSource.length);

// Add empty rows to the data
const paddedData = [...dataSource, ...Array(emptyRowCount).fill({})];
const PayTable = () => {
  const { styles } = useStyle();
  return (
    <div style={{height: tableHeight}}>
      <Table
        className={styles.customTable}
        pagination={false}
        columns={columns}
        dataSource={paddedData}
        scroll={{
          x: 'max-content',
          y: tableHeight,
        }}
      />
    </div>
  );
};
export default PayTable;