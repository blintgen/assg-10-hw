import db from './db/connection.js';
import { 
    mainMenuPrompt,
    addDepartmentPrompt,
    addRolePrompt,
    addEmployeePrompt,
    updateEmployeeRolePrompt
} from './utils/prompts.js';

const viewAllDepartments = async () => {
    const { rows } = await db.query('SELECT * FROM department')
    console.table(rows)
}

const viewAllRoles = async () => {
    const { rows } = await db.query(`
        SELECT role.id, role.title, role.salary, department.name AS department 
        FROM role 
        JOIN department ON role.department_id = department.id
    `)
    console.table(rows)
}

const viewAllEmployees = async () => {
    const { rows } = await db.query(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
               CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
        FROM employee 
        LEFT JOIN role ON employee.role_id = role.id 
        LEFT JOIN department ON role.department_id = department.id 
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    `)
    console.table(rows)
}

const addDepartment = async () => {
    const { departmentName } = await addDepartmentPrompt()
    await db.query('INSERT INTO department (name) VALUES ($1)', [departmentName])
    console.log(`Department '${departmentName}' added successfully.`)
}

const addRole = async () => {
    const departments = await db.query('SELECT id, name FROM department')
    const { roleTitle, roleSalary, departmentId } = await addRolePrompt(departments.rows.map(dep => ({ name: dep.name, value: dep.id })))
    await db.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [roleTitle, roleSalary, departmentId])
    console.log(`Role '${roleTitle}' added successfully.`)
}

const addEmployee = async () => {
    const roles = await db.query('SELECT id, title FROM role')
    const managers = await db.query('SELECT id, CONCAT(first_name, \' \', last_name) AS name FROM employee')
    const { firstName, lastName, roleId, managerId } = await addEmployeePrompt(
        roles.rows.map(role => ({ name: role.title, value: role.id })),
        managers.rows.map(emp => ({ name: emp.name, value: emp.id }))
    )
    await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId])
    console.log(`Employee '${firstName} ${lastName}' added successfully.`)
}

const updateEmployeeRole = async () => {
    try {
        const employees = await db.query('SELECT id AS value, CONCAT(first_name, \' \', last_name) AS name FROM employee')
        const roles = await db.query('SELECT id AS value, title AS name FROM role')
        
        const { employeeId, newRoleId } = await updateEmployeeRolePrompt(
            employees.rows.map(emp => ({ name: emp.name, value: emp.value })),
            roles.rows.map(role => ({ name: role.name, value: role.value }))
        )

        await db.query('UPDATE employee SET role_id = $1 WHERE id = $2', [newRoleId, employeeId])
        console.log('Employee role updated successfully.')
    } catch (error) {
        console.error('Error updating employee role:', error)
    }
}

const startApp = async () => {
    try {
        await db.connect()
        console.log('Welcome to the Employee Tracker Application!')
        let exit = false
        while (!exit) {
            const { action } = await mainMenuPrompt()
            switch (action) {
                case 'View All Departments':
                    await viewAllDepartments()
                    break
                case 'View All Roles':
                    await viewAllRoles()
                    break
                case 'View All Employees':
                    await viewAllEmployees()
                    break
                case 'Add Department':
                    await addDepartment()
                    break
                case 'Add Role':
                    await addRole()
                    break
                case 'Add Employee':
                    await addEmployee()
                    break
                case 'Update Employee Role':
                    await updateEmployeeRole()
                    break
                case 'Exit':
                    exit = true
                    console.log('Exiting the application.')
                    break
                default:
                    console.log('Invalid action. Please try again.')
            }
        }
    } catch (error) {
        console.error('An error occurred:', error)
    } finally {
        db.end()
    }
}

startApp()