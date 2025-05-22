# Employee Tracker

## Description
The Employee Tracker is a command-line application that allows business owners to manage their company's employee database. It provides an interface to view and manage departments, roles, and employees using Node.js, Inquirer, and PostgreSQL.

## Features
- View all departments
- View all roles
- View all employees
- Add a department
- Add a role
- Add an employee
- Update an employee's role

## Getting Started

### Prerequisites
- Node.js
- PostgreSQL

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd employee-tracker
   ```
3. Install the required dependencies:
   ```
   npm install
   ```

### Configuration
1. Create a `.env` file in the root directory and add your PostgreSQL database credentials:
   ```
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=employee_tracker
   DB_PORT=5432
   ```

### Running the Application
To start the application, run the following command:
```
node src/app.js
```

## Database Schema
The database schema includes the following tables:
- **Department**
  - `id`: SERIAL PRIMARY KEY
  - `name`: VARCHAR(30) UNIQUE NOT NULL

- **Role**
  - `id`: SERIAL PRIMARY KEY
  - `title`: VARCHAR(30) UNIQUE NOT NULL
  - `salary`: DECIMAL NOT NULL
  - `department_id`: INTEGER NOT NULL

- **Employee**
  - `id`: SERIAL PRIMARY KEY
  - `first_name`: VARCHAR(30) NOT NULL
  - `last_name`: VARCHAR(30) NOT NULL
  - `role_id`: INTEGER NOT NULL
  - `manager_id`: INTEGER

## Usage
Follow the prompts in the command line to navigate through the application and manage your employee database.

## License
This project is licensed under the MIT License.