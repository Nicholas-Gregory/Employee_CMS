const inquirer = require("inquirer");

const database = require("./lib/database.js");
const input = require("./lib/input.js");

require("dotenv").config();

const db = new database.Database(process.env.DBPASS);

input.mainMenu(db);