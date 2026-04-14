//Paket
const express = require("express");
const Database = require("better-sqlite3");
const cors = require("cors");

//Databasanslutning
const db = new Database("jobs.db");

//Routes variabel
const jobRoutes = require("./routes/job");

//Varibel för express
const app = express();

//Cross-origin
app.use(cors());

//Parse JSON
app.use(express.json());

//Routes
app.use("/jobs", jobRoutes);

//Starta server
const port = process.env.port || 5000;

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});