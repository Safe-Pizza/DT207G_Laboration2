//Paket
const express = require("express");
const db = require("../db");

const route = express.Router();

//Routes
route.get("/", (req, res) => {
    try {
        //Hämta allt från databas
        const jobs = db.prepare("SELECT * FROM job").all();
        //Kontroll om databas saknar data
        if (jobs.length === 0) {
            res.status(404).json({ message: "No jobs found" });
        } else {
            res.json(jobs);
        }
    } catch (error) {
        //Felmeddelande vid error
        res.status(500).json({ message: "Could not fetch jobs" });
    }
})

route.get("/:id", (req, res) => {
    let jobId = req.params.id;

    try {
        //Hämta specifik data från databas
        const job = db.prepare("SELECT * FROM job WHERE id = ?").get(jobId);

        if (!job) {
            return res.status(404).json({ message: `Job not found` })
        }

        //returnera svar från sql-fråga
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: `An error has occurd: ${error}` })
    }
})

route.post("/", (req, res) => {
    let companyname = req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;
    let description = req.body.descripton;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;

    //varibel för felmeddelande
    let errors = {
        message: "",
        detail: "",
        https_res: {

        }
    };

    //Kontroll inga tomma textfält
    if (!companyname || !jobtitle || !location || !description || !startdate || !enddate) {
        //Felmeddelande
        errors.message = "All params are not included";
        errors.detail = "Must include companyname, jobtitle, location, description, startdate, enddate in JSON"
        //Felkods-status
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
        //SQL-fråga lägga till i databas
        const jobInput = db.prepare(`INSERT INTO job(companyname, jobtitle, location, descripton, startdate, enddate)VALUES(?, ?, ?, ?, ?, ?);`);
        jobInput.run(companyname, jobtitle, location, description, startdate, enddate);
        //Meddelande vid OK
        res.status(201).json({ message: "Job has been added " + job.jobtitle });
    } catch (error) {
        //Felmeddelande
        res.status(500).json({ message: "Error occured: " + error });
    }
})


route.put("/:id", (req, res) => {
    const jobId = req.params.id;

    const {
        companyname,
        jobtitle,
        location,
        descripton,
        startdate,
        enddate
    } = req.body;

    //varibel för felmeddelande
    let errors = {
        message: "",
        detail: "",
        https_res: {

        }
    };

    //Kontroll inga tomma textfält
    if (!companyname || !jobtitle || !location || !descripton || !startdate || !enddate) {
        //Felmeddelande
        errors.message = "All params are not included";
        errors.detail = "Must include companyname, jobtitle, location, descripton, startdate, enddate in JSON"
        //Felkods-status
        errors.https_res.message = "Bad request";
        errors.https_res.code = 400;

        res.status(400).json(errors);

        return;
    }

    try {
        //SQL-fråga ändra specifikt jobb i databas
        const jobChange = db.prepare(`UPDATE job SET companyname = ?, jobtitle = ?, location = ?, descripton = ?, startdate = ?, enddate = ? WHERE id = ?`).run(companyname, jobtitle, location, descripton, startdate, enddate, jobId);

        //Felmeddelande om ID inte finns och inga ändringar gjorts
        if (jobChange.changes === 0) {
            return res.status(404).json({ message: `ID not found` });
        }

        console.log(jobChange);
        //Meddelande vid OK
        res.json({ message: `Job with ID: ${jobId} has been succesfully changed` });
    } catch (error) {
        //Felmeddelande
        res.status(500).json({ message: `Error occured: ${error} and the job has not been changed` });
    }
})

route.delete("/:id", (req, res) => {
    try {
        //SQL-fråga ta bort från databas
        const deleteJob = db.prepare(`DELETE FROM job WHERE id = ?;`).run(req.params.id);

        if (deleteJob.changes === 0) {
            res.status(404).json({ message: `ID not found` });
        }
        //Meddelande vid OK
        res.json({ message: `Job with ID: ${req.params.id} has been succesfully deleted` });

    } catch (error) {
        //Felmeddelande
        res.status(500).json({ message: `An error has occured: ${error} and the job has not been deleted` });
    }
})

module.exports = route;
