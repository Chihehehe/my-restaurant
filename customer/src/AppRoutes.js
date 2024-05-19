import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/Home/HomePage'
import Restaurant from './Pages/Restaurant/Restaurant'
import CartPage from './Pages/Cart/CartPage';

function AppRoutes() {
  return (
    <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/restaurants/:id" element = {<Restaurant />} />
        <Route path="cart" element={<CartPage />} />
    </Routes>
  );
}

export default AppRoutes