INSERT INTO department (name) VALUES
('Sales'),
('Engineering'),
('Human Resources'),
('Marketing');

INSERT INTO role (title, salary, department_id) VALUES
('Sales Manager', 80000, 1),
('Sales Associate', 50000, 1),
('Software Engineer', 90000, 2),
('DevOps Engineer', 95000, 2),
('HR Manager', 70000, 3),
('Recruiter', 60000, 3),
('Marketing Manager', 75000, 4),
('Marketing Associate', 50000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Alice', 'Johnson', 3, NULL),
('Bob', 'Brown', 4, 3),
('Charlie', 'Davis', 5, NULL),
('Eve', 'Wilson', 6, 5),
('Frank', 'Miller', 7, NULL),
('Grace', 'Lee', 8, 7);