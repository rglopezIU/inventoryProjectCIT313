import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// importing database
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// import clothing from "./public/data/data.js"
import { setupDatabase, getDbConnection } from './database.js';

// setup the database
setupDatabase().catch(console.error)

const app = express();
const port = 3500;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname + "/public")));

// set view engine with app.set
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    getDbConnection()
    .then((db) => {
        return db.all('SELECT * FROM clothing');
    })
    .then((clothing) => {
        res.render("pages/index", {
            data: clothing,
            title: "Clothes For Sale",
        });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
    });
});

app.get("/about", (req, res) => {
    res.render("pages/about", { title : "About Us"});
  });

app.get("/contact", (req, res) => {
    res.render("pages/contact", { title : "Contact Us"});
});


app.listen(port, ()=> {
    console.log(`App listening at port ${port}`)
});
