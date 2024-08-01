const express = require("express");
const sql = require("sqlite3").verbose();
const session = require("express-session");
const FLASK_URL = "http://localhost:5000";

//Connect DB
const userDB = sql.Database("./userDB.db")


const app = express();

app.use(express.json());
app.use(session({
    secret:"HACKATHON-INDUSTRIAL-CONCLAVE"
}));

app.listen(10000, ()=>{
    console.log("SERVER LISTENING AT PORT 10,000");
})