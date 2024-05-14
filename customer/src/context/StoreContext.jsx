"use client"
import React, { createContext } from 'react';
import { restaurant_list } from '@/assets/assets';

export const StoreContext = createContext()
const StoreContextProvider = (props) => {
    const contextValue = {
        restaurant_list
    }
    console.log(restaurant_list)
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;