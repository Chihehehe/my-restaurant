import express from "express"
import mysql from "mysql"

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"password",
    database: "myrestaurant"
})

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

app.listen(8800, () => {
    console.log("Connect to backend!")
})