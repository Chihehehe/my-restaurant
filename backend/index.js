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

//For restaurant
app.get("/restpage", (req, res) => {
    const q = "SELECT * FROM restaurant"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get("/editmenu", (req, res) => {
    const q = "SELECT * FROM menu"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})



app.post("/editmenu", (req, res) => {
    const q = "INSERT INTO menu (`foodName`, `desc`, `price`, `image`) VALUES (?)"
    const values = [
        req.body.foodName,
        req.body.desc,
        req.body.price,
        req.body.image
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Food has been created successfully");
    });
});

app.delete("/editmenu/:idmenu", (req, res) => {
    const menuId = req.params.idmenu;
    const q = "DELETE FROM menu WHERE idmenu = ?"

    db.query(q, [menuId], (err, data) => {
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
            return res.json({status: "Success", userId: user.idCustomer});
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

app.get("/:id/restaurants", (req, res) => {
    const q = "SELECT * FROM restaurant"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get("/restaurants/:id", (req, res) => {
    const q = "SELECT * FROM restaurant WHERE idrestaurant = ?";
    const id = req.params.id;

    db.query(q, [id], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

//Menu for each restaurant
app.get('/restaurants/:id/menu', (req, res) => {
    const restaurantId = req.params.id;
    const sql = `SELECT * FROM menu
                 WHERE idRest = ?`;

    db.query(sql, [restaurantId], (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving menu data');
        } else {
            res.status(200).json(results);
        }
    });
});

app.listen(8800, () => {
    console.log("Connect to backend!")
})