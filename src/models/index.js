class Department {
    constructor(id, name) {
        this.id = id
        this.name = name
    }
}

class Role {
    constructor(id, title, salary, departmentId) {
        this.id = id
        this.title = title
        this.salary = salary
        this.departmentId = departmentId
    }
}

class Employee {
    constructor(id, firstName, lastName, roleId, managerId) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.roleId = roleId
        this.managerId = managerId
    }
}

export {
    Department,
    Role,
    Employee
}