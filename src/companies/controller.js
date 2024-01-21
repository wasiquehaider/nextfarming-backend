const pool = require("../../db");
const queries = require("./queries");
const getCompanies = (req, res) => {
  pool.query(queries.getCompanies, (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

const getCompanyById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getCompanyById, [id], (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

const addCompany = (req, res) => {
  const { name, email, age, dob } = req.body;
  pool.query(queries.checkEmailExists, [email], (err, results) => {
    if (results.rows.length) {
      res.send("Email already exists.");
      return;
    }
    //add Company to DB

    pool.query(queries.addCompany, [name, email, age, dob], (err, results) => {
      if (err) throw err;
      res.status(201).send("Company Created successfully");
    });
  });
};

const removeCompany = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getCompanyById, [id], (err, results) => {
    const noCompanyFound = !results.rows.length;
    if (noCompanyFound) {
      res.send("Company does not exist in the database.");
      return;
    }

    pool.query(queries.removeCompany, [id], (err, results) => {
      if (err) throw err;
      res.status(200).send("Company removed successfully!");
    });
  });
};

// const updateCompany = (req, res) => {
//   const id = parseInt(req.params.id);
//   const { name } = req.body;
//   pool.query(queries.getCompanyById, [id], (err, results) => {
//     const noCompanyFound = !results.rows.length;
//     if (noCompanyFound) {
//       res.send("Company does not exist in the database.");
//       return;
//     }

//     pool.query(queries.updateCompany, [name, id], (err, results) => {
//       if (err) throw err;
//       res.status(200).send("Company updated successfully!");
//     });
//   });
// };

const updateCompany = (req, res) => {
  const id = parseInt(req.params.id);
  const fields = req.body;

  try {
    const { query, params } = queries.updateCompany({ ...fields, id });

    pool.query(queries.getCompanyById, [id], (err, results) => {
      if (!results.rows.length) {
        res.status(404).send("Company does not exist in the database.");
        return;
      }

      pool.query(query, params, (err, results) => {
        if (err) throw err;
        res.status(200).send("Company updated successfully!");
      });
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getCompanies,
  getCompanyById,
  addCompany,
  removeCompany,
  updateCompany,
};
