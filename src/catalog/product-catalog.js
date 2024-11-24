import React, { useState, useEffect } from 'react';
import { TextField, Grid, Typography, Card, CardContent, CardMedia } from '@mui/material';
import axios from 'axios';
import inventoryApiClient from '../security/InventoryApiClient';
// import iimagePath from "./image1.jpg"

function ECommerceApp() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const BASE_URL = "http://localhost:8082/inventory/images/image/";

    useEffect(() => {
        // Fetch products from backend upon component mount
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            // const response = await axios.post('http://localhost:8082/inventory/catalog/items', { searchTerm });
            const response =   await inventoryApiClient.post('inventory/catalog/items',{ searchTerm })
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            // const response = await axios.get('http://localhost:8082/inventory/catalog/categories');
            const response =   await inventoryApiClient.get('inventory/catalog/categories')
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleSearchChange = (event) => {
        // console.log("Searched item ->", event.target.value);
        setSearchTerm(event.target.value);
    };

    // Filter products based on search term
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="e-commerce-app">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" gutterBottom>
                        E-Commerce App
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Categories
                            </Typography>
                            <ul>
                                {categories.map(category => (
                                    <li key={category.id}>{category.name}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={9}>
                    <TextField
                        fullWidth
                        label="Search"
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        style={{ marginBottom: '20px' }}
                    />
                    <Grid container spacing={3}>
                        {filteredProducts.map(product => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                                <Card className="product-card">
                                    <CardMedia
                                        className="product-image"
                                        component="img"
                                        image={BASE_URL + product.image} // <-- Product image
                                        alt={product.name}
                                        onError={(e) => {
                                            e.target.src = './placeholder-image.jpg'; // Provide a placeholder image path
                                        }}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" className="product-name">{product.name}</Typography>
                                        <Typography variant="body1" className="product-price">{product.price}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default ECommerceApp;
