// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState('list'); // 'list', 'add', 'update'
  const [currentEmployee, setCurrentEmployee] = useState({
    id: null,
    firstName: '',
    lastName: '',
    emailId: ''
  });

  const API_URL = "http://localhost:4000/api/v1";

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/employees`);
      setEmployees(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch employees. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const createEmployee = async (employee) => {
    try {
      await axios.post(`${API_URL}/employees`, employee);
      setView('list');
      fetchEmployees();
    } catch (err) {
      setError('Failed to create employee. Please try again.');
    }
  };

  const updateEmployee = async (id, employee) => {
    try {
      await axios.put(`${API_URL}/employees/${id}`, employee);
      setView('list');
      fetchEmployees();
    } catch (err) {
      setError('Failed to update employee. Please try again.');
    }
  };

  const deleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`${API_URL}/employees/${id}`);
        fetchEmployees();
      } catch (err) {
        setError('Failed to delete employee. Please try again.');
      }
    }
  };

  const editEmployee = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/employees/${id}`);
      setCurrentEmployee(response.data);
      setView('update');
      setError(null);
    } catch (err) {
      setError('Failed to load employee details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee({ ...currentEmployee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentEmployee.firstName || !currentEmployee.lastName || !currentEmployee.emailId) {
      setError('All fields are required');
      return;
    }

    if (currentEmployee.id) {
      updateEmployee(currentEmployee.id, currentEmployee);
    } else {
      createEmployee(currentEmployee);
    }
  };

  const resetForm = () => {
    setCurrentEmployee({
      id: null,
      firstName: '',
      lastName: '',
      emailId: ''
    });
    setError(null);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f4f6f8',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    },
    header: {
      background: 'linear-gradient(90deg, #1d4ed8, #3b82f6)',
      color: 'white',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    },
    main: {
      flex: 1,
      padding: '20px',
      maxWidth: '900px',
      margin: '0 auto'
    },
    footer: {
      backgroundColor: '#1f2937',
      color: 'white',
      padding: '15px',
      textAlign: 'center'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      padding: '20px',
      marginBottom: '20px'
    },
    button: {
      padding: '10px 16px',
      fontWeight: 'bold',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    th: {
      textAlign: 'left',
      padding: '12px',
      backgroundColor: '#f1f5f9'
    },
    td: {
      padding: '12px',
      borderBottom: '1px solid #e2e8f0'
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      marginBottom: '15px'
    },
    errorBox: {
      backgroundColor: '#fee2e2',
      color: '#b91c1c',
      padding: '10px',
      marginBottom: '15px',
      borderRadius: '5px'
    }
  };

  const EmployeeForm = () => (
    <div style={styles.card}>
      <h2>{currentEmployee.id ? 'Update Employee' : 'Add New Employee'}</h2>

      {error && <div style={styles.errorBox}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={currentEmployee.firstName}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={currentEmployee.lastName}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="email"
          name="emailId"
          placeholder="Email"
          value={currentEmployee.emailId}
          onChange={handleInputChange}
          style={styles.input}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type="submit" style={{ ...styles.button, backgroundColor: '#3b82f6', color: 'white' }}>
            {currentEmployee.id ? 'Update' : 'Save'}
          </button>
          <button
            type="button"
            onClick={() => {
              resetForm();
              setView('list');
            }}
            style={{ ...styles.button, backgroundColor: '#e5e7eb', color: '#1f2937' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  const EmployeeList = () => (
    <div>
      <div style={{ ...styles.card, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Employees</h2>
        <button
          onClick={() => {
            resetForm();
            setView('add');
          }}
          style={{ ...styles.button, backgroundColor: '#10b981', color: 'white' }}
        >
          Add Employee
        </button>
      </div>

      {error && <div style={styles.errorBox}>{error}</div>}

      {loading ? (
        <p>Loading...</p>
      ) : employees.length === 0 ? (
        <div style={{ ...styles.card, backgroundColor: '#fef9c3' }}>
          <p>No employees found. Please add some.</p>
        </div>
      ) : (
        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>First Name</th>
                <th style={styles.th}>Last Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id}>
                  <td style={styles.td}>{emp.firstName}</td>
                  <td style={styles.td}>{emp.lastName}</td>
                  <td style={styles.td}>{emp.emailId}</td>
                  <td style={styles.td}>
                    <button
                      onClick={() => editEmployee(emp.id)}
                      style={{ ...styles.button, backgroundColor: '#2563eb', color: 'white', marginRight: '10px' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEmployee(emp.id)}
                      style={{ ...styles.button, backgroundColor: '#ef4444', color: 'white' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const Header = () => (
    <header style={styles.header}>
      <h1 style={{ cursor: 'pointer' }} onClick={() => setView('list')}>
        Employee Management System
      </h1>
    </header>
  );

  const Footer = () => (
    <footer style={styles.footer}>
      <p>Employee Management System © {new Date().getFullYear()}</p>
    </footer>
  );

  return (
    <div style={styles.container}>
      <Header />
      <main style={styles.main}>
        {view === 'list' && <EmployeeList />}
        {(view === 'add' || view === 'update') && <EmployeeForm />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
