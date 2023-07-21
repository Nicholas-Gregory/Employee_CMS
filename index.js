const inquirer = require("inquirer");

const database = require("./lib/database.js");

require("dotenv").config;

const db = new database.Database(process.env.DBPASS);