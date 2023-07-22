const inquirer = require("inquirer");
const term = require("terminal-kit").terminal;

const getLabels = async (db, tableName) => {
    const description = await db.describe(tableName);

    return description.map(element => element.Field);
};

const reportDepartments = async db => {
    const labels = await getLabels(db, "department");
    const data = await db.departments();

    let departmentRows = data.map(dep => [dep.id, dep.name]);

    console.log("\n");
    term.table([
        labels,
        ...departmentRows
    ], 
    {
        hasBorder: true,
        borderChars: "lightRounded",
        borderAttr: { color: "blue" },
        textAttr: { bgColor: "default" },
        width: 80,
        fit: true
    });
}

module.exports = {
    reportDepartments
}