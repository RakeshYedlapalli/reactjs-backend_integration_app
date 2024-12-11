import React, { useState, useEffect, useRef } from 'react';
import { TextField, Grid, Typography, Card, CardContent, CardMedia } from '@mui/material';
import inventoryApiClient from '../security/InventoryApiClient';

function ECommerceAppInfiniteScroll() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const BASE_URL = "http://localhost:8082/inventory/images/image/";
    const observer = useRef();

    useEffect(() => {
        // Fetch products and categories from backend upon component mount
        fetchProducts();
        fetchCategories();
    }, []);

    useEffect(() => {
        // Initialize the IntersectionObserver
        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });

        if (products.length > 0) {
            observer.current.observe(document.querySelector('.end-of-list-marker'));
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [products, hasMore]);

    const fetchProducts = async () => {
        if (!hasMore || loading) return;
        setLoading(true);

        try {
            // const response = await axios.post('http://localhost:8082/inventory/catalog/items', {
            //     searchTerm,
            //     page
            // });

            const response =   await inventoryApiClient.post('inventory/catalog/items',{
                searchTerm,
                page
            })


            const newProducts = response.data;
            setProducts(prevProducts => [...prevProducts, ...newProducts]);
            setHasMore(newProducts.length > 0);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
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
        setSearchTerm(event.target.value);
    };

    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="e-commerce-app">
            <Typography variant="h4" align="center" gutterBottom>
                E-Commerce App
            </Typography>
            <Grid container spacing={3}>
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
                        {filteredProducts.map((product, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
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
                                {index === products.length - 1 && loading && <div>Loading...</div>}
                            </Grid>
                        ))}
                        <div className="end-of-list-marker" />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default ECommerceAppInfiniteScroll;
