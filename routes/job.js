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

    if (!companyname || !jobtitle || !location || !description || !startdate || !enddate) {
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

    try {
        const jobInput = db.prepare(`INSERT INTO job(companyname, jobtitle, location, descripton, startdate, enddate)VALUES(?, ?, ?, ?, ?, ?);`);
        jobInput.run(companyname, jobtitle, location, description, startdate, enddate);
        res.json({ message: "Job has been added " + job.jobtitle });
    } catch (error) {
        res.status(500).json({ message: "Error occured: " + error });
    }
})


route.put("/:id", (req, res) => {
    res.json({ message: "PUT request job/:id" });
})

route.delete("/:id", (req, res) => {
    let jobId = req.params.id;

    if (jobId === undefined) {
        res.status(400).json({ message: "ID is not recognized" });

        return;
    }
    try {
        const deleteInput = db.prepare(`DELETE FROM job WHERE id=(?);`);

        deleteInput.run(jobId);

        res.json({ message: `DELETE request OK, ID: ${jobId} deleted` });
    } catch (error) {
        res.status(500).json({ message: `An error has occured: ${error}` });
    }
})

module.exports = route;
