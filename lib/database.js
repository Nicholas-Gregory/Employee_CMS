const mysql = require("mysql2/promise");

const all = async (connection, table) => await connection.query("SELECT * FROM ?", [table]);

class Database {
    constructor(password) {
        this.#init(password);
    }

    async #init(password) {
        this.connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            database: "employees_db",
            password: password
        });
    }

    async describe(table) {
        switch (table) {
            case "departments":
                return (await this.connection.query("DESCRIBE department"))[0];
            case "roles":
                return (await this.connection.query("DESCRIBE role"))[0];
            case "employees":
                return (await this.connection.query("DESCRIBE employee"))[0];
        }
    }

    async departments() {
        return await this.connection.query("SELECT * FROM department");
    }

    async roles() {
        return await this.connection.query("SELECT * FROM role");
    }

    async employees() {
        return await this.connection.query("SELECT * FROM employee");
    }

    async addDepartment(name) {
        return await this.connection.query("INSERT INTO department (name) VALUES (?)", name);
    }

    async addRole(title, salary, departmentId) {
        return await this.connection.query(
            "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", 
            [title, salary, departmentId]);
    }

    async addEmployee(firstName, lastName, rolId, managerId) {
        return await this.connection.query(
            "INSERT INTO employee (first_name, last_name, role_id, manager_id VALUES (?, ?, ?, ?)",
            [firstName, lastName, rolId, managerId]);
    }

    async updateRole(employeeId, newRoleId) {
        return await this.connection.query(
            "UPDATE employee SET role_id=? WHERE id=?", [newRoleId, employeeId]);
    }
}

module.exports = {
    Database
}
