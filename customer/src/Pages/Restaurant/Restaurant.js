import React, { useEffect, useState } from 'react'
import classes from "./Restaurant.module.css"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { StarFilled } from '@ant-design/icons';
import { Text, Box, Flex, Heading, Image, Button, SimpleGrid } from "@chakra-ui/react";

function Restaurant({ handleClick }) {
  const [restaurant, setRestaurant] = useState();
  const { id, idrestaurant } = useParams();
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    console.log("Fetching rest data id:", idrestaurant);
    axios.get(`http://localhost:8800/${id}/restaurants/` + idrestaurant)
      .then((res) => {
        console.log('Data fetched:', res.data);
        if (res.data.length > 0) {
          setRestaurant(res.data[0]); // Assuming the data is an array and we're interested in the first item
        } else {
          console.log('No restaurant found');
        }
      })
      .catch(err => console.log(err))

    console.log('Fetching menu data for restaurant id:', idrestaurant);
    axios
      .get(`http://localhost:8800/${id}/restaurants/${idrestaurant}/menu`)
      .then((res) => {
        console.log('Menu data fetched:', res.data);
        setMenu(res.data); // Set the menu data in state
      })
      .catch((err) => console.log(err));
  }, [id]);

  // const handleClick = (item) => {
  //   let isPresent = false;
  // }


  return (
    <div>
      {restaurant ? (
        <div className={classes.restaurantContainer}>
          <div className={classes.imageContainer}>
            <img
              src={restaurant.image}
              alt={restaurant.restName}
              width={950}
              className={classes.image}
            />
          </div>
          <div className={classes.info}>
            <div className={classes.restaurantName}>{restaurant.restName}</div>
            <div className={classes.restaurantInfo}>
              <div className={classes.star}>{restaurant.Ratings} <StarFilled style={{ fontSize: '15px', color: '#FFD700' }} /></div>
              <p>|</p>
              <p className={classes.cat}>{restaurant.category}</p>
              <p>|</p>
              <p>{restaurant.addressRes}</p>
            </div>

            <Text className={classes.title} as='h5' fontWeight="bold">Regular Menu</Text>
            <div>
              <SimpleGrid columns={2} spacing={8} maxW="1200px" mx="auto">
                {menu.map(item => (
                  <Flex key={item.idmenu} className={classes.item_card} p={5} shadow="md" borderWidth="1px" borderRadius="md">
                    {/* Image on the right */}
                    <Box className={classes.item_image} mr={4}>
                      <Box mb={4}>
                        <Image src={item.image} alt={item.foodName} height="100px" width="200px" objectFit="cover" />
                      </Box>
                      <Box marginTop={30}>
                        <Text as='h6' fontWeight="bold">{item.foodName}</Text>
                      </Box>
                    </Box>

                    {/* Content */}
                    <Flex direction="column" justify="space-between">
                      {/* Header */}
                      <Box>
                        <Heading className={classes.item_title} as="h2" size="md">{item.title}</Heading>
                      </Box>

                      {/* Description */}
                      <Text className={classes.item_description} mt={2}>{item.desc}</Text>

                      {/* Price */}
                      <Flex align="center" justify="space-between" mt={2}>
                        <Box>
                          <Text className={classes.item_price} fontSize="lg" fontWeight="bold">${item.price}</Text>
                        </Box>
                        <Box className={classes.add_button}>
                          <Button
                            onClick={() => handleClick(item)}
                            style={{ backgroundColor: "#32711f", color: "white", width: "60px", borderRadius: "5px", height: "30px", borderColor: "#83b67f" }}>Add</Button>
                        </Box>
                      </Flex>
                    </Flex>
                  </Flex>
                ))}
              </SimpleGrid>
            </div>
          </div>

        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Restaurant;