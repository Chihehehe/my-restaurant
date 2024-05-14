"use client"
import React from 'react'
import { useContext } from 'react'
import { StoreContext } from '@/context/StoreContext'
import Restaurant from "@/components/Restaurant"
import {res_display, res_display_list} from '@/styles/Explore_restaurant.module.css'

const ExploreRestaurant = ({ category }) => {
    const { restaurant_list } = useContext(StoreContext)

    return (
        <div className={res_display} id='res-display'>
            <h1>ALL RESTAURANTS</h1>
            <div className={res_display_list}>
                {restaurant_list.map((item, index) => {
                    return <Restaurant key={index} id={item.id} name={item.name} fee={item.fee} time={item.time} image={item.image} />
                })}
            </div>
        </div>
    )
}

export default ExploreRestaurant
