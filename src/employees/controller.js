const pool = require("../../db");
const queries = require("./queries");
const getEmployees = (req, res) => {
  pool.query(queries.getEmployees, (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

const getEmployeeById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getEmployeeById, [id], (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

const addEmployee = (req, res) => {
  const { name, email, age, dob } = req.body;
  pool.query(queries.checkEmailExists, [email], (err, results) => {
    if (results.rows.length) {
      res.send("Email already exists.");
      return;
    }
    //add Employee to DB

    pool.query(queries.addEmployee, [name, email, age, dob], (err, results) => {
      if (err) throw err;
      res.status(201).send("Employee Created successfully");
    });
  });
};

const removeEmployee = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getEmployeeById, [id], (err, results) => {
    const noEmployeeFound = !results.rows.length;
    if (noEmployeeFound) {
      res.send("Employee does not exist in the database.");
      return;
    }

    pool.query(queries.removeEmployee, [id], (err, results) => {
      if (err) throw err;
      res.status(200).send("Employee removed successfully!");
    });
  });
};

// const updateEmployee = (req, res) => {
//   const id = parseInt(req.params.id);
//   const { name } = req.body;
//   pool.query(queries.getEmployeeById, [id], (err, results) => {
//     const noEmployeeFound = !results.rows.length;
//     if (noEmployeeFound) {
//       res.send("Employee does not exist in the database.");
//       return;
//     }

//     pool.query(queries.updateEmployee, [name, id], (err, results) => {
//       if (err) throw err;
//       res.status(200).send("Employee updated successfully!");
//     });
//   });
// };

const updateEmployee = (req, res) => {
  const id = parseInt(req.params.id);
  const fields = req.body;

  try {
    const { query, params } = queries.updateEmployee({ ...fields, id });

    pool.query(queries.getEmployeeById, [id], (err, results) => {
      if (!results.rows.length) {
        res.status(404).send("Employee does not exist in the database.");
        return;
      }

      pool.query(query, params, (err, results) => {
        if (err) throw err;
        res.status(200).send("Employee updated successfully!");
      });
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  addEmployee,
  removeEmployee,
  updateEmployee,
};
