# Project Name:
Employee Tracker

Table of Contents:

1. Quick start
2. User Story
3. Acceptance Criteria
4. Project description
5. Installation
6. Usage
7. Creators

## User Story
                    
```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business

```
## Project description
Developers are often tasked with creating interfaces that make it easy for non-developers to view and interact with information stored in databases. Often these interfaces are known as Content Management Systems. In this homework assignment, your challenge is to architect and build a solution for managing a company's employees using node, inquirer, and MySQL.

## Project Details:

department:
id - INT PRIMARY KEY
name - VARCHAR(30) to hold department name

role:
id - INT PRIMARY KEY
title -  VARCHAR(30) to hold role title
salary -  DECIMAL to hold role salary
department_id -  INT to hold reference to department role belongs to

employee:
id - INT PRIMARY KEY
first_name - VARCHAR(30) to hold employee first name
last_name - VARCHAR(30) to hold employee last name
role_id - INT to hold reference to role employee has
manager_id - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager

## Usage
How do you deliver this? Here are some guidelines:
Use the MySQL NPM package to connect to your MySQL database and perform queries.
Use InquirerJs NPM package to interact with the user via the command-line.
Use console.table to print MySQL rows to the console. There is a built-in version of console.table, but the NPM package formats the data a little better for our purposes.
You may wish to have a separate file containing functions for performing specific SQL queries you'll need to use. Could a constructor function or a class be helpful for organizing these?
You will need to perform a variety of SQL JOINS to complete this assignment, and it's recommended you review the week's activities if you need a refresher on this.


## Application usage guidance

![demo the command-line application]()


## Creators
Project created by: Venus Hu 

Github: 
https://github.com/Venus1001/Employee-Tracker.git