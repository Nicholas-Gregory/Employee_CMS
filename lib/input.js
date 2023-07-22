const inquirer = require("inquirer");

const mainMenu = async (db) => {
    return await inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?", 
            name: "mainMenu",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "View All Employees By Manager",
                "Add a Department",
                "Add a Role", 
                "Add an Employee",
                "Update an Employee's Role",
                "Update an Employee's Manager",
                "Quit"
            ]
        }
    ]);
};

const managerToView = db => {

};

const addDepartment = async db => {
    const promptResult = await inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the department?",
            name: "departmentName"
        }
    ]);

    db.addDepartment(promptResult.departmentName);
};

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
    db.addRole(title, salary, departmentId);
};

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
    db.addEmployee(firstName, lastName, roleId, managerId);
};

const employeeToUpdate = async (db, option) => {
    const promptResult = await inquirer.prompt([
        {
            type: "input",
            message: "Input the ID of the employee you would like to update",
            name: "id"
        }
    ]);

    const id = promptResult.id
    if (option === "role") {
        return await updateEmployeeRole(db, id);
    } else if (option === "manager") {
        return await updateEmployeeManager(db, id)
    }
};

const updateEmployeeRole = async (db, id) => {
    const promptResult = await inquirer.prompt([
        {
            type: "input",
            message: "Input the role ID you wish to update the employee to be",
            name: "id"
        }
    ]);

    db.updateRole(id, promptResult.id);
};

const updateEmployeeManager = async (db, id) => {
    const promptResult = await inquirer.prompt([
        {
            type: "input",
            message: "Input the employee ID you wish to update the employee's manager to be",
            name: "id"
        }
    ]);

    db.updateManager(id, promptResult.id);
};

module.exports = {
    mainMenu,
    addDepartment, addRole,addEmployee,
    employeeToUpdate
};