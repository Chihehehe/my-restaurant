import React from 'react';
import classes from "./header.module.css";
import { Link } from 'react-router-dom';

export default function Header() {
    const user = {
        name: 'Chi',
    };

    const cart = {
        totalCount: 10,
    };

    const logout = () => {}

    return <header className={classes.header}>
        <div className={classes.container}>
            <Link to ="/*" className={classes.logo}>
                FoodMine!
            </Link>
            <nav>
                <ul>
                    {
                        user? (
                        <li className={classes.menu_container}>
                            <Link to="/profile">{user.name}</Link>
                            <div className={classes.menu}>
                                <Link to="/profile">Profile</Link>
                                <Link to="/orders">Orders</Link>
                                <a onClick = {logout}>Log out</a>
                            </div>
                        </li>
                    ): null}

                    <li>
                        <Link to="/cart">
                            Cart
                            {cart.totalCount > 0 && <span>{cart.totalCount}</span>}
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>

}
