 import './Register.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {  Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";

function Register() {
    
    const history = useNavigate();
    
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(3, 'Username must be at least 3 characters')
                .max(50, 'Username must not exceed 50 characters')
                .required('Username is required'),
            email: Yup.string()
                .email('Invalid email address')
                .max(100, 'Email must not exceed 100 characters')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .max(50, 'Password must not exceed 50 characters')
                .required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://hellafragilesite.com/shop.api/register.php', values);
                console.log('Data sent to the server:', response.data);
                history('/signin');
            } catch (error) {
                console.error('Error sending data:', error);
            }
        },
    });

    return (
        <div className='register'>
            <Helmet>
                <title>Register</title>
            </Helmet>
            <div className='register-box'>
                <h2>Sign up</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='username'>Username:</label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            maxLength={50}
                        />
                        {formik.touched.username && formik.errors.username ? (
                            <div className='error'>{formik.errors.username}</div>
                        ) : null}
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>Email:</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            maxLength={100}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className='error'>{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password:</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            maxLength={50}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className='error'>{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div className='sign-box'>
                        <button type='submit'>Sign up</button>
                        <div>OR </div>
                        <Link
                            to={`/signin`}
                            className='signin'
                        >
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
