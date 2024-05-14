import React from 'react'
import {restaurant, restaurant_img_container, restaurant_image, reastaurant_info, restaurant_rating, restaurant_desc, restau_price} from '@/styles/Restaurant.module.css'
import { assets } from '@/assets/assets'
import { AiFillClockCircle } from "react-icons/ai";
const Restaurant = ({ id, name, time, fee, image }) => {
    return (
        <div className={restaurant}>
            <div className={restaurant_img_container}>
                <img className={restaurant_image} src={image} alt="" />
            </div>
            <div className={reastaurant_info}>
                <div className={restaurant_rating}>
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className={restaurant_desc}>${fee} Delivery Fee</p>
                <p className={restau_price}><AiFillClockCircle className='time' /> {time} min</p>
            </div>
        </div>
    )
}

export default Restaurant
