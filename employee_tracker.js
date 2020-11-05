const mysql = require("mysql");
const inquirer = require("inquirer");
const promiseMysql = require("promise-mysql");
const consoleTable = require("console.table");

const connection = mysql.createConnection({

    host: "localhost",
    port: 8080,
    user: "root",
    password: "",
    database: "employee_tracker_DB"

});

connection.connect(function (error) {

    if (error) throw error;
    search();
});

function search() {
    inquirer.prompt(
        {
            name: "action",
            type: "rawlist",
            message: "View Employees Status",
            choices: [
                "View all employees",
                "View all employees by role",
                "View all employees by manager",
                "View all employees by department",
                "Add employee",
                "Add employee role",
                "Add department",
                "Update employee role",
                "Update employee manager",
                "Delete employee",
                "Delete role",
                "Delete department",
                "View ddepartment budgets"

            ]
        }).then(function (answer) {

            switch (answer.action) {
                case "View all employees":
                    viewAllEmployees();
                    break;
                case "View all employees by role":
                    viewAllEmployeesRole();
                    break;
                case "View all employees by manager":
                    viewAllEmployeesManager();
                    break;
                case "View all employees by department":
                    viewAllEmployeesDepartment();
                    break;
                case "Add employee":
                    addEmployees();
                    break;
                case "Add employee role":
                    addEmployeeRole();
                    break;
                case "Add department":
                    addDepartment();
                    break;
                case "Update employee role":
                    updateRole();
                    break;
                case "Update employee manager":
                    updateManager();
                    break;
                case "Delete employee":
                    deleteEmployee();
                    break;
                case "Delete role":
                    deleteRole();
                    break;
                case "Delete department":
                    deleteDepartment();
                    break;
                case "View ddepartment budgets":
                    viewBudgets();
                    break;
            }
        });
}

function viewAllEmployees(){
    const query = ""
}