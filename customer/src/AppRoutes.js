import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Home/HomePage';
import Restaurant from './Pages/Restaurant/Restaurant';
import CartPage from './Pages/Cart/CartPage';
import CheckoutPage from './Pages/Checkout/CheckoutPage';

function AppRoutes({ handleClick, cart, setCart, handleChange }) {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/restaurants/:idrestaurant" element={<Restaurant handleClick={handleClick} />} />
      <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} handleChange = {handleChange} />} />
      <Route path="/checkout" element={<CheckoutPage />} /> {/* Pass id parameter to CheckoutPage */}
    </Routes>
  );
}

export default AppRoutes