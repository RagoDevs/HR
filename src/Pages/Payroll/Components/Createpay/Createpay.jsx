import React, { useState, useEffect } from 'react'
import { Button, Modal, Select, Form, message, notification } from 'antd'
import { base_url } from '../../../../constant'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Option } = Select

const Createpay = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [employees, setEmployees] = useState([]);
    const [loading, setloading] = useState(false);
    const token = localStorage.getItem('siteToken');
    const expiry = localStorage.getItem('siteExpiry')
    const navigate = useNavigate();
    const [input1Value, setInput1Value] = useState("");

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
                const response = await fetch(`${base_url}/auth/employees`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });
                const data = await response.json();
                setEmployees(data);
            }
            catch (error) {
                console.error('Error fetching employees:', error);
            } finally {
                setloading(false)
            }
        }

        if (!checkExpiry()) {
            fetchEmployees();
        }

        // eslint-disable-next-line
    }, [token, expiry, navigate]);


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        try {
            const token = localStorage.getItem('siteToken');

            const values = await form.validateFields();

            const formDataE = { 
                ...values, 
                basic_salary: Number(parseFloat(values.basic_salary).toFixed(2))
             };
            console.log("Submitting values with employee ID:", formDataE);

            form.resetFields();


            let res = await fetch(`${base_url}/auth/payroll`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(
                    formDataE
                ),
            });
            if (res.status === 201) {
                notification.success({
                    message: 'Form Submitted',
                    description: 'Your form has been submitted successfully!',
                    placement: 'topRight',
                    zIndex: 1002, 
                  });
            } else {
                toast.error('Some Error Occurred')
                message.error('Some error occured')
            }
        } catch (error) {

        }


    };

    const handleInput1Change = (e) => {
        setInput1Value(e.target.value);
    };


    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
           
            <div style={{ width: '100%', height: '200px', display: 'flex', justifyContent: 'end', marginTop: '7px',height: '35px' }}>
                <Button type='primary' style={{ width: '150px' }} onClick={showModal}>
                    Create Pay
                </Button>
            </div>

            <Modal
                title='Create Pay'
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText='Submit'
                cancelText='Close'
                zIndex={1001}
            >
                 <ToastContainer style={{zIndex: 1003}}/>
                <Form form={form} layout='horizontal' labelCol={{
                    span: 5,
                }}>
                    <Form.Item
                        label='Select Employee'
                        name='employee_id'
                        layout='vertical'
                        style={{ marginBottom: '50px' }}
                        labelCol={{ span: 6 }}
                    >
                        <Select
                            showSearch
                            placeholder="Search employee"
                            loading={loading}
                            
                            filterOption={(input, option) =>
                                option.children.toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            {employees.map((employee) => (
                                <Select.Option key={employee.employee_id} value={employee.employee_id}>
                                    {employee.employee_name}
                                </Select.Option>
                            ))}
                        </Select>

                    </Form.Item>

                    <Form.Item
                        label='Basic Salary'
                        name='basic_salary'
                        layout='horizontal'
                    >
                        <input  value={input1Value} onChange={handleInput1Change} step={0.01}/>
                    </Form.Item>


                    <Form.Item
                        label='Tin Number'
                        name='tin'
                        layout='horizontal'
                    >
                        <input onChange={handleInput1Change} />
                    </Form.Item>


                    <Form.Item
                        label='Bank Name'
                        name='bank_name'
                        layout='horizontal'

                    >
                        <input onChange={handleInput1Change} />
                    </Form.Item>


                    <Form.Item
                        label='Bank Account'
                        name='bank_account'
                        layout='horizontal'

                    >
                        <input onChange={handleInput1Change} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}


export default Createpay;