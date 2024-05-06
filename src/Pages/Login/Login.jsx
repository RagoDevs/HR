import React, { useState} from 'react'
import './login.css'
import logo from '../../Assets/images/logo.png'
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from '../../RoutesAuth/AuthProvider';

function Login() {

    const [loginError, setLoginError] = useState(null);
    let auth = useAuth();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({

            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                
                
        }),
        onSubmit: async values => {
            try {
                await auth.signin(values.email, values.password);
            } catch (error) {
                console.log('nipo')
                setLoginError('Invalid email or password');
            }
        },
    });

    return (
        <div className="login">
            <div className="lg-container">
                <div className="lg-logo">
                    <h2>Welcome Back!</h2>
                    <img src={logo} alt="" />
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
                            <input
                                type='password'
                                className='input'
                                placeholder='Password'
                                name='password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div>{formik.errors.password}</div>) : null
                            }

                            <div className='forgot--password'> Forgot Password?</div>
                            <button
                                type='submit'
                                className='lg-submit'
                            >
                               <h3>Login</h3> 
                            </button>
                        </div>
                        {loginError && <div className="login-error">{loginError}</div>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
