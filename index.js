const inquirer = require("inquirer");

const database = require("./lib/database.js");
const input = require("./lib/input.js");
const display = require("./lib/display.js");

require("dotenv").config();

const loop = async (db) => {
    let quit = false;
    while (!quit) {
        let promptResult = await input.mainMenu(db);        
        switch (promptResult.mainMenu) {
            case "View All Departments":
                display.reportDepartments(db);
                break;
            case "View All Roles":
                display.reportRoles(db);
                break;
            case "View All Employees":
                display.reportEmployees(db);
                break;
            case "Add a Department":
                await input.addDepartment(db);
                break;
            case "Add a Role":
                await input.addRole(db);
                break;
            case "Add an Employee":
                await input.addEmployee(db);
                break;
            case "Update an Employee's Role":
                await input.employeeToUpdate(db);
                break;
            case "Quit":
                quit = true;
        }
    }
};

loop(new database.Database(process.env.DBPASS));