import db from './connection'

const viewDepartments = () => {
    return db.query('SELECT * FROM department')
}

const viewRoles = () => {
    return db.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id')
}

const viewEmployees = () => {
    return db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
                     CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
                     FROM employee 
                     LEFT JOIN role ON employee.role_id = role.id 
                     LEFT JOIN department ON role.department_id = department.id 
                     LEFT JOIN employee AS manager ON employee.manager_id = manager.id`)
}

const addDepartment = (departmentName) => {
    return db.query('INSERT INTO department (name) VALUES ($1)', [departmentName])
}

const addRole = (title, salary, departmentId) => {
    return db.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId])
}

const addEmployee = (firstName, lastName, roleId, managerId) => {
    return db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId])
}

const updateEmployeeRole = (employeeId, roleId) => {
    return db.query('UPDATE employee SET role_id = $1 WHERE id = $2', [roleId, employeeId])
}

export {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
}