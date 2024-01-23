const getRecords = "SELECT * FROM records";
const getRecordById = "SELECT * FROM records WHERE id = $1";
const checkEmailExists = "SELECT r FROM records r WHERE r.email = $1";
const addRecord =
  "INSERT INTO records (employee_id, machine_id, record_date, from_time, to_time, calculated_hours) VALUES ($1, $2, $3, $4, $5, $6)";
const removeRecord = "DELETE FROM records WHERE id = $1";
const updateRecord = "UPDATE records SET name = $1 WHERE id = $2";

module.exports = {
  getRecords,
  getRecordById,
  checkEmailExists,
  addRecord,
  removeRecord,
  updateRecord,
};
