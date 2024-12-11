import React, { useState, useEffect, useRef } from 'react';
import { TextField, Grid, Typography, Card, CardContent, CardMedia, CircularProgress, Box, IconButton, Badge, Modal, Button } from '@mui/material';
import axios from 'axios';
import { pink } from '@mui/material/colors';
import { AccountCircle, ShoppingCartSharp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import inventoryApiClient from '../security/InventoryApiClient';




function ECommerceAppInfiniteScrollBackend() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(1);
    const BASE_URL = "http://localhost:8082/inventory/images/image/";
    const observer = useRef();
    const [openModal, setOpenModal] = useState(false);
    const { keycloak, initialized } = useKeycloak();

    const [cartItems, setCartItems] = useState(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });
    const history = useNavigate();


    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);


    const handleLogout = async () => {
        try {
            // Call your backend API for logout here
            // Example:
            // const response = await axios.post('/logout');
            // Handle logout success
            console.log("Logout button clicked", keycloak, initialized);
            keycloak.logout();

        } catch (error) {
            // Handle error
            console.error('Error logging out:', error);
        } finally {
            // Close the modal after logout attempt
            handleCloseModal();
        }
    };

    const modalBody = (
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                maxWidth: 400,
                width: '80%',
                textAlign: 'center'
            }}
        >
            <Typography variant="h6" gutterBottom>
                Are you sure you want to logout?
            </Typography>
            <Button variant="contained" onClick={handleLogout}>Logout</Button>
        </Box>
    );


    useEffect(() => {
        // Fetch initial products and categories from backend
        fetchProducts();
        fetchCategories();
    }, []);

    useEffect(() => {
        // Initialize IntersectionObserver
        if (observer.current) {
            observer.current.disconnect();
        }
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                fetchProducts(); // Fetch more products when end of list is reached
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

        console.log("GOing to wait ");

        // await sleep(5000);

        console.log("waited  GOing to wait ");

        if (!hasMore || loading) return;
        setLoading(true)
        try {
            const limit = 50; // Number of products to fetch per request

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${keycloak.idToken}`, // Replace with your authorization token or other headers
                // Add any other custom headers here
            };

            let data = {
                searchTerm,
                limit,
                offset
            }
            console.log("I am going to send api call request ->", headers)

            // const response = await axios.post('http://localhost:8082/inventory/catalog/items',
            //     data, { headers });
            const response =   await inventoryApiClient.post('inventory/catalog/items',data)


            setOffset(offset + 1); // Calculate offset based on page number
            const newProducts = response.data;
            // setLoading(true);
            setProducts(prevProducts => [...prevProducts, ...newProducts]);
            setHasMore(newProducts.length !== 0); // Check if there are more products to load
            setPage(prevPage => prevPage + 1);

            if (newProducts.length === 0) {
                console.log("Making the loading button disappear");
                setLoading(false)
            } else {
                // setLoading(false)
                console.log("Loading button value ->", loading);
            }

            // console.log("Products are ->", products);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = (productId) => {
        console.log("Clicked on Cart button");
        const productToAdd = products.find(product => product.id === productId);
        if (cartItems.some(item => item.id === productId)) {
            alert('This item is already in the cart');
            setIsItemAlreadyInCart(true);
        } else {
            setCartItems(prevCartItems => [...prevCartItems, productToAdd]);
        }
    };
    const fetchCategories = async () => {
        try {




            // await sleep(5000);

            // const response = await axios.get('http://localhost:8082/inventory/catalog/categories', { headers });
            const response =   await inventoryApiClient.get('inventory/catalog/categories')
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };



    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setPage(1); // Reset page number when search term changes
        setProducts([]); // Clear existing products when search term changes
    };

    const mainCartButton = () => {
        history('/cart')
    }
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };




    // Load cartItems from localStorage when the component mounts
    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    // Save cartItems to localStorage whenever it's updated
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Existing code for fetching products and categories...

    return (
        <div className="e-commerce-app" style={{ position: 'relative' }} >

            {/* Cart button outside of the product container */}
            <IconButton onClick={mainCartButton} style={{ position: 'fixed', top: 10, right: 100, zIndex: 9999 }}>
                <Badge badgeContent={cartItems.length} color="primary">
                    <ShoppingCartSharp sx={{ color: pink[500] }} />
                </Badge>
            </IconButton>
            {/* 
            <IconButton onClick={mainCartButton} style={{ position: 'fixed', top: 10, right: 10, zIndex: 9999 }}>
                <AccountCircle sx={{ color: pink[500],  paddingLeft: "40px"}} fontSize="large" />
            </IconButton> */}

            <IconButton onClick={handleOpenModal} style={{ position: 'fixed', top: 10, right: 40, zIndex: 9999 }}

            >
                <AccountCircle sx={{ color: pink[500] }} />
            </IconButton>

            {/* Modal for logout */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {modalBody}
            </Modal>

            <Typography variant="h4" align="center" gutterBottom >
                E-Commerce App
            </Typography>
            <TextField
                fullWidth
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ marginBottom: '20px' }}
            />

            {/* <IconButton onClick={mainCartButton} style={{ position: 'absolute', top: 10, right: 40 }}>
            <Badge badgeContent={cartItems.length} color="primary">
                <ShoppingCartSharp sx={{ color: pink[500] }} />
            </Badge>
            </IconButton> */}


            {/* Container for products with scrollable area */}
            <Box
                sx={{
                    padding: '20px', // Space around the products
                    maxHeight: 'calc(100vh - 100px)', // Maximum height for scrollable area
                    overflowY: 'auto', // Enable vertical scrolling
                }}
            >

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

                        <Grid container spacing={3}>
                            {products.map((product, index) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id + '_' + index}>
                                    <Card className="product-card">
                                        <CardMedia
                                            className="product-image"
                                            component="img"
                                            image={BASE_URL + product.image}
                                            // image={fetchImages(product.image)}
                                            alt={product.name}
                                            onError={(e) => {
                                                e.target.src = './placeholder-image.jpg';
                                            }}
                                        />
                                        <CardContent>
                                            <Typography variant="h6" className="product-name">{product.name}</Typography>
                                            <Typography variant="body1" className="product-price">{product.price}</Typography>
                                        </CardContent>
                                        <IconButton onClick={() => addToCart(product.id)}>
                                            <ShoppingCartSharp className='helloRakesh' sx={{ color: pink[500] }} />
                                        </IconButton>
                                    </Card>
                                    {/* {index === products.length - 1 && loading && <div>Loading...</div>} */}

                                </Grid>
                            ))}
                            <div className="end-of-list-marker" />
                        </Grid>
                        {/* {loading && <Box sx={{ display: 'flex' }}><CircularProgress /></Box>} */}

                        {loading && <Box sx={{ display: 'flex' }}>
                            <CircularProgress size={60} />
                        </Box>}
                    </Grid>

                </Grid>
            </Box>
        </div>
    );
}

export default ECommerceAppInfiniteScrollBackend;
