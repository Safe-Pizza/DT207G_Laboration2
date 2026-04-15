//Databasanslutning
const Database = require("better-sqlite3");
const db = new Database("jobs.db");

db.exec(`
        CREATE TABLE job (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        companyname TEXT NOT NULL,
        jobtitle TEXT NOT NULL,
        location TEXT NOT NULL,
        descripton TEXT NOT NULL,
        startdate TEXT NOT NULL,
        enddate TEXT NOT NULL,
        user_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        )`);

db.close();