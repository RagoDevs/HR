import React from 'react';
import { Table } from 'antd';
import { createStyles } from 'antd-style';
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
        dataIndex: 'key',
        rowScope: 'row',
      },
  {
    title: 'Employee',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Basic Salary',
    width: 100,
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
    width: 100,
    render: () => <a>action</a>,
  },
];
const dataSource = [
  {
    key: '1',
    name: 'Olivia',
    age: 32,
    address: 'New York Park',
  },
  {
    key: '2',
    name: 'Ethan',
    age: 40,
    address: 'London Park',
  },
];
const PayTable = () => {
  const { styles } = useStyle();
  return (
    <Table
      className={styles.customTable}
      pagination={false}
      columns={columns}
      dataSource={dataSource}
      scroll={{
        x: 'max-content',
      }}
    />
  );
};
export default PayTable;