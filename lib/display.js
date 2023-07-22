const inquirer = require("inquirer");
const term = require("terminal-kit").terminal;

const getLabels = async (db, tableName) => {
    const description = await db.describe(tableName);
    const termArray = [];

    return description.map(element => element.Field);
};