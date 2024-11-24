import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import UserDetailsForm from './user-management/UserDetailsForm';
import LoginForm from './user-management/LoginForm';
// import BasicTable from './Showdata';
// import ECommerceApp from './catalog/product-catalog';
import ECommerceApp from './catalog/product-catalog';
import ECommerceAppInfiniteScroll from './catalog/product-catalog-infinite-scroll';
import ECommerceAppInfiniteScrollBackend from './catalog/product-catalog-infinite-backend-api';
import Cart from './cart/cart-items';
import PaymentDetails from './payment-details/payment-gateway';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import PaymentSuccessBanner from './payment-details/PaymentSuccessBanner';

var hashHistory = require('react-router-redux')

function App() {
  return (
  
    <div>
      
    <Router>
      <Routes history={hashHistory}>
        <Route exact path="/"  element={<UserDetailsForm/>} />
        <Route exact path="/login" element={<LoginForm/>} />
        <Route exact path="/catalog" element={<ECommerceAppInfiniteScrollBackend/>} />
        <Route exact path="/cart" element={<Cart/>} />
        <Route exact path='/payment' element={<PaymentDetails/>} />
        <Route exact path='/success' element={<PaymentSuccessBanner/>} />
      </Routes>
    </Router>
    </div>
  ); 
}

export default App;
