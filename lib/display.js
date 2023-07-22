const term = require("terminal-kit").terminal;

const getLabels = async (db, tableName) => {
    const description = await db.describe(tableName);

    return description.map(element => element.Field);
};

const reportTable = tableArray => {
    console.log("\n");
    term.table(tableArray, {
        hasBorder: true,
        borderChars: "lightRounded",
        borderAttr: { color: "blue" },
        textAttr: { bgColor: "default" },
        width: 80,
        fit: true,
        firstRowTextAttr: { bgColor: 'red' }
    });
}

const reportDepartments = async db => {
    const labels = await getLabels(db, "department");
    const data = await db.departments();

    const departmentRows = data.map(dep => [dep.id, dep.name]);

    reportTable([labels, ...departmentRows]);
}

const reportRoles = async db => {
    const labels = await getLabels(db, "role");
    const data = await db.roles();

    const roleRows = data.map(role => [role.id, role.title, role.salary, role.department_id]);

    reportTable([labels, ...roleRows]);
}

const reportEmployees = async db => {
    const labels = await getLabels(db, "employee");
    const data = await db.employees();

    const employeeRows = data.map(employee => [employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id]);

    reportTable([labels, ...employeeRows]);
}

const reportEmployeesByManagerId = async (db, id) => {
    const labels = await getLabels(db, "employee");
    const data = await db.employeesByManagerId(id);

    const employeeRows = data.map(employee => [employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id]);

    reportTable([labels, ...employeeRows]);
}

const reportEmployeesByDepartmentId = async (db, id) => {
    const labels = await getLabels(db, "employee");
    const data = await db.employeesByDepartmentId(id);

    const employeeRows = data.map(employee => [employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id]);

    reportTable([labels, ...employeeRows]);
}

module.exports = {
    reportDepartments, reportRoles, reportEmployees,
    reportEmployeesByManagerId, reportEmployeesByDepartmentId
}