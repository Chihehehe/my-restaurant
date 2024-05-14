import React from 'react'
import {sidebar, logo_container, logo_sidebar, sidebar_tag} from '@/styles/Sidebar.module.css';
import Category from './Category';
import Price from './Delivery';
import { assets } from '@/assets/assets';

const Sidebar = () => {
    return (
        <>
            <section className={sidebar}>
                <div className={logo_container}>
                    <img src={assets.logo} alt="" className={logo_sidebar} />
                    <h1 className={sidebar_tag}>Logo</h1>
                </div>
                <Category />
                <Price />
            </section>
        </>
    )
}

export default Sidebar
