const inquirer = require("inquirer");

const display = require("./display.js");

const mainMenu = async (db) => {
    const choice = await inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do>", 
            name: "mainMenu",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add a Department",
                "Add a Role", 
                "Add an Employee",
                "Update Employee Role"
            ]
        }
    ]);

    switch (choice.mainMenu) {
        case "View All Departments":
            display.reportDepartments(db);
            break;
        case "View All Roles":
            display.reportRoles(db);
            break;
        case "View All Employees":
            display.reportEmployees(db);
            break;
    }
};

module.exports = {
    mainMenu
}