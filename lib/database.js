const mysql = require("mysql2/promise");

const isNumeric = str => str.match(/^[0-9]+$/) != null;

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

    async #idExists(tableName, id) {
        return (await this.connection.query(`SELECT * FROM ${tableName} WHERE id=?`, id))[0].length !== 0;
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
        if (name.length <= 30) {
            await this.connection.query("INSERT INTO department (name) VALUES (?)", name);
        } else {
            console.log("\n Name too long");
        }
    }

    async addRole(title, salary, departmentId) {
        if (!await this.#idExists("department", departmentId)) {
            console.log("\n No department with that ID exists in the database.");
            return;
        }
        if (isNumeric(salary) && isNumeric(departmentId)) {
            await this.connection.query(
                "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", 
                [title, salary, departmentId]);
        } else {
            console.log("\n Salary and department ID must be numbers.");
        }
    }

    async addEmployee(firstName, lastName, roleId) {
        if (!await this.#idExists("role", roleId)) {
            console.log("\n No role with that ID exists in the database");
            return;
        }
        return await this.connection.query(
            "INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)",
            [firstName, lastName, roleId]);
    }

    async updateRole(employeeId, newRoleId) {
        if (!await this.#idExists("employee", employeeId)) {
            console.log("\n No employee with that ID exists in the database.");
            return;
        } else if (!await this.#idExists("role", newRoleId)) {
            console.log("\n No role with that ID exists in the database.");
            return;
        }
        if (isNumeric(employeeId) && isNumeric(newRoleId)) {
            await this.connection.query(
                "UPDATE employee SET role_id=? WHERE id=?", [newRoleId, employeeId]);
        } else {
            console.log("\n IDs must be numeric.");
        }
    }

    async updateManager(employeeId, managerId) {
        if (!await this.#idExists("employee", employeeId) || !await this.#idExists("employee", managerId)) {
            console.log("\n No employee with that name exists.");
            return;
        }
        if (isNumeric(employeeId) && isNumeric(managerId)) {
            await this.connection.query(
                "UPDATE employee SET manager_id=? WHERE id=?", [managerId, employeeId]);
        } else {
            console.log("\n IDs must be numeric.");
        }
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
