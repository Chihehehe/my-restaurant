import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/Home/HomePage'
import Restaurant from './Pages/Restaurant/Restaurant'
import CartPage from './Pages/Cart/CartPage';
import Header from './Components/Header/Header'; // Import the Header component

function AppRoutes(handleClick = { handleClick }) {
  return (

    <Route path="/:id/*" element={<>
      <Header handleClick={handleClick} />
      <Route path="/" element={<HomePage />} />
      <Route path="/restaurants/:id" element={<Restaurant handleClick={handleClick} />} />
      <Route path="/cart" element={<CartPage />} />
    </>} />
  );
}

export default AppRoutes