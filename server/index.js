const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Root@123",
    database: "crud_student"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post("/api/post", (req, res) => {
    const {fname, lname, location, email, dob, education, about} = req.body;
    const sqlInsert = "INSERT INTO contact_db (fname, lname, location, email, dob, education, about) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [fname, lname, location, email, dob, education, about], (error, result) => {
        if(error) {
            console.log(error);
        }
    });
});

app.delete("/api/remove/:id", (req,res) => {
    const {id} = req.params;
    const sqlRemove = 
        "DELETE FROM contact_db WHERE id = ?";
        db.query(sqlRemove, id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.get("/api/get/:id", (req, res) => {
    const {id} = req.params;
    const sqlGet = "SELECT * FROM contact_db where id = ? ";
    db.query(sqlGet, id, (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/update/:id", (req, res) => {
    const {id} = req.params;
    const {fname, lname, location, email, dob, education, about} = req.body;
    const sqlUpdate = "UPDATE contact_db SET fname = ?, lname = ?, location = ?, email = ?, dob = ?, education = ?, about = ? where id = ? ";
    db.query(sqlUpdate, [fname, lname, location, email, dob, education, about, id], (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})