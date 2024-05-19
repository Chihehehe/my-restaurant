import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Login/Signup';
import Header from './Components/Header/Header'; // Import the Header component
import AppRoutes from './AppRoutes';

function App() {
  return (
    <Routes>
      {/* Route without the Header */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Route with the Header */}
      <Route path="/*" element={<>
        <Header /> 
        <AppRoutes />
      </>} />
    </Routes>
  );
}

export default App;