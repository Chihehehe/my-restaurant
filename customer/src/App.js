import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Login/Signup';
import Header from './Components/Header/Header';
import AppRoutes from './AppRoutes';

function App() {
  const [cart, setCart] = useState([]);
  const [warning, setWarning] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleClick = (item) => {
    let isPresent = false;
    cart.forEach((product) => {
      if (item.idmenu === product.idmenu) 
        isPresent = true;
    })
    if (isPresent) {
      setWarning(true);
      setTimeout(()=> {
        setWarning(false);
      }, 2000);
      return ;
    }
    setCart([...cart,item]);
    setSuccessMessage('Add to cart successful');
    setTimeout(() => {
      setSuccessMessage('');
    }, 2000);
    };

    const handleChange = (item, d) => {
      let ind = -1;
      cart.forEach((data, index) => {
        if (data.idmenu === item.idmenu)
          ind = index;
      });

      const tempArr = cart;
      tempArr[ind].amount += d;
      if(tempArr[ind].amount === 0)
        tempArr[ind].amount = 1;
      setCart([...tempArr])
    }


  return (
    <Routes>
      {/* Routes without the Header */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Routes with the Header */}
      <Route path="/:id/*" element={<>
        <Header size={cart.length} handleChange = {handleChange}/>
        {warning && <div>Item is already added to your cart</div>}
        {successMessage && <div>{successMessage}</div>}
        <AppRoutes handleClick={handleClick} cart = {cart} setCart={setCart} handleChange = {handleChange}/>
      </>} />
    </Routes>
  );
}

export default App;
