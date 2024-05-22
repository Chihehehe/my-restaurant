import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Home/HomePage';
import Restaurant from './Pages/Restaurant/Restaurant';
import CartPage from './Pages/Cart/CartPage';
import CheckoutPage from './Pages/Checkout/CheckoutPage';
import MembershipPage from './Pages/Membership/Membership';
import ProfilePage from './Pages/Profile/ProfilePage';
import OrderHistory from './Pages/OrderHistory/OrderHistory';

function AppRoutes({ handleClick, cart, setCart, handleChange }) {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/restaurants/:idrestaurant" element={<Restaurant handleClick={handleClick} />} />
      <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} handleChange = {handleChange} />} />
      <Route path="/checkout" element={<CheckoutPage />} /> {/* Pass id parameter to CheckoutPage */}
      <Route path="/membership" element={<MembershipPage />} /> {/* Add the route for MembershipPage */}
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/orderHistory" element={<OrderHistory />} />
    </Routes>
  );
}

export default AppRoutes