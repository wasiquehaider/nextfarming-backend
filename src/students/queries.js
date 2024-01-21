const getStudents = "SELECT * FROM students";
const getStudentById = "SELECT * FROM students WHERE id = $1";
const checkEmailExists = "SELECT s FROM students s WHERE s.email = $1";
const addStudent =
  "INSERT INTO students (name,email,age,dob) VALUES ($1, $2, $3, $4)";
const removeStudent = "DELETE FROM students WHERE id = $1";
// const updateStudent = "UPDATE students SET name = $1 WHERE id = $2";
const updateStudent = (fields) => {
  const updateFields = [];
  const params = [];

  if (fields.name) {
    updateFields.push("name = $1");
    params.push(fields.name);
  }
  if (fields.email) {
    updateFields.push("email = $2");
    params.push(fields.email);
  }
  if (fields.dob) {
    updateFields.push("dob = $3");
    params.push(fields.dob);
  }
  if (fields.age) {
    updateFields.push("age = $4");
    params.push(fields.age);
  }

  if (updateFields.length === 0) {
    throw new Error("No fields provided for update.");
  }

  return {
    query: `UPDATE students SET ${updateFields.join(", ")} WHERE id = $${
      params.length + 1
    }`,
    params: [...params, fields.id],
  };
};
module.exports = {
  getStudents,
  getStudentById,
  checkEmailExists,
  addStudent,
  removeStudent,
  updateStudent,
};
