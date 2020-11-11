const mysql = require("mysql");
const inquirer = require("inquirer");
const promisemysql = require("promise-mysql");
const consoleDbTable = require("console.table");

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
// View all employees:
function viewAllEmployees() {
    const query = "";
    connection.query(query, (error, res) => {
        if (error) return error;

        console.log("\n");
        console.log(res);
        search();
    });
}

// View all employees by role:
function viewAllEmployeesRole() {
    const query = "SELECT title FROM role";
    let roleArray = [];
    connection.query(query, (error, res) => {
        if (error) return error;

    }).then(function (roles) {
        for (var i = 0; i < roles.length; i++) {
            roleArray.push(roles[i].title);
        }
    }).then(() => {

        inquirer.prompt({
            name: "role",
            type: "list",
            message: "Which role would you like to search?",
            choices: "roleArray"
        }).then(function (answer) {
            const query = "";
            connection.query(query, function (error, res) {
                if (error) return error;
                console.log("\n");
                consoleDbTable(res);
                // console.table(res);
                search();
            });
        });
    });

}
// View all employees by manager:
function viewAllEmployeesManager() {
    let managerArray = [];
    promisemysql.createConnection(connectionProperties).then((connection) => {
        return connection.query("");
    }).then(function (managers) {
        for (var i = 0; i < managers.length; i++) {
            managerArray.push(managers[i].manager);
        }

        return managers;
    }).then((managers) => {

        inquirer.prompt({
            name: "manager",
            type: "list",
            message: "Which manager would you like to search for?",
            choices: managerArray
        }).then((answer) => {
            let managerID;
            for (var i = 0; i < managers.length; i++) {
                if (answer.manager == managers[i].manager) {
                    managerID = managers[i].id;
                }
            }

            const query = "";
            connection.query(query, (error, res) => {
                if (error) return error;
                console.log("\n");
                console.table(res);
                search();
            });

        });

    });
}

//View all employee by department:
function viewAllEmployeesDepartment() {
    let departmentArray = [];
    promisemysql.createConnection(connectionProperties).then((connect) => {
        return connect.query('SELECT name FROM department');
    }).then(function (value) {
        departmentQuery = value;
        for (var i = 0; i < value.length; i++) {
            departmentArray.push(value[i].name);
        }
    }).then(() => {

        inquirer.prompt({
            name: "department",
            type: "list",
            message: "Which department would you like to search for?",
            choices: departmentArray
        }).then((answer) => {
            const query = "";
            connection.query(query, (error, res) => {
                if (error) return error;
                console.log("\n");
                console.table(res);
                search();
            });
        });
    });
}
// Delete employee:
function deleteEmployee() {
    let employeeArray = [];

    promisemysql.createConnection(connectionProperties).then((connection) => {
        return connection.query("");
    }).then((employess) => {
        for (var i = 0; i < employess.length; i++) {
            employeeArray.push(employess[i].employee);
        }
        inquirer.prompt([{
            name: "employee",
            type: "list",
            message: "Which employee would you like to delete?",
            choices: "employeeArray"
        },
        {
            name: "confirmDelete",
            type: "list",
            message: "Please confirm to delete",
            choices: ["No", "Yes"]


        }

        ]).then((answer) => {
            if (answer.confirmDelete == "Yes") {
                let employeeID;
                for (var i = 0; i < employees.length; i++) {
                    if (answer.employee == employees[i].employee) {
                        employeeID = employees[i].id;
                    }
                }
                connection.query(`DELETE FROM employee WHERE id =${employeeID};`, (error, res) => {
                    if (error) return error;
                    console.log(`\n EMPLOYEE '${answer.employee}' DELETED...\n `);
                    search();
                });
            } else {
                console.log(`\n EMPLOYEE '${answer.employee}' NOT DELETED...\n `);
                search();
            }
        });
    });
}

