// CheckoutPage.js
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import classes from './CheckoutPage.module.css';

function CheckoutPage() {
    const { id } = useParams(); // Access id from URL params
    const location = useLocation();
    const { cart } = location.state; // Access the cart data from location state

    const handleCheckout = () => {
        // Logic for processing checkout (e.g., sending data to backend)
        alert('Checkout completed successfully!');
    };

    return (
        <div className={classes.checkoutContainer}>
            <h2>Checkout for User ID: {id}</h2>
            <div className={classes.cartSummary}>
                <h3>Order Summary</h3>
                <ul>
                    {cart.map((item, index) => (
                        <li key={index} className={classes.cartItem}>
                            <img src={item.image} alt={item.foodName} className={classes.cartImage} />
                            <div className={classes.itemDetails}>
                                <span className={classes.itemName}>{item.foodName}</span>
                                <span className={classes.itemAmount}>Quantity: {item.amount}</span>
                                <span className={classes.itemPrice}>Price: ${item.price * item.amount}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className={classes.totalPrice}>
                    Total: ${cart.reduce((total, item) => total + item.amount * item.price, 0).toFixed(2)}
                </div>
            </div>
            <button className={classes.checkoutButton} onClick={handleCheckout}>Complete Checkout</button>
        </div>
    );
}

export default CheckoutPage;
