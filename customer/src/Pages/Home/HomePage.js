import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StarFilled, ShopOutlined } from "@ant-design/icons";
import classes from "./Home.module.css";
import { Link, useParams } from 'react-router-dom';
import Select from 'react-select';

const HomePage = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [sorted, setSorted] = useState({ sorted: "idrestaurant", reversed: false });
    const [searchPhrase, setSearchPhrase] = useState("");
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const [originalRestaurants, setOriginalRestaurants] = useState([]);
  
    useEffect(() => {
        axios.get(`http://localhost:8800/customer/${id}`)
            .then((res) => {
                if (res.data.length > 0) {
                    setUser(res.data[0]);
                } else {
                    console.log('No customer found');
                }
            })
            .catch(err => console.log(err));
    }, [id]);

    useEffect(() => {
        const fetchAllRestaurants = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/customer/${id}/restaurants`);
                if (Array.isArray(res.data)) {
                    setOriginalRestaurants(res.data);
                    setRestaurants(res.data);
                } else {
                    console.error("API response is not an array", res.data);
                }
            } catch (err) {
                console.error("Error fetching restaurants:", err);
            }
        }
        fetchAllRestaurants();
    }, [id]);

    const categories = Array.from(
        new Set(restaurants.map((res) => res.category))
    );

    const categoryOptions = categories.map((category) => ({
        value: category,
        label: category
    }));

    const filterRestaurants = selectedCategory ? restaurants.filter((restaurant) => restaurant.category === selectedCategory.value) : restaurants;

    const sortByRating = () => {
        setSorted({ sorted: "ratings", reversed: !sorted.reversed });
        const restCopy = [...restaurants];
        restCopy.sort((restA, restB) => {
            const resARating = restA.Ratings;
            const resBRating = restB.Ratings;

            if (sorted.reversed) {
                return resBRating - resARating;
            }
            return resARating - resBRating;
        });

        setRestaurants(restCopy);
    };

    const sortByNearestLocation = () => {
        const restCopy = [...restaurants];
        restCopy.sort((restA, restB) => restA.distance - restB.distance);
        setRestaurants(restCopy);
    };

    const search = (event) => {
        const searchValue = event.target.value.toLowerCase();
        if (searchValue.trim() === '') {
            setRestaurants([...originalRestaurants]); // Reset to original list
        } else {
            const matchedRest = originalRestaurants.filter((restaurant) => {
                return restaurant.restName.toLowerCase().includes(searchValue);
            });
            setRestaurants(matchedRest);
        }
        setSearchPhrase(searchValue); // Update search phrase
    };

    return (
        <div>
            <div className={classes.searchContainer}>
                <input
                    type="text"
                    placeholder='Search by restaurant name'
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
            <h1>Top Restaurants</h1>

            <div className={classes.sortByPriceContainer}>
                <label htmlFor="sortByPrice">Sort by Ratings:</label>
                <select id="sortByPrice" onChange={sortByRating}>
                    <option value="highToLow">High to Low</option>
                    <option value="lowToHigh">Low to High</option>
                </select>
            </div>
            <div className={classes.sortBy}>
                <button className={classes.sortByLocationButton} onClick={sortByNearestLocation}>Sort by Nearest Location</button>
            </div>

            {Array.isArray(filterRestaurants) && filterRestaurants.length > 0 ? (
                <ul className={classes.list}>
                    {filterRestaurants.map((restaurant, index) => (
                        <li key={index}>
                            <Link to={`/${id}/restaurants/${restaurant.idrestaurant}`}>
                                {restaurant.image && <img src={restaurant.image} width={320} height={200} alt="" />}
                                <div className={classes.content}>
                                    <div className={classes.name}>{restaurant.restName}</div>
                                    <p>{restaurant.addressRes}</p>
                                </div>
                                <div className={classes.footerBox}>
                                    <div> <ShopOutlined /> {restaurant.distance.toFixed(2)} km</div>
                                    <div className={classes.stars}>
                                        {restaurant.Ratings} <StarFilled style={{ fontSize: '15px', color: '#FFD700' }} />
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No restaurants found</p>
            )
            }
        </div >
    );
};

export default HomePage;
