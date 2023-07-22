const mysql = require("mysql2/promise");

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

    async describe(tableName) {
        switch (tableName) {
            case "department":
                return (await this.connection.query("DESCRIBE department"))[0];
            case "role":
                return (await this.connection.query("DESCRIBE role"))[0];
            case "employee":
                return (await this.connection.query("DESCRIBE employee"))[0];
        }
    }

    async departments() {
        return (await this.connection.query("SELECT * FROM department"))[0];
    }

    async roles() {
        return (await this.connection.query("SELECT * FROM role"))[0];
    }

    async employees() {
        return (await this.connection.query("SELECT * FROM employee"))[0];
    }

    async employeesByManagerId(id) {
        return (await this.connection.query("SELECT * FROM employee WHERE manager_id=?", id))[0];
    }

    async employeesByDepartmentId(id) {
        return (await this.connection.query("SELECT employee.id, first_name, last_name, role_id, manager_id FROM role RIGHT OUTER JOIN employee ON role.id=employee.role_id WHERE department_id=?", id))[0];
    }

    async addDepartment(name) {
        return await this.connection.query("INSERT INTO department (name) VALUES (?)", name);
    }

    async addRole(title, salary, departmentId) {
        return await this.connection.query(
            "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", 
            [title, salary, departmentId]);
    }

    async addEmployee(firstName, lastName, roleId, managerId) {
        return await this.connection.query(
            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
            [firstName, lastName, roleId, managerId]);
    }

    async updateRole(employeeId, newRoleId) {
        return await this.connection.query(
            "UPDATE employee SET role_id=? WHERE id=?", [newRoleId, employeeId]);
    }

    async updateManager(employeeId, managerId) {
        return await this.connection.query(
            "UPDATE employee SET manager_id=? WHERE id=?", [managerId, employeeId]);
    }
}

module.exports = {
    Database
}
