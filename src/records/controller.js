const pool = require("../../db");
const queries = require("./queries");
const getRecords = (req, res) => {
  pool.query(queries.getRecords, (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

const getRecordById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getRecordById, [id], (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

const addRecord = (req, res) => {
  const {
    employee_id,
    machine_id,
    record_date,
    from_time,
    to_time,
    calculated_hours,
  } = req.body;
  pool.query(
    queries.addRecord,
    [
      employee_id,
      machine_id,
      record_date,
      from_time,
      to_time,
      calculated_hours,
    ],
    (err, results) => {
      if (err) return res.status(404).send({ status: 404, message: err });
      res
        .status(200)
        .send({ status: 200, message: "Record Created successfully" });
    }
  );
};

const removeRecord = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getRecordById, [id], (err, results) => {
    const noRecordFound = !results.rows.length;
    if (noRecordFound) {
      res.send("Record does not exist in the database.");
      return;
    }

    pool.query(queries.removeRecord, [id], (err, results) => {
      if (err) throw err;
      res.status(200).send("Record removed successfully!");
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

const updateRecord = (req, res) => {
  const id = parseInt(req.params.id);
  const fields = req.body;

  try {
    const { query, params } = queries.updateRecord({ ...fields, id });

    pool.query(queries.getRecordById, [id], (err, results) => {
      if (!results.rows.length) {
        res.status(404).send("Record does not exist in the database.");
        return;
      }

      pool.query(query, params, (err, results) => {
        if (err) throw err;
        res.status(200).send("Record updated successfully!");
      });
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getRecords,
  getRecordById,
  addRecord,
  removeRecord,
  updateRecord,
};
