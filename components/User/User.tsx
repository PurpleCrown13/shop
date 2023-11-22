import '../User/User.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from "react-helmet";


function User() {
    const history = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('password');

        history('/signin');
    };


    useEffect(() => {
        if (!username || !password) {
            history('/signin'); 
        }
    }, []);

    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    return (
        <div className='user-page'>
            <Helmet>
                <title>{username}</title>
            </Helmet>
            <h2>Welcome, {username}!</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default User;
