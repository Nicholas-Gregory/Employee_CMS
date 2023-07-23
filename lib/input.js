const inquirer = require("inquirer");

const display = require("./display.js");

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
                "View All Employees By Department",
                "Add a Department",
                "Add a Role", 
                "Add an Employee",
                "Update an Employee's Role",
                "Update an Employee's Manager",
                "Delete a Department",
                "Delete a Role",
                "Delete an Employee",
                "View Budget of a Department",
                "Quit"
            ]
        }
    ]);
};

const idInput = async message => await inquirer.prompt([
    {
        type: "input",
        message: message,
        name: "id"
    }
]);

const departmentToViewBudget = async db => {
    const promptResult = await idInput("What is the ID of the department whose budget you would like to view?");

    display.reportBudget(db, promptResult.id);
}

const departmentToDelete = async db => {
    const promptResult = await idInput("What is the ID of the department you would like to delete?");

    db.delete("department", promptResult.id);
}

const roleToDelete = async db => {
    const promptResult = await idInput("What is the ID of the role you would like to delete?");

    db.delete("role", promptResult.id);
}

const employeeToDelete = async db => {
    const promptResult = await idInput("What is the ID of the employee you would like to delete?");

    db.delete("employee", promptResult.id);
}

const departmentToView = async db => {
    const promptResult = await idInput("What is the ID of the department whose employees you would like to view?");

    display.reportEmployeesByDepartmentId(db, promptResult.id);
}

const managerToView = async db => {
    const promptResult = await idInput("What is the ID of the manager who's employees you would like to view?");

    display.reportEmployeesByManagerId(db, promptResult.id);
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
    ]);

    const { firstName, lastName, roleId } = promptResult;
    db.addEmployee(firstName, lastName, roleId);
};

const employeeToUpdate = async (db, option) => {
    const promptResult = await idInput("Input the ID of the employee you would like to update");

    const id = promptResult.id
    if (option === "role") {
        return await updateEmployeeRole(db, id);
    } else if (option === "manager") {
        return await updateEmployeeManager(db, id)
    }
};

const updateEmployeeRole = async (db, id) => {
    const promptResult = await idInput("Input the role ID you wish to update the employee to be");

    db.updateRole(id, promptResult.id);
};

const updateEmployeeManager = async (db, id) => {
    const promptResult = await idInput("Input the employee ID you wish to update the employee's manager to be");

    db.updateManager(id, promptResult.id);
};

module.exports = {
    mainMenu,
    addDepartment, addRole, addEmployee,
    employeeToUpdate, managerToView, departmentToView,
    departmentToDelete, roleToDelete, employeeToDelete,
    departmentToViewBudget
};