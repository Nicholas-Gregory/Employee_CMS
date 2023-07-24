const reportTable = tableArray => {
    console.log("\n");
    console.table(tableArray);
}

const reportDepartments = async db => reportTable(await db.all("department"));

const reportRoles = async db => reportTable(await db.all("role"));

const reportEmployees = async db => reportTable(await db.all("employee"));

const reportEmployeesByManagerId = async (db, id) => reportTable(await db.employeesByManagerId(id));

const reportEmployeesByDepartmentId = async (db, id) => reportTable(await db.employeesByDepartmentId(id));

const reportBudget = async (db, id) => console.log("\n", "Total budget:", await db.sumSalaryByDepartmentId(id));


module.exports = {
    reportDepartments, reportRoles, reportEmployees,
    reportEmployeesByManagerId, reportEmployeesByDepartmentId,
    reportBudget
}