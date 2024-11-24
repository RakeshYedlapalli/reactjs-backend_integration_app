import React, { useState } from 'react';
import { Snackbar, Box, Button } from '@mui/material';
// import { Snackbar } from '@mui/material';
import { Link } from 'react-router-dom';

function PaymentSuccessBanner() {
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message="Payment successful"
    >
      <Box bgcolor="green" p={2}>
        <Button component={Link} to="/" color="inherit">
          Home
        </Button>
        <Button component={Link} to="/catalog" color="inherit">
          Category Page
        </Button>
      </Box>
    </Snackbar>
  );
}

export default PaymentSuccessBanner;
