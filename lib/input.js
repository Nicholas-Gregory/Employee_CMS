const inquirer = require("inquirer");

const display = require("./display.js");

const mainMenu = async (db) => {
    const promptResult = await inquirer.prompt([
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
                "Update an Employee's Role"
            ]
        }
    ]);

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
            addDepartment(db);
            break;
        case "Add a Role":
            addRole(db);
            break;
        case "Add an Employee":
            addEmployee(db);
            break;
        case "Update an Employee's Role":
            employeeToUpdate(db);
    }
};

const addDepartment = async db => {
    const promptResult = await inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the department?",
            name: "departmentName"
        }
    ]);

    return await db.addDepartment(promptResult.departmentName);
}

const addRole = async db => {
    const promptResult = await inquirer.prompt([
        {
            type: "input",
            message: "What is the title of the role?",
            name: "title"
        },
        {
            type: "input",
            message: "What is the salary of the role?",
            name: "salary"
        },
        {
            type: "input",
            message: "What is the department ID associated with the role?",
            name: "departmentId"
        }
    ]);
    
    const { title, salary, departmentId } = promptResult;
    return await db.addRole(title, salary, departmentId);
}

const addEmployee = async db => {
    const promptResult = await inquirer.prompt([
        {
            type: "input",
            message: "What is the first name of the employee?",
            name: "firstName"
        },
        {
            type: "input",
            message: "What is the last name of the employee?",
            name: "lastName"
        },
        {
            type: "input",
            message: "What is the role ID for the employee?",
            name: "roleId"
        },
        {
            type: "input",
            message: "What is the manager ID for the employee?",
            name: "managerId"
        }
    ]);

    const { firstName, lastName, roleId, managerId } = promptResult;
    return await db.addEmployee(firstName, lastName, roleId, managerId);
}

const employeeToUpdate = async db => {
    const promptResult = await inquirer.prompt([
        {
            type: "input",
            message: "Input the ID of the employee who's role you would like to update",
            name: "id"
        }
    ]);

    updateEmployeeRole(db, promptResult.id);
}

const updateEmployeeRole = async (db, id) => {
    const promptResult = await inquirer.prompt([
        {
            type: "input",
            message: "Input the role ID you wish to update the employee to be",
            name: "id"
        }
    ]);

    return await db.updateRole(id, promptResult.id);
}

module.exports = {
    mainMenu
}