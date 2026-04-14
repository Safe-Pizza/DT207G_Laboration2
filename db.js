//Databasanslutning
const Database = require("better-sqlite3");
const db = new Database("jobs.db");

module.exports = db;