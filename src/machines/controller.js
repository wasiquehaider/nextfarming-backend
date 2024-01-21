const pool = require("../../db");
const queries = require("./queries");
const getMachines = (req, res) => {
  pool.query(queries.getMachines, (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

const getMachineById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getMachineById, [id], (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

const addMachine = (req, res) => {
  const { name, email, age, dob } = req.body;
  pool.query(queries.checkEmailExists, [email], (err, results) => {
    if (results.rows.length) {
      res.send("Email already exists.");
      return;
    }
    //add Machine to DB

    pool.query(queries.addMachine, [name, email, age, dob], (err, results) => {
      if (err) throw err;
      res.status(201).send("Machine Created successfully");
    });
  });
};

const removeMachine = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getMachineById, [id], (err, results) => {
    const noMachineFound = !results.rows.length;
    if (noMachineFound) {
      res.send("Machine does not exist in the database.");
      return;
    }

    pool.query(queries.removeMachine, [id], (err, results) => {
      if (err) throw err;
      res.status(200).send("Machine removed successfully!");
    });
  });
};

// const updateStudent = (req, res) => {
//   const id = parseInt(req.params.id);
//   const { name } = req.body;
//   pool.query(queries.getStudentById, [id], (err, results) => {
//     const noStudentFound = !results.rows.length;
//     if (noStudentFound) {
//       res.send("Student does not exist in the database.");
//       return;
//     }

//     pool.query(queries.updateStudent, [name, id], (err, results) => {
//       if (err) throw err;
//       res.status(200).send("Student updated successfully!");
//     });
//   });
// };

const updateMachine = (req, res) => {
  const id = parseInt(req.params.id);
  const fields = req.body;

  try {
    const { query, params } = queries.updateMachine({ ...fields, id });

    pool.query(queries.getMachineById, [id], (err, results) => {
      if (!results.rows.length) {
        res.status(404).send("Machine does not exist in the database.");
        return;
      }

      pool.query(query, params, (err, results) => {
        if (err) throw err;
        res.status(200).send("Machine updated successfully!");
      });
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getMachines,
  getMachineById,
  addMachine,
  removeMachine,
  updateMachine,
};
