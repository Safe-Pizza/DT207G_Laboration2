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
        //Kontroll ifall ID är undefined
        if (jobId === undefined) {
            res.status(400).json({ message: "ID is not recognized" });

            return;
        }
        //Hämta specifik data från databas
        const job = db.prepare("SELECT * FROM job WHERE id = ?").get(jobId);

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
    res.json({ message: "PUT request job/:id" });
})

route.delete("/:id", (req, res) => {
    let jobId = req.params.id;

    //Kontroll om ID undefined
    if (jobId === undefined) {
        //Felmeddelande
        res.status(400).json({ message: "ID is not recognized" });

        return;
    }
    try {
        //SQL-fråga ta bort från databas
        const deleteInput = db.prepare(`DELETE FROM job WHERE id = ?;`);
        //Kör SQL-frpga
        deleteInput.run(jobId);
        //Meddelande vid OK
        res.json({ message: `DELETE request OK, ID: ${jobId} deleted` });
    } catch (error) {
        //Felmeddelande
        res.status(500).json({ message: `An error has occured: ${error}` });
    }
})

module.exports = route;
