import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const config = {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            }
          };
          
        
        try {
            const response = await axios.post('http://localhost:8080/api/user/login', {
                username: username,
                password: password
            }, config);

            console.log("Response is ->", response);
            if (response.data.loginStatus === 'Success') {
                // Successful login logic here
                console.log('Login successful');
                setSuccess(response.data.loginStatus)
                navigate('/home');
            } else {
                console.log('Login failed');
                setError(response.data.loginStatus);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={handleUsernameChange} required />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange} required />
                </label>
                <br />
                <button type="submit">Login</button>
                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}
            </form>
        </div>
    );
}

export default LoginForm;
