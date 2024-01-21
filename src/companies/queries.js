const getCompanies = "SELECT * FROM companies";
const getCompanyById = "SELECT * FROM companies WHERE id = $1";
const checkEmailExists = "SELECT s FROM companies s WHERE s.email = $1";
const addCompany =
  "INSERT INTO companies (name,email,age,dob) VALUES ($1, $2, $3, $4)";
const removeCompany = "DELETE FROM companies WHERE id = $1";
const updateCompany = "UPDATE companies SET name = $1 WHERE id = $2";

module.exports = {
  getCompanies,
  getCompanyById,
  checkEmailExists,
  addCompany,
  removeCompany,
  updateCompany,
};
