//Paket
const express = require("express");
const db = require("../db");

const route = express.Router();

//Routes
route.get("/", (req, res) => {
    try {
        const jobs = db.prepare("SELECT * FROM job").all();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Could not fetch jobs" });
    }
})

route.get("/:id", (req, res) => {
    res.json({ message: 'GET request: job/:id' });
})

module.exports = route;
