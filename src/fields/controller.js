const pool = require("../../db");
const queries = require("./queries");
const getFields = (req, res) => {
  pool.query(queries.getFields, (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

const getFieldById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getFieldById, [id], (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

const addField = (req, res) => {
  const { name, email, age, dob } = req.body;
  pool.query(queries.checkEmailExists, [email], (err, results) => {
    if (results.rows.length) {
      res.send("Email already exists.");
      return;
    }
    //add Field to DB

    pool.query(queries.addField, [name, email, age, dob], (err, results) => {
      if (err) throw err;
      res.status(201).send("Field Created successfully");
    });
  });
};

const removeField = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getFieldById, [id], (err, results) => {
    const noFieldFound = !results.rows.length;
    if (noFieldFound) {
      res.send("Field does not exist in the database.");
      return;
    }

    pool.query(queries.removeField, [id], (err, results) => {
      if (err) throw err;
      res.status(200).send("Field removed successfully!");
    });
  });
};

// const updateField = (req, res) => {
//   const id = parseInt(req.params.id);
//   const { name } = req.body;
//   pool.query(queries.getFieldById, [id], (err, results) => {
//     const noFieldFound = !results.rows.length;
//     if (noFieldFound) {
//       res.send("Field does not exist in the database.");
//       return;
//     }

//     pool.query(queries.updateField, [name, id], (err, results) => {
//       if (err) throw err;
//       res.status(200).send("Field updated successfully!");
//     });
//   });
// };

const updateField = (req, res) => {
  const id = parseInt(req.params.id);
  const fields = req.body;

  try {
    const { query, params } = queries.updateField({ ...fields, id });

    pool.query(queries.getFieldById, [id], (err, results) => {
      if (!results.rows.length) {
        res.status(404).send("Field does not exist in the database.");
        return;
      }

      pool.query(query, params, (err, results) => {
        if (err) throw err;
        res.status(200).send("Field updated successfully!");
      });
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getFields,
  getFieldById,
  addField,
  removeField,
  updateField,
};
