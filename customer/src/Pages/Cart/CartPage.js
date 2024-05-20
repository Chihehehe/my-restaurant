import React, { useState } from 'react';

function ShoppingCart() {
    const [cartItems, setCartItems] = useState([]);

    // Function to add an item to the cart
    const addItemToCart = (item) => {
        // Check if the item already exists in the cart
        const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
            // If item exists, update its quantity
            setCartItems(
                cartItems.map((cartItem) =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                )
            );
        } else {
            // If item doesn't exist, add it to the cart with quantity 1
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
    };

    // Function to remove an item from the cart
    const removeItemFromCart = (itemId) => {
        setCartItems(cartItems.filter((item) => item.id !== itemId));
    };

    // Function to update quantity of an item in the cart
    const updateItemQuantity = (itemId, newQuantity) => {
        setCartItems(
            cartItems.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
        );
    };

    // Calculate total price of items in the cart
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div>
            {/* Render items in the cart */}
            {/* Render total price */}
        </div>
    );
}

export default ShoppingCart;
