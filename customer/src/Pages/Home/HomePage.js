import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { StarFilled } from "@ant-design/icons";
import classes from "./Home.module.css";
import { Link } from 'react-router-dom';
import Select from 'react-select';


const HomePage = () => {
    const [restaurants, setRestaurants] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [sorted, setSorted] = useState({ sorted: "idrestaurant", reversed: false });
    const [searchPhrase, setSearchPhrase] = useState("");

    useEffect(() => {
        const fetchAllRestaurants = async () => {
            try {
                const res = await axios.get("http://localhost:8800/restaurants")
                setRestaurants(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllRestaurants()
    }, [])


    //sort by categories
    const categories = Array.from(
        new Set(restaurants.map((res) => res.category))
    )

    const categoryOptions = categories.map((category) => ({
        value: category,
        label: category
    }))


    //value to be sorted
    const filterRestaurants = selectedCategory ? restaurants.filter((restaurants) => restaurants.category === selectedCategory.value) : restaurants;


    //sort by ratings
    const sortByRating = () => {
        setSorted({ sorted: "ratings", reversed: !sorted.reversed });
        const restCopy = [...restaurants];
        restCopy.sort((restA, restB) => {
            const resARating = `${restA.Ratings}`
            const resBRating = `${restB.Ratings}`

            if (sorted.reversed) {
                return resBRating - resARating;
            }
            return resARating - resBRating;
        })

        setRestaurants(restCopy);
    };


    //search
    const search = (event) => {
        const matchedRest = restaurants.filter((restaurants) => {
            return `${restaurants.addressRes}`
                .toLowerCase()
                .includes(event.target.value.toLowerCase());
        });
    
        setRestaurants(matchedRest);
        setSearchPhrase(event.target.value);
    }

    return (
        <div>
            <div className={classes.searchContainer}>
                <input
                    type="text"
                    placeholder='Search by address'
                    value={searchPhrase}
                    onChange={search}
                />
                <button onClick={search}>Search</button>
            </div>
            <div className={classes.categoryBar}>
                <Select
                    options={categoryOptions}
                    isClearable
                    placeholder="Select a category"
                    onChange={(selectOption) => setSelectedCategory(selectOption)}
                    value={selectedCategory}
                />
            </div>
            <h1>Top restaurant</h1>

            <div className={classes.sortByPriceContainer}>
                <label htmlFor="sortByPrice">Sort by Ratings:</label>
                <select id="sortByPrice" onChange={sortByRating}>
                    <option value="highToLow">High to Low</option>
                    <option value="lowToHigh">Low to High</option>
                </select>
            </div>

            <ul className={classes.list}>
                {filterRestaurants.map(restaurant => (
                    <li key={restaurant.idrestaurant}>
                        <Link to={`/restaurants/${restaurant.idrestaurant}`}>
                            {restaurant.image && <img src={restaurant.image} width={320} height={200} alt="" />}
                            <div className={classes.content}>
                                <div className={classes.name}>{restaurant.restName}</div>
                                <p>{restaurant.addressRes}</p>
                            </div>
                            <div className={classes.stars}>{restaurant.Ratings} <StarFilled style={{ fontSize: '15px', color: '#FFD700' }} /></div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default HomePage