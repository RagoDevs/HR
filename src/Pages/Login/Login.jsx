import React, { useEffect, useState } from 'react'
import './login.css'
import logo from '../../Assets/images/logo.png'
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from '../../RoutesAuth/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import eyeIcon from '../../Assets/login/watch.png'
import eyeSlashIcon from '../../Assets/login/hidden.png'
import { useNavigate } from 'react-router-dom';

function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    
    const isTokenValid = () => {
        const token = localStorage.getItem('siteToken');
        const expiryTime = localStorage.getItem('siteExpiry');

        if (!token || !expiryTime) {
            return false;
          }
      
          const now = new Date().getTime();
          return now / 1000 < expiryTime;
    };

    useEffect(() => {
        if (isTokenValid()) {
          // Redirect to dashboard if token is valid
          navigate('/dashboard');
        }
      }, [navigate]);

    const [loginError, setLoginError] = useState(null);
    let auth = useAuth();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({

            email: Yup.string(),
            password: Yup.string()


        }),
        onSubmit: async values => {
            try {
                await auth.signin(values.email, values.password);

                toast.success("Login Successfully!");

            } catch (error) {
                setLoginError('Invalid email or password');
                toast.error("Invalid email or password")
            }
        },
    });


    return (
        <>
            <ToastContainer />
            <div className='login-body'>
                <ToastContainer />
                {/*<div className="logo-intro-container">
                    <img src={logo} alt="Logo" />
                </div>*/}
                
                    <div className="login">
                        <div className="lg-container">
                            <div className="lg-logo">
                                <img src={logo} alt="" />
                                <h2>Welcome Back!</h2>
                            </div>

                            <div className="lg-form">
                                <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit() }}>
                                    <div className='login--inputs'>

                                        <input
                                            type='email'
                                            className='input'
                                            placeholder='Email'
                                            name='email'
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            required
                                        />
                                        {formik.touched.email && formik.errors.email ? (
                                            <div>{formik.errors.email}</div>) : null
                                        }
                                        <div className="password-wrapper">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                className='input'
                                                placeholder='Password'
                                                name='password'
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                required
                                            />
                                            <img
                                                src={showPassword ? eyeSlashIcon : eyeIcon}
                                                alt="Toggle Password Visibility"
                                                className="eye-icon"
                                                onClick={togglePasswordVisibility}
                                            />
                                        </div>
                                        {formik.touched.password && formik.errors.password ? (
                                            <div>{formik.errors.password}</div>) : null
                                        }
                                        {loginError && <div className="login-error">{loginError}</div>}
                                        <div className='forgot--password'> Forgot Password?</div>
                                        <button
                                            type='submit'
                                            className='lg-submit'
                                        >
                                            <h3>Login</h3>
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                
            </div>
        </>
    )
};

export default Login;
