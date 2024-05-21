import React, { useState } from 'react'
import { useEffect } from 'react'
import classes from "./CartPage.module.css"
import { Link, useParams } from 'react-router-dom';

function CartPage({ cart, setCart, handleChange }) {
    const [price, setPrice] = useState(0);
    const {id} = useParams();

    const handlePrice = () => {
        let ans = 0;
        cart.map((item) => (
            ans += item.amount * item.price
        ))
        setPrice(ans);
    }

    const handleRemove = (idmenu) => {
        const arr = cart.filter((item) => item.idmenu != idmenu);
        setCart(arr);
    }

    useEffect(() => {
        handlePrice();
    })

    console.log(id)

    return (
        <article>
            {cart.length > 0 ? (
                cart.map((item) => (
                    <div className={classes.cartBox} key={item.idmenu}>
                        <div className={classes.cart_img}>
                            <img src={item.image} alt={item.foodName} />
                            <p>{item.foodName}</p>
                        </div>
                        <div>
                            <button onClick={() => handleChange(item, +1)}> + </button>
                            <button>{item.amount}</button>
                            <button onClick={() => handleChange(item, -1)}> - </button>
                        </div>
                        <div>
                            <span>${item.price}</span>
                            <button onClick={() => handleRemove(item.idmenu)}>Remove</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>Your cart is empty.</p>
            )}
            <div className={classes.checkout}>
                <div>
                    <span>Total Price of your Cart: </span>
                    <span className={classes.total_price}> ${price}</span>
                </div>
                <Link to={`/${id}/checkout`} state={{ cart }} >Proceed To Checkout</Link>
            </div>
        </article>
    );
}

export default CartPage