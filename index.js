const database = require("./lib/database.js");
const input = require("./lib/input.js");
const display = require("./lib/display.js");

require("dotenv").config();

const loop = async (db) => {
    while (true) {
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
            case "View All Employees By Manager":
                await input.managerToView(db);
                break;
            case "View All Employees By Department":
                await input.departmentToView(db);
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
                await input.employeeToUpdate(db, "role");
                break;
            case "Update an Employee's Manager":
                await input.employeeToUpdate(db, "manager");
                break;
            case "Delete a Department":
                await input.departmentToDelete(db);
                break;
            case "Delete a Role":
                await input.roleToDelete(db);
                break;
            case "Delete an Employee":
                await input.employeeToDelete(db);
                break;
            case "Quit":
                process.exit();
        }
    }
};

loop(new database.Database(process.env.DBPASS));