//Paket
const express = require("express");
const db = require("../db");

const route = express.Router();

//Routes
route.get("/", (req, res) => {
    try {
        const jobs = db.prepare("SELECT * FROM job").all();

        if (jobs.length === 0) {
            res.status(404).json({ message: "No jobs found" });
        } else {
            res.json(jobs);
        }
    } catch (error) {
        res.status(500).json({ message: "Could not fetch jobs" });
    }
})

route.get("/:id", (req, res) => {
    res.json({ message: "GET request: job/:id" });
})

route.post("/", (req, res) => {
    let companyname = req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;
    let description = req.body.descripton;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;

    let errors = {
        message: "",
        detail: "",
        https_res: {

        }
    };

    if(!companyname || !jobtitle || !location || !description || !startdate || !enddate) {
        errors.message = "All params are not included";
        errors.detail = "Must include companyname, jobtitle, location, description, startdate, enddate in JSON"

        errors.https_res.message = "Bad request";
        errors.https_res.code = 400;

        res.status(400).json(errors);

        return;
    }

    let job = {
        companyname: companyname,
        jobtitle: jobtitle,
        location: location,
        description: description,
        startdate: startdate,
        enddate: enddate
    }

    res.json({ message: "POST request job" });
})


route.put("/:id", (req, res) => {
    res.json({ message: "PUT request job/:id" });
})

route.delete("/:id", (req, res) => {
    res.json({ message: "DELETE request job:id" })
})
module.exports = route;
