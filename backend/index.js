import express from "express"
import mysql from "mysql"

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"password",
    database: "myrestaurant"
});

//allow to sen any json file as client
app.use(express.json())

app.get("/", (req,res) => {
    res.json("hello this is the backend")
})

app.get("/editmenu", (req, res) => {
    const q = "SELECT * FROM menu"
    db.query(q, (err, data) => {
        if(err) return res.json(err)
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

    db.query(q, [values], (err,data) => {
        if(err) return res.json(err)
        return res.json("Food has been created successfully");    
    })
})

app.listen(8800, () => {
    console.log("Connect to backend!")
})