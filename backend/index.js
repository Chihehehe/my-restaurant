import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "myrestaurant"
});

//allow to sen any json file as client
app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
    res.json("hello this is the backend")
})

//function calculate distance
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

//For restaurant
app.get("/restpage/:id", (req, res) => {
    const idrest = req.params.id;
    const q = "SELECT * FROM `restaurant` WHERE idrestaurant = ?"
    db.query(q, idrest, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get("/restpage/:id/orderRequest", (req, res) => {
    const idrest = req.params.id;
    const q = "SELECT * FROM `order` WHERE idrest = ?"
    db.query(q, idrest, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get("/editmenu/:id", (req, res) => {
    const id = req.params.id;

    const q = "SELECT * FROM menu WHERE idRest= 110"
    db.query(q, id, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get("/orders/:id/items", (req, res) => {
    const id = req.params.id;

    const q = "SELECT * FROM `order_items` WHERE idorder = ?"
    db.query(q, id, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.put('/restPage/:id/status', (req, res) => {
    const userId = req.params.id;
    const { status } = req.body;

    const sql = 'UPDATE `order` SET status = ? WHERE idorder = ?';
    db.query(sql, [status, userId], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send({ success: true, message: 'Status updated successfully' });
    });
});


app.post("/editmenu/add/:id", (req, res) => {
    const id = 110;
    const q = "INSERT INTO menu (`foodName`, `desc`, `price`, `image`, `idrest`) VALUES (?)"
    const values = [
        req.body.foodName,
        req.body.desc,
        req.body.price,
        req.body.image,
        id
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Food has been created successfully");
    });
});

app.delete("/editmenu/:id/:idmenu", (req, res) => {
    const rest = 110;
    const menuId = req.params.idmenu;
    const q = "DELETE FROM menu WHERE idmenu = ? and idRest = ?"

    db.query(q, [menuId, rest], (err, data) => {
        if (err) return res.json(err);
        return res.json("Food has been deleted successfully");
    });
})

//login and Signup
app.post('/signup', (req, res) => {
    const q = "INSERT INTO customer (`name`,`phone`,`gmail`,`password`,`membership`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.phone,
        req.body.gmail,
        req.body.password,
        0
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Customer has been created successfully");
    });
})

app.post('/login', (req, res) => {
    console.log(req.body);
    const q = "SELECT * FROM customer WHERE gmail = ? AND password = ?";
    db.query(q, [req.body.gmail, req.body.password], (err, data) => {
        if (err) {
            console.error(err);
            return res.json("Error");
        }
        if (data.length > 0) {
            const user = data[0]
            return res.json({ status: "Success", userId: user.idCustomer });
        } else {
            return res.json("Failed");
        }
    })
});

app.get("/:id", (req, res) => {
    const q = "SELECT * FROM customer"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})



//For customer
app.get("/customer/:id", (req, res) => {
    const userId = req.params.id;
    const q = "SELECT * FROM customer WHERE idCustomer = ?"; // Adjust the column name if necessary
    db.query(q, [userId], (err, data) => {
        if (err) {
            console.error('Error fetching customer:', err);
            return res.json(err);
        }
        return res.json(data);
    });
});

app.get("/customer/:id/restaurants", (req, res) => {
    const userId = req.params.id;
    const qCustomer = "SELECT * FROM customer WHERE idCustomer = ?";

    db.query(qCustomer, [userId], (err, customerData) => {
        if (err) {
            console.error('Error fetching customer:', err);
            return res.json(err);
        }
        const customer = customerData[0];
        const qRestaurants = "SELECT * FROM restaurant";

        db.query(qRestaurants, (err, restaurantData) => {
            if (err) {
                console.error('Error fetching restaurants:', err);
                return res.json(err);
            }

            const enhancedRestaurants = restaurantData.map(restaurant => {
                const distance = getDistanceFromLatLonInKm(
                    customer.custLat,
                    customer.custLon,
                    restaurant.lat,
                    restaurant.lon
                );
                return {
                    ...restaurant,
                    distance
                };
            });

            return res.json(enhancedRestaurants);
        });
    });
});


app.get("/:id/restaurants/:idrestaurant", (req, res) => {
    const idrestaurant = req.params.idrestaurant;
    const q = "SELECT * FROM restaurant where idrestaurant = ?"
    db.query(q, [idrestaurant], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

//Menu for each restaurant
app.get('/:id/restaurants/:idrestaurant/menu', (req, res) => {
    const idrestaurant = req.params.idrestaurant;
    const sql = `SELECT * FROM menu
                 WHERE idRest = ?`;

    db.query(sql, [idrestaurant], (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving menu data');
        } else {
            res.status(200).json(results);
        }
    });
});

app.put('/customer/:id/membership', (req, res) => {
    const userId = req.params.id;
    const { membership } = req.body;

    const sql = 'UPDATE customer SET membership = ? WHERE idCustomer = ?';
    db.query(sql, [membership, userId], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send({ success: true, message: 'Membership updated successfully' });
    });
});

// Update customer details
app.put('/customer/:id', (req, res) => {
    const { id } = req.params;
    const values = [
        req.body.name,
        req.body.phone,
        req.body.gmail,
        id // Add the id parameter to the values array
    ];

    const query = 'UPDATE customer SET name = ?, phone = ?, gmail = ? WHERE (idCustomer = ?)';

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'Customer details updated successfully' });
    });
});

app.put('/restpage/:id', (req, res) => {
    const { id } = req.params;
    const values = [
        req.body.restname,
        req.body.addressRes,
        req.body.image,
        req.body.category,
        req.body.gmail,
        id // Add the id parameter to the values array
    ];

    const query = 'UPDATE restaurant SET restname = ?, addressRes = ?, image = ?, category = ? , gmail = ? WHERE (idCustomer = ?)';

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'Customer details updated successfully' });
    });
});

// Route to insert order data
app.post('/:id/orders', (req, res) => {
    const iduser = req.params.id;
    // const { idrest, totalAmount, status, created_at, items } = req.body;
    const values = [
        iduser,
        req.body.idrest,
        req.body.totalAmount,
        req.body.status,
        req.body.created_at,
    ];

    const items = req.body.items

    // Insert into the 'order' table
    const orderQuery = 'INSERT INTO `order` (`iduser`, `idrest`, `totalAmount`, `status`, `created_at`) VALUES (?)';
    db.query(orderQuery, [values], (err, result) => {
        if (err) {
            console.error('Error inserting order:', err);
            return res.status(500).send('Error inserting order');
        }

        const orderId = result.insertId;


        const itemsQueryBase = 'INSERT INTO `order_items`( `idorder`, `idfood`, `quantity`, `price`, `foodName`) VALUES ';

        const itemsValues = items.map((item) => [orderId, item.idfood, item.quantity, item.price, item.foodName]);

        // Create a placeholder string for each set of values
        const placeholders = itemsValues.map(() => '(?, ?, ?, ?, ?)').join(', ');

        // Flatten the itemsValues array
        const flattenedValues = itemsValues.flat();

        const itemsQuery = itemsQueryBase + placeholders;

        db.query(itemsQuery, flattenedValues, (err, result) => {
            if (err) {
                console.error('Error inserting order items:', err);
                return res.status(500).send('Error inserting order items');
            }

            res.status(200).send('Order inserted successfully');
        });
    });
});


// Route to fetch order history for a customer
// Route to fetch order history for a customer
app.get('/:id/ordersHistory', (req, res) => {
    const customerId = req.params.id;

    const query = `
      SELECT o.idorder, o.iduser, o.idrest, o.totalAmount, o.status, o.created_at, oi.idorder_items, oi.idfood, oi.quantity, oi.price, oi.foodName
      FROM order_items oi
      JOIN \`order\` o ON oi.idorder = o.idorder
      WHERE o.iduser = ?
    `;

    db.query(query, [customerId], (err, results) => {
        if (err) {
            console.error('Error fetching order history:', err);
            return res.status(500).send('Error fetching order history');
        }

        const orders = [];

        results.forEach((result) => {
            const existingOrder = orders.find((order) => order.idorder === result.idorder);

            if (existingOrder) {
                existingOrder.items.push({
                    idorder_items: result.idorder_items,
                    idfood: result.idfood,
                    quantity: result.quantity,
                    price: result.price,
                    foodName: result.foodName
                });
            } else {
                orders.push({
                    idorder: result.idorder,
                    iduser: result.iduser,
                    idrest: result.idrest,
                    totalAmount: result.totalAmount,
                    status: result.status,
                    created_at: result.created_at,
                    items: [
                        {
                            idorder_items: result.idorder_items,
                            idfood: result.idfood,
                            quantity: result.quantity,
                            price: result.price,
                            foodName: result.foodName
                        },
                    ],
                });
            }
        });

        res.json(orders);
    });
});

//feedback
app.post('/orders/:orderId/feedback', async (req, res) => {
    const orderId = req.params.orderId;
    const values = [
        orderId,
        req.body.feedback,
        5
    ]

    const q = 'INSERT INTO `feedback` (`idorder`, `feedback_text`, `rating`) VALUES (?)';
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        console.log(data)
        return res.json("Feedback has been created successfully");
    });
});;


app.listen(8800, () => {
    console.log("Connect to backend!")
})

