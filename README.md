# 🚀 Employee Management System

A full-stack **Employee Management System** built using **Spring Boot** (Java) and **React.js**, designed to perform CRUD operations on employee data. This project demonstrates how to build scalable, modular, and modern web applications with a strong separation between frontend and backend layers.

---

## 🛠️ Tech Stack

- **Backend**: Spring Boot, Spring Data JPA, REST APIs
- **Frontend**: React.js (with inline CSS styling)
- **Database**: MySQL (or H2 for testing)
- **Tools**: Axios, Postman, Maven, Git

---

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/b8a1bba8-7727-41e3-ab80-f5280ba105b6)


---

## ✨ Features

### 🔙 Backend (Spring Boot)
- RESTful API to manage employee records
- Endpoints for:
  - Add Employee
  - View All Employees
  - Update Employee
  - Delete Employee
  - View Employee by ID
- Spring Data JPA for simplified database operations
- DTOs and centralized exception handling

### 🖥️ Frontend (React.js)
- Employee list rendered in a responsive layout (cards + tables)
- Form validations (no empty fields, valid email format, etc.)
- Add, edit, and delete employee records
- Real-time UI updates with React Hooks
- Custom UI with **inline CSS styling** (no external libraries)

---

## 📂 Folder Structure

```bash
├── backend/
│   └── src/
│       └── main/
│           ├── java/com/example/ems/
│           │   ├── controller/
│           │   ├── model/
│           │   ├── repository/
│           │   └── FullstackApplication.java
│           └── resources/
│               ├── application.properties
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmployeeForm.js
│   │   │   ├── EmployeeList.js
│   │   │   └── HeaderFooter.js
│   │   ├── App.js
│   │   └── index.js

```
## 🔧 Setup Instructions: Employee Management System

### Backend (Spring Boot)

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/employee-management-system.git](https://github.com/yourusername/employee-management-system.git)
    ```

2.  **Navigate to the backend directory and open in your preferred IDE.**

3.  **Set up MySQL DB or use H2 (update `application.properties`):**

    * **For MySQL:**
        * Ensure you have MySQL installed and running.
        * Create a database for the application (e.g., `employee_db`).
        * Open the `backend/src/main/resources/application.properties` file.
        * Update the following properties with your MySQL connection details:
            ```properties
            spring.datasource.url=jdbc:mysql://localhost:3306/employee_db?useSSL=false&serverTimezone=UTC
            spring.datasource.username=your_mysql_username
            spring.datasource.password=your_mysql_password
            spring.jpa.hibernate.ddl-auto=update
            spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
            ```
            *(Adjust the dialect based on your MySQL version)*

    * **For H2 (in-memory database - for development/testing):**
        * Open the `backend/src/main/resources/application.properties` file.
        * Ensure the following properties are set (or uncomment them):
            ```properties
            spring.datasource.url=jdbc:h2:mem:testdb
            spring.datasource.driver-class-name=org.h2.Driver
            spring.datasource.username=sa
            spring.datasource.password=
            spring.jpa.hibernate.ddl-auto=create-drop
            spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect
            spring.h2.console.enabled=true
            spring.h2.console.path=/h2-console
            ```
            *(You can access the H2 console at `http://localhost:8080/h2-console` while the application is running)*

4.  **Run the Spring Boot application:**

    * Using your IDE (e.g., Run as Spring Boot App).
    * Using Maven: Navigate to the `backend` directory in your terminal and run:
        ```bash
        mvn spring-boot:run
        ```

5.  **Backend will be available at:**
    ```
    http://localhost:8080/api/employees
    ```

### Frontend (React)

1.  **Navigate to the frontend folder:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the app:**
    ```bash
    npm start
    ```

4.  **Frontend will be available at:**
    ```
    http://localhost:3000
    ```
5.  **Backend will be available at:**
    ```
    http://localhost:4000
    ```
