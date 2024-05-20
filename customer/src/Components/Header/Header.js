import React, { useEffect, useState } from 'react'
import classes from "./header.module.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Restaurant from '../../Pages/Restaurant/Restaurant';

export default function Header() {
    // const user = {
    //     name: 'Chi',
    // };

    const [user, setUser] = useState();
    const { id } = useParams();

    useEffect(() => {
        console.log("Fetching data id:", id);
        axios.get(`http://localhost:8800/customer/` + id)
            .then((res) => {
                console.log('Data fetched:', res.data);
                if (res.data.length > 0) {
                    setUser(res.data[0]); // Assuming the data is an array and we're interested in the first item
                } else {
                    console.log('No restaurant found');
                }
            })
            .catch(err => console.log(err))
    }, [id]);

    const [cart, setCart] = useState([]);
    const handleClick = (item) => {
        let isPresent = false;
    }

    const logout = () => { }

    return <header className={classes.header}>
        <div className={classes.container}>
            <Link to={`/${id}`} className={classes.logo}>
                FoodMine!
            </Link>
            <nav>
                <ul>
                    {
                        user ? (
                            <li className={classes.menu_container}>
                                <Link to="/profile">{user.name}</Link>
                                <div className={classes.menu}>
                                    <Link to="/profile">Profile</Link>
                                    <Link to="/orders">Orders</Link>
                                    <a onClick={logout}>Log out</a>
                                </div>
                            </li>
                        ) : null}

                    <li>
                        <Link to={`/${id}/cart`}>
                            Cart
                            {/* {cart.totalCount > 0 && <span>{cart.length}</span>} */}
                            {cart.length}
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>

}
