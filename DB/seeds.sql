USE employee_tracker_DB;

----- Department Seeds 

INSERT INTO department (id, name)
VALUES (1, "Business Team");

INSERT INTO department (id, name)
VALUES (2, "IT Tech Team");

INSERT INTO department (id, name)
VALUES (3, "Management Team");


----- Role Seeds 

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "PM", 200000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (2, "Business Analysis", 80000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (3, "Full Stack Developer", 150000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (4, "Test Automation Enfineer", 100000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (5, "Frontend Developer", 100000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (6, "Angular Developer", 120000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (7, "IT Tech Lead", 180000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (8, "Solution Architect", 190000, 3);


----- Employees Seeds 

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Chen", 1, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Mike", "Harry", 2, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, "Jack", "Danil", 3, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, "Kate", "Hong", 4, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, "Kelly", "Zhang", 5, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, "Bella", "Grace", 1, 6);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, "Rose", "Emma", 1, 7);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (8, "Kaylan", "Bool", 2, 8);


