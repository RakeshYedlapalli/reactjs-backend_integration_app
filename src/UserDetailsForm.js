import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserDetailsForm() {
    const [firstName, setFirstName] = useState('Rakesh');
    const [lastName, setLastName] = useState('Yedlapalli');
    const [dateOfBirth, setDateOfBirth] = useState('14/03/2024');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('1235');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleDateOfBirthChange = (event) => {
        setDateOfBirth(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const onClickAlreadyUserExists = () =>{
        navigate('/login');
    }

    const handleSubmit = async (event) => {
        console.log("I am in handle sumbit");
        event.preventDefault();
        console.log("Firstname->", firstName);
        console.log("Firstname->", lastName);
        console.log("Firstname->", dateOfBirth);
        console.log("Firstname->", username);
        console.log("Firstname->", password);

       
        
        try {
            const response = await axios.post('http://localhost:8080/api/user', {
                firstName: firstName,
                lastName: lastName,
                dob: "2024-03-06",
                username: username,
                password: password
            });
            console.log("Response:", response);
            if (response.data.loginSuccess) {
                console.log('User registered successfully');
                navigate('/login');
            } else {
                console.log('Exception occurred');
                setError(response.data.message);
            }
            
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="user-details-form">
            <h2>User Registration</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input type="text" value={firstName} onChange={handleFirstNameChange} required />
                </label>
                <br />
                <label>
                    Last Name:
                    <input type="text" value={lastName} onChange={handleLastNameChange} required />
                </label>
                <br />
                <label>
                    Date of Birth:
                    <input type="date" value={dateOfBirth} onChange={handleDateOfBirthChange} />
                </label>
                <br />
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
                <button type="submit">Register</button>
                {error && <div className="error">{error}</div>}
               
            </form>
            <button class="login-button" onClick={onClickAlreadyUserExists}>User Already Exists?</button>
        
        </div>
    );
}

export default UserDetailsForm;
