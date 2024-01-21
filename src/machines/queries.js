const getMachines = "SELECT * FROM machines";
const getMachineById = "SELECT * FROM machines WHERE id = $1";
const checkEmailExists = "SELECT s FROM machines s WHERE s.email = $1";
const addMachine =
  "INSERT INTO machines (name,email,age,dob) VALUES ($1, $2, $3, $4)";
const removeMachine = "DELETE FROM machines WHERE id = $1";
const updateMachine = "UPDATE machines SET name = $1 WHERE id = $2";

module.exports = {
  getMachines,
  getMachineById,
  checkEmailExists,
  addMachine,
  removeMachine,
  updateMachine,
};
