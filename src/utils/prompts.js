import inquirer from 'inquirer'

const mainMenuPrompt = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role',
                'Exit'
            ]
        }
    ])
}

const addDepartmentPrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Enter the name of the department:'
        }
    ])
}

const addRolePrompt = (departments) => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'roleTitle',
            message: 'Enter the title of the role:'
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'Enter the salary for the role:'
        },
        {
            type: 'list',
            name: 'departmentId',
            message: 'Select the department for this role:',
            choices: departments
        }
    ])
}

const addEmployeePrompt = (roles, managers) => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the employee’s first name:'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the employee’s last name:'
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'Select the employee’s role:',
            choices: roles
        },
        {
            type: 'list',
            name: 'managerId',
            message: 'Select the employee’s manager:',
            choices: managers
        }
    ])
}

const updateEmployeeRolePrompt = (employees, roles) => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Select the employee to update:',
            choices: employees
        },
        {
            type: 'list',
            name: 'newRoleId',
            message: 'Select the new role for the employee:',
            choices: roles
        }
    ])
}

export {
    mainMenuPrompt,
    addDepartmentPrompt,
    addRolePrompt,
    addEmployeePrompt,
    updateEmployeeRolePrompt
}