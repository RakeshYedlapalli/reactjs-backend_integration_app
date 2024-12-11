import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import axios from 'axios';
import PaymentSuccessBanner from './PaymentSuccessBanner';
import { useNavigate } from 'react-router-dom';


function PaymentDetails() {
    

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await 
            axios.post('http://localhost:8084/payment/save', formData);
            console.log('Response:', response.data);
            // setSuccess(true)
            navigate('/success');
            // Add your logic for handling the response here
        } catch (error) {
            console.error('Error:', error);
            // Add your logic for handling errors here
        }
    };
    
    return (
        <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
                Payment Details
            </Typography>
            {success && (
                <div style={{ marginBottom: '20px' }}>
                    {/* Display PaymentSuccessBanner if success is true */}
                    <PaymentSuccessBanner />
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Name on Card"
                            variant="outlined"
                            fullWidth
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Card Number"
                            variant="outlined"
                            fullWidth
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Expiry Date"
                            variant="outlined"
                            fullWidth
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="CVV"
                            variant="outlined"
                            fullWidth
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
            
        </Paper>
       
    );
}

export default PaymentDetails;
