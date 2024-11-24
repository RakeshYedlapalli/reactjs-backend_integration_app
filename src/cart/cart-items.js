import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Cart() {

    const history = useNavigate();


    const mainCartButton = (event) => {
        history('/payment')
    }

    const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
    const BASE_URL = "http://localhost:8082/inventory/images/image/";
    return (
        <div className="e-commerce-app" style={{ marginLeft: "2em", position: 'relative' }} >
            <Typography variant="h4" align="center" gutterBottom >
                Items in cart
            </Typography>
            {/* <Button style={{ marginLeft: "2em", position: 'relative' }} variant="outlined">Make payment</Button> */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' ,marginRight: '20px' }}>
            <Button onClick={mainCartButton} variant="contained" color="primary">
                Proceed to Buy
            </Button>
        </Box>
            <Grid container spacing={3}>

                <Grid item xs={9}>

                    <Grid container spacing={3}>
                        {cartItems.map((product, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id + '_' + index}>
                                <Card className="product-card">
                                    <CardMedia
                                        className="product-image"
                                        component="img"
                                        image={BASE_URL + product.image}
                                        alt={product.name}
                                        onError={(e) => {
                                            e.target.src = './placeholder-image.jpg';
                                        }}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" className="product-name">{product.name}</Typography>
                                        <Typography variant="body1" className="product-price">{product.price}</Typography>
                                    </CardContent>
                                </Card>

                            </Grid>
                        ))}
                        <div className="end-of-list-marker" />
                    </Grid>
                </Grid>

            </Grid>

        </div>
    );
}

export default Cart