const getFields = "SELECT * FROM fields";
const getFieldById = "SELECT * FROM fields WHERE id = $1";
const checkEmailExists = "SELECT s FROM fields s WHERE s.email = $1";
const addField =
  "INSERT INTO fields (name,email,age,dob) VALUES ($1, $2, $3, $4)";
const removeField = "DELETE FROM fields WHERE id = $1";
const updateField = "UPDATE fields SET name = $1 WHERE id = $2";

module.exports = {
  getFields,
  getFieldById,
  checkEmailExists,
  addField,
  removeField,
  updateField,
};
