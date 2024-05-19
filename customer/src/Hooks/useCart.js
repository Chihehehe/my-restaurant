import React, { createContext, useState } from 'react'

const CartContext = createContext(null);

function useCart({ children }) {
    const [cartItems, setCartItems] = useState()
    const [totalPrice, setTotalPrice] = useState()
    const [totalCount, setTotalCount] = useState()
    
  return (
    <CartContext.Provider value={{}}>{children}</CartContext.Provider>
  )
}

export default useCart