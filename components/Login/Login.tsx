import  { useState, useEffect } from 'react';
import './Login.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";

function Login() {
    window.scrollTo(0, 0);
    const history = useNavigate();
    const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);


    useEffect(() => {
        const isLoggedIn = localStorage.getItem('login'); 
        if (isLoggedIn) {
            history('/user');
        }
    }, [history]);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(3, 'Username must be at least 3 characters')
                .max(50, 'Username must not exceed 50 characters')
                .required('Username is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .max(50, 'Password must not exceed 50 characters')
                .required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                await axios.post('http://hellafragilesite.com/shop.api/login.php', values);
                setIsLoginSuccessful(true);

                localStorage.setItem('username', values.username);
                localStorage.setItem('password', values.password);

                history('/user');
            } catch (error) {
                console.error('Error logging in:', error);
            }
        },

    });

    return (
        <div className='register'>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className='register-box'>
                <h2>Sign in</h2>
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
                        <button type='submit'>Sign in</button>
                        <div>OR</div>
                        <Link to={`/signup`} className='signin'>
                            Sign up
                        </Link>
                    </div>
                </form>
                {isLoginSuccessful && (
                    <p>Login successful! You will be redirected to the main page.</p>
                )}
            </div>
        </div>
    );
}

export default Login;
