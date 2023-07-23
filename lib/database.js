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
        return (await this.connection.query(`DESCRIBE ${tableName}`))[0]
    }

    async all(tableName) {
        return (await this.connection.query(`SELECT * FROM ${tableName}`))[0];
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

    async addEmployee(firstName, lastName, roleId) {
        return await this.connection.query(
            "INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)",
            [firstName, lastName, roleId]);
    }

    async updateRole(employeeId, newRoleId) {
        return await this.connection.query(
            "UPDATE employee SET role_id=? WHERE id=?", [newRoleId, employeeId]);
    }

    async updateManager(employeeId, managerId) {
        return await this.connection.query(
            "UPDATE employee SET manager_id=? WHERE id=?", [managerId, employeeId]);
    }

    async delete(table, id) {
        return await this.connection.query(`DELETE FROM ${table} WHERE id=?`, id);
    }

    async sumSalaryByDepartmentId(id) {
        return (await this.connection.query(
            "SELECT SUM(salary) FROM role RIGHT OUTER JOIN employee ON role.id=employee.role_id WHERE department_id=?", id))[0][0]["SUM(salary)"];
    }
}

module.exports = {
    Database
}
