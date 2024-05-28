import React, { useEffect, useState } from 'react'
import classes from "./header.module.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Restaurant from '../../Pages/Restaurant/Restaurant';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Image } from '@chakra-ui/react';

export default function Header({ size }) {
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


    const logout = () => { }

    return <header className={classes.header}>
        <div className={classes.container}>
            <Link to={`/${id}`} className={classes.logo}>
                <Image width={35} height={35} src={require('./applogo.png')} />
            </Link>
            <nav>
                <ul>
                    {
                        user ? (
                            <li className={classes.menu_container}>
                                <Link to={`/${id}/profile`}>{user.name}</Link>
                                <div className={classes.menu}>
                                    <Link to={`/${id}/profile`}>Profile</Link>
                                    <Link to={`/${id}/OrderHistory`}>Orders</Link>
                                    <Link to={`/${id}/membership`}>Membership</Link>
                                    <a onClick={logout}>Log out</a>
                                </div>
                            </li>
                        ) : null}

                    <li>
                        <Link to={`/${id}/cart`}>
                            <ShoppingCartOutlined />
                            {/* {cart.totalCount > 0 && <span>{cart.length}</span>} */}
                            {size}
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>

}