// Add employees:
function addEmployees() {
    let roleArray = [];
    let managerArray = [];

    promisemysql.createConnection(connectionProperties).then((connect) => {
        return Promise.call([
            connect.query(),
            connect.query()
        ]);
    }).then(([role, managers]) => {
        for (var i = 0; i < roles.length; i++) {
            roleArray.push(roles[i].title);
        }

        for (var i = 0; i < manager.length; i++) {
            managerArray.push(manager[i].Employee);
        }

        return Promise.call([roles, managers]);
    }).then(([roles, managers]) => {
        managerArray.unshift('---');
        inquirer.prompt([
            {
                name: "fisrtName",
                type: "input",
                message: "First name: ",
                validate: function (input) {
                    if (input == "") {
                        console.log("Input is required.");
                        return false;
                    } else {
                        return true;
                    }

                }
            },
            {
                name: "lastName",
                type: "input",
                message: "Lastname: ",
                validate: function (input) {
                    if (input == "") {
                        console.log("Input is required.");
                        return false;
                    } else {
                        return true;
                    }

                }
            },
            {
                name: "role",
                type: "list",
                message: "What is the employee role?",
                choices: roleArray
            },
            {
                name: "manager",
                type: "list",
                message: "Who is the employee manager?",
                choices: managerArray
            }

        ]).then((answer) => {
            let roleID;
            let managerID = null;
            for (var i = 0; i < roles.length; i++) {
                if (answer.role == roles[i].title) {
                    roleID = roles[i].id;
                }
            }

            for (var i = 0; i < managers.length; i++) {
                if (answer.manager == managers[i].Employee) {
                    managerID = managers[i].id;
                }
            }

            connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES ("${answer.firstName}", "${answer.lastName}", ${roleID}, ${managerID})`, (error, res) => {
                if (error) return error;

                // Confirm employee has been added
                console.log(`\n EMPLOYEE ${answer.firstName} ${answer.lastName} ADDED...\n `);
                search();
            });

        });
    });
}

// Add Roles:
function addEmployeeRole() {

    let departmentArray = [];

    promisemysql.createConnection(connectionProperties)
        .then((connect) => {

            return connect.query('SELECT id, name FROM department ORDER BY name ASC');

        }).then((departments) => {

            for (var i = 0; i < departments.length; i++) {
                departmentArray.push(departments[i].name);
            }

            return departments;
        }).then((departments) => {

            inquirer.prompt([
                {
                    name: "roleTitle",
                    type: "input",
                    message: "Role title: "
                },
                {
                    name: "salary",
                    type: "number",
                    message: "Salary: "
                },
                {
                    name: "department",
                    type: "list",
                    message: "Department: ",
                    choices: departmentArr
                }]).then((answer) => {

                    let departmentID;
                    for (i = 0; i < departments.length; i++) {
                        if (answer.dept == departments[i].name) {
                            departmentID = departments[i].id;
                        }
                    }

                    connection.query(`INSERT INTO role (title, salary, department_id)
                 VALUES ("${answer.roleTitle}", ${answer.salary}, ${deptID})`, (err, res) => {
                        if (err) return err;
                        console.log(`\n ROLE ${answer.roleTitle} ADDED...\n`);
                        search();
                    });

                });

        });
}

function addDepartment() {

    inquirer.prompt({

        name: "departmentName",
        type: "input",
        message: "Department Name: "
    }).then((answer) => {

        connection.query(`INSERT INTO department (name)VALUES ("${answer.deptName}");`, (error, res) => {
            if (error) return error;
            console.log("\n DEPARTMENT ADDED...\n ");
            search();
        });

    });
}

function updateRole() {

    let employeeArray = [];
    let roleArray = [];

    promisemysql.createConnection(connectionProperties
    ).then((connect) => {
        return Promise.all([

            connect.query('SELECT id, title FROM role ORDER BY title ASC'),
            connect.query("SELECT employee.id, concat(employee.first_name, ' ' ,  employee.last_name) AS Employee FROM employee ORDER BY Employee ASC")
        ]);
    }).then(([roles, employees]) => {

        for (i = 0; i < roles.length; i++) {
            roleArray.push(roles[i].title);
        }

        for (i = 0; i < employees.length; i++) {
            employeeArray.push(employees[i].Employee);
        }

        return Promise.all([roles, employees]);
    }).then(([roles, employees]) => {

        inquirer.prompt([
            {
                name: "employee",
                type: "list",
                message: "Who would you like to edit?",
                choices: employeeArray
            },
            {

                name: "role",
                type: "list",
                message: "What is their new role?",
                choices: roleArray
            },]).then((answer) => {

                let roleID;
                let employeeID;

                for (var i = 0; i < roles.length; i++) {
                    if (answer.role == roles[i].title) {
                        roleID = roles[i].id;
                    }
                }

                for (var i = 0; i < employees.length; i++) {
                    if (answer.employee == employees[i].Employee) {
                        employeeID = employees[i].id;
                    }
                }

                connection.query(`UPDATE employee SET role_id = ${roleID} WHERE id = ${employeeID}`, (error, res) => {
                    if (error) return error;

                    console.log(`\n ${answer.employee} ROLE UPDATED TO ${answer.role}...\n `);

                    search();
                });
            });
    });

}

// Update employee manager
function updateManager() {

    let employeeArray = [];
    promisemysql.createConnection(connectionProperties
    ).then((connect) => {

        return connect.query("SELECT employee.id, concat(employee.first_name, ' ' ,  employee.last_name) AS Employee FROM employee ORDER BY Employee ASC");
    }).then((employees) => {

        for (i = 0; i < employees.length; i++) {
            employeeArray.push(employees[i].Employee);
        }

        return employees;
    }).then((employees) => {

        inquirer.prompt([
            {
                name: "employee",
                type: "list",
                message: "Who would you like to edit?",
                choices: employeeArray
            }, {

                name: "manager",
                type: "list",
                message: "Who is their new Manager?",
                choices: employeeArray
            },]).then((answer) => {

                let employeeID;
                let managerID;

                for (var i = 0; i < employees.length; i++) {
                    if (answer.manager == employees[i].Employee) {
                        managerID = employees[i].id;
                    }
                }

                for (var i = 0; i < employees.length; i++) {
                    if (answer.employee == employees[i].Employee) {
                        employeeID = employees[i].id;
                    }
                }

                connection.query(`UPDATE employee SET manager_id = ${managerID} WHERE id = ${employeeID}`, (error, res) => {
                    if (error) return error;

                    console.log(`\n ${answer.employee} MANAGER UPDATED TO ${answer.manager}...\n`);

                    search();
                });
            });
    });
}

// Delete employee
function deleteEmployee() {

    let employeeArray = [];

    promisemysql.createConnection(connectionProperties
    ).then((connect) => {

        return connect.query("SELECT employee.id, concat(employee.first_name, ' ' ,  employee.last_name) AS employee FROM employee ORDER BY Employee ASC");
    }).then((employees) => {

        for (var i = 0; i < employees.length; i++) {
            employeeArray.push(employees[i].employee);
        }

        inquirer.prompt([
            {

                name: "employee",
                type: "list",
                message: "Who would you like to delete?",
                choices: employeeArray
            }, {

                name: "yesNo",
                type: "list",
                message: "Confirm deletion",
                choices: ["NO", "YES"]
            }]).then((answer) => {

                if (answer.yesNo == "YES") {
                    let employeeID;

                    for (i = 0; i < employees.length; i++) {
                        if (answer.employee == employees[i].employee) {
                            employeeID = employees[i].id;
                        }
                    }

                    connection.query(`DELETE FROM employee WHERE id=${employeeID};`, (error, res) => {
                        if (error) return error;

                        console.log(`\n EMPLOYEE '${answer.employee}' DELETED...\n `);

                        search();
                    });
                }
                else {

                    console.log(`\n EMPLOYEE '${answer.employee}' NOT DELETED...\n `);
                    search();
                }

            });
    });
}

// Delete Role
function deleteRole() {

    let roleArray = [];

    promisemysql.createConnection(connectionProperties
    ).then((connect) => {

        return connect.query("SELECT id, title FROM role");
    }).then((roles) => {

        for (i = 0; i < roles.length; i++) {
            roleArray.push(roles[i].title);
        }

        inquirer.prompt([{
            name: "continueDelete",
            type: "list",
            message: "*** WARNING *** Deleting role will delete all employees associated with the role. Do you want to continue?",
            choices: ["NO", "YES"]
        }]).then((answer) => {

            if (answer.continueDelete === "NO") {
                search();
            }

        }).then(() => {

            inquirer.prompt([{
                name: "role",
                type: "list",
                message: "Which role would you like to delete?",
                choices: roleArray
            }, {
                name: "confirmDelete",
                type: "Input",
                message: "Type the role title EXACTLY to confirm deletion of the role"

            }]).then((answer) => {

                if (answer.confirmDelete === answer.role) {

                    let roleID;
                    for (i = 0; i < roles.length; i++) {
                        if (answer.role == roles[i].title) {
                            roleID = roles[i].id;
                        }
                    }

                    connection.query(`DELETE FROM role WHERE id=${roleID};`, (error, res) => {
                        if (error) return error;
                        console.log(`\n ROLE '${answer.role}' DELETED...\n `);

                        search();
                    });
                }
                else {

                    console.log(`\n ROLE '${answer.role}' NOT DELETED...\n `);

                    search();
                }

            });
        })
    });
}

// Delete Department
function deleteDepartment() {
    let deptArray = [];

    promisemysql.createConnection(connectionProperties
    ).then((conn) => {

        return conn.query("SELECT id, name FROM department");
    }).then((depts) => {

        for (i = 0; i < depts.length; i++) {
            deptArray.push(depts[i].name);
        }

        inquirer.prompt([{
            name: "continueDelete",
            type: "list",
            message: "*** WARNING *** Deleting a department will delete all roles and employees associated with the department. Do you want to continue?",
            choices: ["NO", "YES"]
        }]).then((answer) => {
            if (answer.continueDelete === "NO") {
                search();
            }

        }).then(() => {

            inquirer.prompt([{

                name: "dept",
                type: "list",
                message: "Which department would you like to delete?",
                choices: deptArray
            }, {

                name: "confirmDelete",
                type: "Input",
                message: "Type the department name EXACTLY to confirm deletion of the department: "

            }]).then((answer) => {

                if (answer.confirmDelete === answer.dept) {

                    let deptID;
                    for (i = 0; i < depts.length; i++) {
                        if (answer.dept == depts[i].name) {
                            deptID = depts[i].id;
                        }
                    }

                    connection.query(`DELETE FROM department WHERE id=${deptID};`, (error, res) => {
                        if (error) return error;

                        console.log(`\n DEPARTMENT '${answer.dept}' DELETED...\n `);
                        search();
                    });
                }
                else {
                    console.log(`\n DEPARTMENT '${answer.dept}' NOT DELETED...\n `);
                    search();
                }

            });
        })
    });
}

// View Department Budget
function viewBudgets() {

    promisemysql.createConnection(connectionProperties)
        .then((connect) => {
            return Promise.all([

                connect.query("SELECT department.name AS department, role.salary FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY department ASC"),
                connect.query('SELECT name FROM department ORDER BY name ASC')
            ]);
        }).then(([deptSalaies, departments]) => {

            let deptBudgetArray = [];
            let department;

            for (d = 0; d < departments.length; d++) {
                let departmentBudget = 0;

                for (i = 0; i < deptSalaies.length; i++) {
                    if (departments[d].name == deptSalaies[i].department) {
                        departmentBudget += deptSalaies[i].salary;
                    }
                }

                department = {
                    Department: departments[d].name,
                    Budget: departmentBudget
                }

                deptBudgetArray.push(department);
            }
            console.log("\n");
            console.table(deptBudgetArray);

            search();
        });
}