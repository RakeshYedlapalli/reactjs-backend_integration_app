import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Link, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function UserDetailsForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
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
        event.preventDefault();
        
        try {
            const response = await userApiClient.post('http://localhost:8080/api/user', {
                firstName: firstName,
                lastName: lastName,
                dob: dateOfBirth,
                username: username,
                password: password
            });
            if (response.data.loginSuccess) {
                navigate('/login');
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="user-details-form">
            <Typography variant="h2">User Registration</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="First Name"
                            type="text"
                            value={firstName}
                            onChange={handleFirstNameChange}
                            required
                            fullWidth
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Last Name"
                            type="text"
                            value={lastName}
                            onChange={handleLastNameChange}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Date of Birth"
                            type="date"
                            value={dateOfBirth}
                            onChange={handleDateOfBirthChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Username"
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            fullWidth
                        />
                    </Grid>

                    <Grid>
                    <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
                    </Grid> 
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">Register</Button>
                    </Grid>
                </Grid>
                {error && <Typography variant="body2" color="error">{error}</Typography>}
            </form>
            <Link href="/login" variant="body2" onClick={onClickAlreadyUserExists}>Already have an account? Sign in</Link>
        </div>
    );
}

export default UserDetailsForm;
