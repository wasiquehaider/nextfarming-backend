const getEmployees = "SELECT * FROM employees";
const getEmployeeById = "SELECT * FROM employees WHERE id = $1";
const checkEmailExists = "SELECT s FROM employees s WHERE s.email = $1";
const addEmployee =
  "INSERT INTO employees (name,email,age,dob) VALUES ($1, $2, $3, $4)";
const removeEmployee = "DELETE FROM employees WHERE id = $1";
const updateEmployee = "UPDATE employees SET name = $1 WHERE id = $2";

module.exports = {
  getEmployees,
  getEmployeeById,
  checkEmailExists,
  addEmployee,
  removeEmployee,
  updateEmployee,
};
